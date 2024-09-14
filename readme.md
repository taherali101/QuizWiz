# QuizWiz

## Description

QuizWiz is a RESTful API application designed for managing and answering multiple-choice quizzes. It allows users to create quizzes, retrieve them, submit answers, and view results.

## Getting Started

These instructions will help you set up and run the QuizWiz application locally.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Installation

1. **Clone the repository:**

2. **Install dependencies and Compile TypeScript to JavaScript:**

    ```bash
    yarn setup
    ```

### Running the Application

- **Start in development mode:**

    ```bash
    yarn start
    ```

    This will use `ts-node` to run the application directly with TypeScript.

### Add on Scripts

- **Setup:**

    ```bash
    yarn setup
    ```

    This installs dependencies and compiles TypeScript files.

- **Clean:**

    ```bash
    yarn clean
    ```

    This removes the `dist` directory, `node_modules`, and clears the Yarn cache. It also runs `yarn setup` to reinstall dependencies and recompile.

### API Endpoints

- **Create a Quiz:**

    - `POST /quiz`
    - **Request Body:** `CreateQuizDTO`
    - **Description:** Creates a new quiz with a title and a list of questions.

- **Retrieve a Quiz:**

    - `GET /quiz/:id`
    - **URL Parameters:** `id` (Quiz ID)
    - **Description:** Fetches a quiz by its ID.

- **Submit an Answer:**

    - `POST /quiz/answer/:userId`
    - **URL Parameters:** `userId` (User ID)
    - **Request Body:** `SubmitAnswerDTO`
    - **Description:** Submits an answer for a quiz question.

- **Retrieve Results:**

    - `GET /quiz/:quizId/results/:userId`
    - **URL Parameters:** `quizId` (Quiz ID), `userId` (User ID)
    - **Description:** Fetches quiz results for a specific user.

### Dependencies

- `express`: Web framework for Node.js.
- `class-validator` & `class-transformer`: For data validation and transformation.
- `uuid`: For generating unique IDs.

### Development Dependencies

- `typescript` & `ttypescript`: For TypeScript support.
- `ts-node`: TypeScript execution environment.
- `tsconfig-paths`: For resolving module paths.
- `@types/*`: TypeScript type definitions.

### Author

Taher Ali

### Acknowledgements

- This project uses several open-source libraries and tools that have been instrumental in its development.

