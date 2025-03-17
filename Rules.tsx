import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./QuizContext"; // Import provider
import Exam from "./Exam";
import Questions from "./Questions";
import Results from "./Results";

function App() {
  return (
    <Router>
      <QuizProvider>
        <Routes>
          <Route path="/" element={<Exam />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </QuizProvider>
    </Router>
  );
}

export default App;
