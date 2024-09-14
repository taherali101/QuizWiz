import { NextFunction, Request, Response } from "express";

/**
 * A wrapper for controllers to handle async errors gracefully.
 * It catches any errors thrown in async functions and forwards them to the next middleware (usually an error handler).
 *
 * @param handler - The async function that serves as the controller logic.
 */
export const controller = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Execute the handler and await its result
      await handler(req, res, next);
    } catch (error) {
      // Forward any error to the next middleware (the error handler)
      next(error);
    }
  };
};
