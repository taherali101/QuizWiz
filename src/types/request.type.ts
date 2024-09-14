import { CreateQuizDTO, GetQuizDTO, SubmitAnswerDTO, GetResultDTO } from '@@models'; // Adjust the import path

declare global {
    namespace Express {
        interface Request {
            dto?: CreateQuizDTO | GetQuizDTO | SubmitAnswerDTO | GetResultDTO; // Add other DTOs if necessary
        }
    }
}
