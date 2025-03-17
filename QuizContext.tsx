import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext<any>(null);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<any[]>([]);

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Function to handle user-selected answers
  const handleSelect = (index: number, answer: string) => {
    setAnswers({ ...answers, [index]: answer });
  };

  return (
    <QuizContext.Provider
      value={{ questions, handleSelect, setQuestions, answers }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext(QuizContext);
};
