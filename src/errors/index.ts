// Re-exporting all the custom error classes from their respective files for centralized usage
import { InputValidationError } from '@@errors/nativeValidation.error';
import { NotFoundError } from '@@errors/notFound.error';
import { ForbiddenError } from '@@errors/forbidden.error';
import { InternalServerError } from '@@errors/internalServer.error';
import { UnprocessableEntityException } from '@@errors/unprocessableEntity.error';

export {
  InputValidationError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
  UnprocessableEntityException
};
