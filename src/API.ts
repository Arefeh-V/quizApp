import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
export const quizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
  const data = await await fetch(endpoint).then(
    (res) => {
      if (res.status >= 400) {
        throw new Error("Server responds with error!");
      }

      return res.json();
    },

    (err) => {
      const error = new Error("couldn't complete the api call !");
      console.log("error", error);
      // setError("couldn't complete the api call !");
      return error;
    }
  );
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
