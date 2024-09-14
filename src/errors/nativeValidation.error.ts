import { ValidationError } from 'class-validator'; // Importing class-validator's ValidationError
import { ErrorTypes } from '@@types'; // Importing custom error types
import { HTTP_STATUS_CODE } from '@@constants'; // Importing HTTP status codes

/**
 * Custom error class for handling validation errors during input validation (HTTP 400).
 * Extracts and formats validation errors from class-validator.
 */
export class InputValidationError implements ErrorTypes.APIError {
  public name = 'Input Validation Error'; // Error name for identification

  public statusCode = HTTP_STATUS_CODE._400; // HTTP status code for Bad Request

  public message = 'There are one or more issues with the input.'; // Default message for validation errors

  public scope = ErrorTypes.ErrorScope.InputValidation; // Error scope to provide more context

  public errors: Array<{ property: string; message: string }> = []; // Array to store individual validation errors

  constructor(baseErrors: ValidationError[]) {
    this.extractErrors(baseErrors); // Call the method to extract and format errors
  }

  /**
   * Recursive function to extract and format validation errors, including nested errors.
   * Loops through the validation errors and adds each one to the `errors` array.
   */
  private extractErrors = (errors: ValidationError[]): void => {
    errors.forEach((error) => {
      if (error.constraints) {
        this.errors.push({
          property: error.property,
          message: Object.values(error.constraints).join(', ') // Concatenating all validation messages for a property
        });
      }

      // Recursively process nested errors
      if (error.children && error.children.length > 0) {
        this.extractErrors(error.children);
      }
    });
  };
}
