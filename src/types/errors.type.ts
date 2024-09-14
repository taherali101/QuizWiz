export enum ErrorScope {
  NotFound = 'resource:not found',
  InputValidation = 'input:validation',
  UnprocessableEntity = 'unprocessable entity',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
  InternalServer = 'internal:server error',
}

export interface APIError {
  statusCode: number;
  message: string;
  scope: ErrorScope;
}
