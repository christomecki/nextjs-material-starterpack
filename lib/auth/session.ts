export type SessionData = {
  userId: string;
  chain: string;
};

export type Session = SessionData & {
  createdAt: number;
  maxAge: number;
};

export function isSession(session: any): session is Session {
  return (
    session != null &&
    typeof session === 'object' &&
    typeof session.createdAt === 'number' &&
    typeof session.maxAge === 'number' &&
    typeof session.userId === 'string' &&
    typeof session.chain === 'string'
  );
}
