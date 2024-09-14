import { Router } from 'express';
import { createQuiz, getQuiz, submitAnswer, getResults } from '@@controllers';
import { CreateQuizDTO, GetQuizDTO, SubmitAnswerDTO, GetResultDTO } from '@@models';
import { validateDto } from '@@middlewares';

// Initialize the router
const router = Router();

// Route to create a new quiz
// Validates the request body against the CreateQuizDTO schema
router.post('/quiz', validateDto(CreateQuizDTO, 'body'), createQuiz);

// Route to get a quiz by ID
// Validates the request parameters against the GetQuizDTO schema
router.get('/quiz/:id', validateDto(GetQuizDTO, 'params'), getQuiz);

// Route to submit an answer for a quiz
// Validates the request body against the SubmitAnswerDTO schema
router.post('/quiz/answer/:userId', validateDto(SubmitAnswerDTO, 'body'), submitAnswer);

// Route to get the results of a quiz for a specific user
// Validates the request parameters against the GetResultDTO schema
router.get('/quiz/:quizId/results/:userId', validateDto(GetResultDTO, 'params'), getResults);

// Export the router to be used in the main application
export default router;
