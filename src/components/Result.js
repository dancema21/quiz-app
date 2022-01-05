import { Link } from "react-router-dom";

const Result = ({ score, questions, setStep, secondsDuration }) => {
  return (
    <>
      <h1>Results</h1>
      <h2>
        Final Score :{" "}
        <span>
          {score} / {questions.length}
        </span>
      </h2>
      <p>
        Time to complete : {Math.floor(secondsDuration / 60)} minute(s) and{" "}
        {secondsDuration % 60} seconds
      </p>

      {score > 5 ? (
        <h3>You passed the quiz 🥳</h3>
      ) : (
        <h3>You failed the quiz 😢</h3>
      )}

      <div>
        <button>
          <Link to="/">Play again !</Link>
        </button>

        <div onClick={() => setStep(0)}>Check my answers</div>
      </div>
    </>
  );
};

export default Result;
