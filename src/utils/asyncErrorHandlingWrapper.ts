import { type Request, type Response, type NextFunction } from "express";

export const asyncErrorHandlingWrapper =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    try {
      Promise.resolve(fn(req, res, next)).catch((error) => {
        next(error);
      });
    } catch (error) {
      next(error);
    }
  };
