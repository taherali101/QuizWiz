import { HTTP_STATUS_CODE } from '@@constants'; // Importing HTTP status codes
import { ErrorTypes } from '@@types'; // Importing custom error types

/**
 * Custom error class for handling internal server errors (HTTP 500).
 * Thrown when an unexpected error occurs on the server side.
 */
export class InternalServerError extends Error implements ErrorTypes.APIError {
  public name = 'Internal Server Error'; // Error name for identification

  public statusCode = HTTP_STATUS_CODE._500; // HTTP status code for Internal Server Error

  public scope = ErrorTypes.ErrorScope.InternalServer; // Error scope to provide more context

  constructor(public message: string) {
    super(); // Call the parent class (Error) constructor
  }
}
