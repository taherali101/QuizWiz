import { v4 as uuidv4 } from "uuid";
import { Quiz, Question, Result, Answer } from "@@models";
import { NotFoundError, UnprocessableEntityException } from "@@errors";

// In-memory storage for quizzes and results
const quizzes: Quiz[] = [];
const results: Result[] = [];

/**
 * Creates a new quiz with a title and a list of questions.
 *
 * @param title - The title of the quiz.
 * @param questions - Array of questions for the quiz.
 * @returns The newly created quiz.
 * @throws UnprocessableEntityException if title or questions are missing.
 */
export const generateQuiz = async (
  title: string,
  questions: Question[]
): Promise<Quiz> => {
  if (!title || questions.length === 0) {
    throw new UnprocessableEntityException("Title and questions are required");
  }

  // Map questions to include a unique ID
  const quizQuestions: Question[] = questions.map((question) => ({
    id: uuidv4(),
    text: question.text,
    options: question.options,
    correctOption: question.correctOption,
  }));

  // Create the quiz
  const quiz: Quiz = {
    id: uuidv4(),
    title,
    questions: quizQuestions,
  };

  // Store the quiz
  quizzes.push(quiz);
  return quiz;
};

/**
 * Retrieves a quiz by its ID.
 *
 * @param id - The ID of the quiz to retrieve.
 * @returns The requested quiz if found.
 * @throws NotFoundError if the quiz with the given ID does not exist.
 */
export const retrieveQuiz = async (id: string): Promise<Quiz | undefined> => {
  const quiz = quizzes.find((q) => q.id === id);
  if (!quiz) {
    throw new NotFoundError("Quiz not found");
  }
  return quiz;
};

/**
 * Submits an answer for a specific quiz question.
 *
 * @param quizId - The ID of the quiz.
 * @param userId - The ID of the user submitting the answer.
 * @param questionId - The ID of the question being answered.
 * @param selectedOption - The selected option for the question.
 * @returns An object indicating whether the answer was correct and the correct option if the answer was incorrect.
 * @throws NotFoundError if the quiz or question does not exist.
 * @throws UnprocessableEntityException if an answer for the question has already been submitted.
 */
export const submitResponse = async (
  quizId: string,
  userId: string,
  questionId: string,
  selectedOption: number
): Promise<{ isCorrect: boolean; correctOption?: number }> => {
  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz) throw new NotFoundError("Quiz not found");

  const question = quiz.questions.find((q) => q.id === questionId);
  if (!question) throw new NotFoundError("Question not found");

  const isCorrect = question.correctOption === selectedOption;
  const answer: Answer = { questionId, selectedOption, isCorrect };

  // Find or create result entry
  let result = results.find((r) => r.quizId === quizId && r.userId === userId);
  if (!result) {
    result = { quizId, userId, score: isCorrect ? 1 : 0, answers: [answer] };
    results.push(result);
  } else {
    // Check if an answer for the question has already been submitted
    if (result.answers.some((a) => a.questionId === questionId)) {
      throw new UnprocessableEntityException(
        "Answer is already submitted for this question"
      );
    } else {
      result.answers.push(answer);
      if (isCorrect) result.score += 1;
    }
  }

  return {
    isCorrect,
    correctOption: isCorrect ? undefined : question.correctOption,
  };
};

/**
 * Retrieves the results of a specific quiz for a particular user.
 *
 * @param quizId - The ID of the quiz.
 * @param userId - The ID of the user.
 * @returns The results of the quiz for the user if found.
 * @throws NotFoundError if the results for the quiz and user do not exist.
 */
export const retrieveResults = async (
  quizId: string,
  userId: string
): Promise<Result | undefined> => {
  const result = results.find(
    (r) => r.quizId === quizId && r.userId === userId
  );
  if (!result) {
    throw new NotFoundError("Results not found");
  }
  return result;
};
