import React from "react";
import "./App.css";
import Main from "./components/Main";
import { ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: ["Edu SA Beginner", "cursive"].join(","),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
  );
};

export default App;
