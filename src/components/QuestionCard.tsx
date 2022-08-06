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
      <Box fontWeight={600} sx={{ my: "20px" }}>
        {question}
      </Box>
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
              color="inherit"
              variant="text"
              style={{ fontWeight: answer === item ? "600" : "normal" }}
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
