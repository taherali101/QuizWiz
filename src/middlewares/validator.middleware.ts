import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { InputValidationError } from "@@errors";

/**
 * Middleware function to validate DTOs (Data Transfer Objects).
 * It transforms request data into the DTO class instance and validates it.
 * If validation fails, it throws an InputValidationError.
 *
 * @param DtoClass - The class representing the structure of the data to validate.
 * @param source - The source of the data to validate ('body' or 'params').
 * @returns Middleware function for Express.
 */
export const validateDto = (
  DtoClass: any,
  source: "body" | "params" = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Transform the data from the specified source into an instance of the DTO class
      const dto = plainToInstance(
        DtoClass,
        source === "body" ? req.body : req.params
      );

      // Validate the DTO
      const errors = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        throw new InputValidationError(errors); // Throw an error if validation fails
      }

      // Attach the validated DTO to the request object
      (req as any).dto = dto; // Cast as any to avoid type errors
      next();
    } catch (error) {
      next(error); // Pass errors to the error handler middleware
    }
  };
};
