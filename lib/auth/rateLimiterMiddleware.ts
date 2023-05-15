import { NextApiRequest, NextApiResponse } from 'next';

type RateLimitData = {
  lastRequestTime: number;
  requestCount: number;
};

const rateLimitData: Record<string, RateLimitData> = {};
export const rateLimiterMiddleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const maxRequestTime = 1000 * 10; //10s = 1000ms * 10
  const maxRequests = 3;
  const ip = req.socket.remoteAddress ?? '';
  const now = Date.now();

  if (!rateLimitData[ip]) {
    console.log('IP has been noted');
    rateLimitData[ip] = {
      lastRequestTime: now,
      requestCount: 1,
    };
  } else {
    const { lastRequestTime, requestCount } = rateLimitData[ip];
    const elapsedTime = now - lastRequestTime;
    if (elapsedTime < maxRequestTime) {
      if (requestCount > maxRequests) {
        return res.status(429).send('Too many requests');
      }
      rateLimitData[ip].requestCount += 1;
    } else {
      rateLimitData[ip] = {
        lastRequestTime: now,
        requestCount: 1,
      };
    }
  }
  next();
};
