import { HTTP_STATUS_CODE } from '@@constants'; // Importing HTTP status codes
import { ErrorTypes } from '@@types'; // Importing custom error types

/**
 * Custom error class for handling "Unprocessable Entity" errors (HTTP 422).
 * Thrown when the server understands the request, but it cannot be processed (e.g., validation fails).
 */
export class UnprocessableEntityException extends Error implements ErrorTypes.APIError {
  public name = 'Unprocessable Entity Exception'; // Error name for identification

  public statusCode = HTTP_STATUS_CODE._422; // HTTP status code for Unprocessable Entity

  public scope = ErrorTypes.ErrorScope.UnprocessableEntity; // Error scope to provide more context

  constructor(public message: string) {
    super(); // Call the parent class (Error) constructor
  }
}
