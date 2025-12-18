import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    visitorId?: string;
  }
}

export {};