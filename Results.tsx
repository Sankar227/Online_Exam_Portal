import { useQuiz } from "./QuizContext";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { questions, answers } = useQuiz();

  const navigate = useNavigate();

  let score: number = 0;
  questions.forEach((v: any, index: number) => {
    if (answers[index] === v.correct_answer) {
      score += 1; // increment score by 1
    }
  });

  const total = questions.length;

  return (
    <>
      <div className="modal fade show d-block " tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog">
          <div className="modal-content text-center text-white p-4 bg-light border-0 bg-transparent">
            <div className="modal-header-center">
              <h2 className="modal-titel text-white d-flex justify-content-center">
                🎯 Exam Results
              </h2>
            </div>
            <div className="modal-body">
              <h2 className="fw-bold">
                Your score: <span style={{ color: "#7bffc2" }}>{score}</span>/
                {total}
              </h2>

              {score >= 5 ? (
                <h3 className="text-success">
                  🎉 Congratulations! You passed!
                </h3>
              ) : (
                <h3 className="text-denger">
                  😞 Try again! You can do better.
                </h3>
              )}
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                className="btn btn-outline-info text-white"
                onClick={() => navigate("/")}
              >
                🔄 Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
