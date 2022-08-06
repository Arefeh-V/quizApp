import React, { useState } from "react";
import { quizQuestions, Difficulty, QuestionState } from "../API";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
//components
import QuestionCard from "./QuestionCard";

const Main = () => {
  // console.log()
  //
  const QuestionNO = 3;
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionsData, setQuestionsData] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [end, setEnd] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<object[]>([]);
  const [answer, setAnswer] = useState<object>({
    value: String,
    correct: Boolean,
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // const [error, setError] = useState("");

  const loadQuestion = async () => {
    setEnd(false);
    setUserAnswers([]);
    setGameOver(false);
    if (!started) setStarted(true);

    setLoading(true);
    const DATA = await quizQuestions(QuestionNO, Difficulty.Easy);
    setLoading(false);

    setQuestionsData(DATA);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    debugger;
    if (!gameOver && !end) {
      const value = e.currentTarget.value;
      const correct = questionsData[number].correct_answer === value;
      if (correct) {
        setAnswer({ value, correct });
        setScore((prev) => prev + 1);
      }
    }
  };

  const loadNextQuestion = () => {
    //load next if not last question
    setUserAnswers((prev) => [...prev, answer]);
    setLoading(true);
    debugger;
    if (number + 1 === QuestionNO) {
      setEnd(true);
      // setStarted(false);
      if (score < QuestionNO / 2) setGameOver(true);
    } else {
      setNumber((prev) => prev + 1);
    }
    setLoading(false);
  };

  return (
    <Grid
      container
      xs={12}
      direction="column"
      alignItems="center"
      // justifyContent="center"
      style={{ minHeight: "100vh" }}
      className="main_page"
    >
      <div className="question_box">
        <Box textAlign="center">
          {" "}
          <h1>TEST YOUR KNOWLEDGE</h1>
          {(!started || end) && (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={loadQuestion}
            >
              {end ? "retake the exam" : "start exam"}
            </Button>
          )}
          {started && (
            <>
              {loading && <p>loading question ....</p>}

              {userAnswers.length === QuestionNO ? (
                <>
                  <p className="score">your score: {score} </p>
                  {gameOver ? (
                    <p>you are game over !!!</p>
                  ) : (
                    <p>congrats !! you won !!!</p>
                  )}{" "}
                </>
              ) : null}

              {!loading && !end && (
                <>
                  <Box>question NO : {`${number + 1} / ${QuestionNO}`}</Box>
                  <QuestionCard
                    question={questionsData[number]?.question}
                    answers={questionsData[number]?.answers}
                    // useranswer={userAnswers && userAnswers[number]}
                    totalQuestions={questionsData.length}
                    questionNo={number + 1}
                    callback={checkAnswer}
                  />
                </>
              )}

              {!loading && !end && (
                <Button className="next" onClick={loadNextQuestion}>
                  next question
                </Button>
              )}
            </>
          )}
        </Box>
      </div>
    </Grid>
  );
};
export default Main;
