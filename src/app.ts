import express from 'express';
import quizRoutes from './routes/quiz.routes';
import { errorHandler } from '@@middlewares';

const app = express();
app.use(express.json());
app.use('/api', quizRoutes);
app.use(errorHandler);

export default app;
