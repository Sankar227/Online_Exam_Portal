import React, { useState, useEffect } from "react";
import { useQuiz } from "./QuizContext"; // Import context
import { useNavigate } from "react-router-dom";
import "../Components/Custom.scss";

const Questions = () => {
  const { questions, handleSelect } = useQuiz(); // Get questions and handleSelect from context
  const [timeRemaining, setTimeRemaining] = useState<number>(900); // 15 minutes
  // const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    navigate("/results");
  };

  useEffect(() => {
    if (questions.length > 0) {
      const timer = setTimeout(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1);
        } else {
          navigate("/results");
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTimeRemaining(0);
    }
  }, [timeRemaining, navigate]); // Clear timer when component unmounts or timeRemaining changes
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div className="container mt-5">
        <div className="timer text-light">
          Time Left: {formatTime(timeRemaining)}
        </div>
        <h1 className="text-center text-warning">Answer the Questions</h1>
        {questions.length > 0 ? (
          questions.map((q: any, index: number) => {
            const options = [...q.incorrect_answers, q.correct_answer];
            return (
              <div
                key={index}
                className="card p-3 mt-3 shadow bg-light bg-gradient"
              >
                <h5>
                  {index + 1}.{q.question}
                </h5>
                <ul className="list-group list-group-flush">
                  {options.map((answer: string, i: number) => (
                    <li
                      key={i}
                      className="list-group-item bg-light bg-gradient"
                    >
                      <label className="form-check-label">
                        <input
                          className="form-check-input me-2"
                          type="radio"
                          name={`question-${index}`}
                          value={answer}
                          onChange={(e) => handleSelect(index, e.target.value)}
                        />
                        {answer}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          <p className="text-center">No questions available</p>
        )}

        {questions.length > 0 ? (
          <div className="text-center mt-4">
            <button
              className="btn btn-success btn-lg me-2"
              onClick={handleSubmit}
            >
              Submit Answers
            </button>
            <button className="btn btn-secondary btn-lg" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Questions;
