import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { NextHandler } from 'next-connect';

const applyMiddleware = (middleware: any) => (request: NextApiRequest, response: NextApiResponse) =>
  new Promise((resolve, reject) => {
    middleware(request, response, (result: any) => (result instanceof Error ? reject(result) : resolve(result)));
  });

const getIP = (request: any) => request.ip || request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.connection.remoteAddress;

export type RateLimiterParams = {
  limit?: number;
  windowMs?: number;
  delayAfter?: number;
  delayMs?: number;
};

export const getRateLimitMiddlewares = ({ limit = 10, windowMs = 60 * 1000, delayAfter = Math.round(limit / 2), delayMs = 500 }: RateLimiterParams = {}) => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

export const rateLimiterMiddlewareGenerator = (params?: RateLimiterParams) => {
  const middlewares = getRateLimitMiddlewares(params);
  return async (request: NextApiRequest, response: NextApiResponse, next: NextHandler) => {
    await Promise.all(middlewares.map(applyMiddleware).map((middleware) => middleware(request, response)));
    next();
  };
};

export const loginRelatedRateLimiterMiddleware = rateLimiterMiddlewareGenerator({
  limit: 5,
  windowMs: 60 * 1000 * 30, // 30 minutes
});

export const defaultRateLimiterMiddleware = rateLimiterMiddlewareGenerator();

const rateLimiters = {
  default: defaultRateLimiterMiddleware,
  'login-related': loginRelatedRateLimiterMiddleware,
};

export const withRateLimiter = (rateLimiterKey: keyof typeof rateLimiters = 'default') =>
  nextConnect<NextApiRequest, NextApiResponse>().use(rateLimiters[rateLimiterKey]);
