import { HTTP_STATUS_CODE } from '@@constants'; // Importing HTTP status codes
import { ErrorTypes } from '@@types'; // Importing custom error types

/**
 * Custom error class for handling "Forbidden" errors (HTTP 403).
 * Thrown when a user is not authorized to perform a specific action.
 */
export class ForbiddenError extends Error implements ErrorTypes.APIError {
  public name = 'Forbidden Error'; // Error name for identification

  public statusCode = HTTP_STATUS_CODE._403; // HTTP status code for Forbidden

  public scope = ErrorTypes.ErrorScope.Forbidden; // Error scope to provide more context

  constructor(public message: string) {
    super(); // Call the parent class (Error) constructor
  }
}
