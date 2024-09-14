import { validateDto } from "@@middlewares/validator.middleware";
import { errorHandler } from "@@middlewares/quiz.middleware";

// Exporting middleware functions for use in the application
export { errorHandler, validateDto };
