import { Request, Response } from "express"; // Importing types for Express requests and responses
import {
  generateQuiz, // Service function to create a new quiz
  retrieveQuiz, // Service function to fetch a quiz by ID
  retrieveResults, // Service function to fetch quiz results
  submitResponse, // Service function to handle quiz answer submissions
} from "@@services";

import { NotFoundError, UnprocessableEntityException } from "@@errors"; // Custom error classes
import { controller } from "@@handlers"; // Handler to wrap controller logic with error handling
import { HTTP_STATUS_CODE } from "@@constants"; // HTTP status codes for consistency

/**
 * Controller for creating a new quiz.
 * This function receives the quiz title and questions from the request body.
 * It validates the input, creates a quiz using the `generateQuiz` service, and returns the created quiz.
 */
export const createQuiz = controller(async (req: Request, res: Response) => {
  const { title, questions } = req.body; // Extracting quiz data from the request body

  // If either the title or questions are missing, throw a validation error
  if (!title || !questions) {
    throw new UnprocessableEntityException("Title and questions are required");
  }

  // Call the service to create the quiz and return the created quiz in the response
  const quiz = await generateQuiz(title, questions);
  return res.status(HTTP_STATUS_CODE._201).json({ success: true, data: quiz });
});

/**
 * Controller for fetching a quiz by its ID.
 * It retrieves the quiz from the service, and if found, removes the correct answers before returning it.
 */
export const getQuiz = controller(async (req: Request, res: Response) => {
  const { id } = req.params; // Extracting the quiz ID from the URL parameters
  const quiz = await retrieveQuiz(id); // Calling the service to fetch the quiz

  // If the quiz doesn't exist, throw a NotFoundError
  if (!quiz) {
    throw new NotFoundError("Quiz not found");
  }

  // Prepare the quiz response without revealing the correct answers
  const quizWithoutAnswers = {
    ...quiz,
    questions: quiz.questions.map((q: Record<string, any>) => ({
      id: q.id,
      text: q.text,
      options: q.options,
    })),
  };

  // Return the quiz without answers in the response
  return res
    .status(HTTP_STATUS_CODE._200)
    .json({ success: true, data: quizWithoutAnswers });
});

/**
 * Controller for submitting an answer to a quiz question.
 * This function accepts the quiz ID, question ID, and selected option from the request.
 * It validates the input, processes the answer submission, and returns the result.
 */
export const submitAnswer = controller(async (req: Request, res: Response) => {
  const { quizId, questionId, selectedOption } = req.body; // Extracting answer details from the request body
  const { userId } = req.params; // Extracting the user ID from the URL parameters

  // If any required fields are missing, throw a validation error
  if (!quizId || !questionId || selectedOption === undefined) {
    throw new UnprocessableEntityException(
      "Quiz ID, Question ID, and selected option are required"
    );
  }

  // Call the service to process the answer submission and return the result
  const result = await submitResponse(
    quizId,
    userId,
    questionId,
    selectedOption
  );
  return res
    .status(HTTP_STATUS_CODE._200)
    .json({ success: true, data: result });
});

/**
 * Controller for fetching quiz results.
 * This function retrieves the results for a specific quiz and user.
 */
export const getResults = controller(async (req: Request, res: Response) => {
  const { quizId, userId } = req.params; // Extracting quiz ID and user ID from the URL parameters
  const result = await retrieveResults(quizId, userId); // Calling the service to fetch the results

  // If the results are not found, throw a NotFoundError
  if (!result) {
    throw new NotFoundError("Results not found");
  }

  // Return the quiz results in the response
  return res
    .status(HTTP_STATUS_CODE._200)
    .json({ success: true, data: result });
});
