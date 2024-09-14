import { IsArray, IsInt, IsString, Length, ArrayMinSize, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDTO {
    @IsString()
    text!: string;

    @IsArray()
    @ArrayMinSize(4)
    @Length(1, 255, { each: true })  // Adjust length as needed
    options!: string[];

    @IsInt()
    @IsOptional()  // If correctOption is optional, otherwise remove this line
    correctOption!: number;
}

export class CreateQuizDTO {
    @IsString()
    title!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDTO)
    questions!: QuestionDTO[];
}

export class GetQuizDTO {
    @IsString()
    id!: string;
}

export class SubmitAnswerDTO {
    @IsString()
    quizId!: string;

    @IsString()
    questionId!: string;

    @IsInt()
    selectedOption!: number;
}

export class GetResultDTO {
    @IsString()
    quizId!: string;

    @IsString()
    userId!: string;
}
