// Defining common HTTP status codes as constants to improve code readability and consistency.
// These status codes are used to represent various outcomes of HTTP requests.
export const HTTP_STATUS_CODE = {
  _200: 200, // OK: The request was successful
  _201: 201, // Created: The resource was successfully created
  _400: 400, // Bad Request: The request was invalid or cannot be served
  _401: 401, // Unauthorized: Authentication is required and has failed or not been provided
  _403: 403, // Forbidden: The server understood the request but refuses to authorize it
  _404: 404, // Not Found: The requested resource could not be found
  _422: 422, // Unprocessable Entity: The server understands the request but cannot process the contained instructions
  _500: 500  // Internal Server Error: A generic server error
};
