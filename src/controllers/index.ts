// Importing individual quiz-related controllers from the `quiz.controllers.ts` file
import {
  createQuiz,
  getQuiz,
  submitAnswer,
  getResults,
} from "@@controllers/quiz.controllers";

// Exporting the controllers for use in other parts of the application (e.g., routes)
export { createQuiz, getQuiz, submitAnswer, getResults };
