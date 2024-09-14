import { HTTP_STATUS_CODE } from '@@constants'; // Importing HTTP status codes
import { ErrorTypes } from '@@types'; // Importing custom error types

/**
 * Custom error class for handling "Not Found" errors (HTTP 404).
 * Thrown when a requested resource (e.g., a quiz or result) is not found.
 */
export class NotFoundError extends Error implements ErrorTypes.APIError {
  public name = 'Not Found Error'; // Error name for identification

  public statusCode = HTTP_STATUS_CODE._404; // HTTP status code for Not Found

  public scope = ErrorTypes.ErrorScope.NotFound; // Error scope to provide more context

  constructor(public message: string) {
    super(); // Call the parent class (Error) constructor
  }
}
