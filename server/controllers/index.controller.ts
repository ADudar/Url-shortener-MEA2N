import { Request, Response, NextFunction } from 'express';

export function startPage(req: Request, res: Response, next: NextFunction) {
  res.send('API for URL Link Shortener');
}

export function apiTest(req: Request, res: Response, next: NextFunction) {
  res.send(
    'Welcome to API!'
  );
}

export function notFoungPage(req: Request, res: Response, next: NextFunction) {
  res.status(404).send('Page not found');
}
