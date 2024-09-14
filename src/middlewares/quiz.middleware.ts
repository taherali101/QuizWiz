import { NextFunction, Request, Response } from "express";
import { ErrorTypes } from "@@types";
import { HTTP_STATUS_CODE, MESSAGES } from "@@constants";

/**
 * Global error handler middleware.
 * This middleware handles both custom API errors and unknown server errors.
 */
export const errorHandler = (
  err: ErrorTypes.APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the error is a custom APIError or InputValidationError
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      scope: err.scope,
      errors: err || [], // Include any additional validation errors if available
    });
  }

  // Fallback for any unknown errors
  return res.status(HTTP_STATUS_CODE._500).json({
    success: false,
    message: MESSAGES.INTERNAL_SERVER_ERROR,
  });
};
