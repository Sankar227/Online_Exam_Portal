import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Components/Custom.scss";
//Import context
import { useQuiz } from "./QuizContext";

//Live Project link:https://mockexamportal.netlify.app/

const Exam = () => {
  const ref1 = useRef<HTMLSelectElement>(null);
  const ref2 = useRef<HTMLSelectElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  //Use context
  const { setQuestions } = useQuiz();

  const submit = () => {
    if (
      ref1.current?.value === "Select Difficulty" ||
      ref2.current?.value === "Select Category"
    ) {
      alert("Please select Difficulty and Category");
      return;
    }

    setLoading(true);

    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${ref2.current?.value}&difficulty=${ref1.current?.value}&type=multiple`
      )
      .then((res) => {
        setLoading(false);
        setQuestions(res.data.results);
        navigate("/questions");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <h1 className="mb-4 text-primary fw-bold">🎓 Online Exam Portal</h1>

        <div className="card p-4 shadow-lg border-0 rounded-3">
          <div className="form-group mb-3">
            <label className="fw-bold fs-3">📌 Select Difficulty:</label>
            <select className="form-select mt-2 bg-light" ref={ref1}>
              <option defaultValue="Select Difficulty">
                Select Difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group mb-4">
            <label className="fw-bold fs-3">📚 Select Category:</label>
            <select className="form-select mt-2 bg-light" ref={ref2}>
              <option defaultValue="Select Category">Select Category</option>
              <option value="9">General Knowledge</option>
              <option value="18">Computers</option>
              <option value="21">Sport</option>
              <option value="22">Geography</option>
            </select>
          </div>

          <button
            className="btn btn-success btn-lg px-5"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Start Exam"}
          </button>
        </div>
      </div>

      {/* Bellow code is Without style */}
      {/* <h1>Online Exam Portal</h1>
      Difficulty:{" "}
      <select ref={ref1}>
        <option defaultValue="Select Difficulty">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <br />
      Category:{" "}
      <select ref={ref2}>
        <option defaultValue="Select Category">Select Category</option>
        <option value="9">General Knowledge</option>
        <option value="18">Computers</option>
        <option value="21">Sport</option>
        <option value="22">Geography</option>
      </select>
      <br />
      <br />
      <button onClick={submit} disabled={loading}>
        {loading ? "Loading..." : "Start Exam"}
      </button> */}
    </>
  );
};

export default Exam;
