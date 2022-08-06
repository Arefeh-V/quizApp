import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

type Props = {
  question: string;
  answers?: string[];
  callback?: any;
  // useranswer?: string;
  questionNo: Number;
  totalQuestions: Number;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  // useranswer,
  totalQuestions,
  questionNo,
}) => {
  const [answer, setAnswer] = useState("");
  return (
    <Box textAlign="start" sx={{ maxWidth: "450px" }}>
      <p>{question}</p>
      <div>
        {answers?.map((item, index) => (
          <div key={index}>
            <Button
              value={item}
              // disabled={useranswer ? true : false}
              onClick={(e) => {
                callback(e);
                setAnswer(e.currentTarget.value);
              }}
              style={{ color: answer === item ? "orange" : "inherit" }}
            >
              {item}
            </Button>
          </div>
        ))}
      </div>
    </Box>
  );
};
export default QuestionCard;
