import { Link } from "react-router-dom";

const Result = ({ score, questions, setStep, secondsDuration }) => {
  return (
    <>
      <h1 className="font-bold text-lg text-center">Results</h1>
      <h2 className="text-center text-lg">
        Final Score :{" "}
        <span>
          {score} / {questions.length}
        </span>
      </h2>
      <p className="text-center">
        Time to complete : {Math.floor(secondsDuration / 60)} minute(s) and{" "}
        {secondsDuration % 60} seconds
      </p>

      <p className="font-bold text-center mt-5">
        {score > 5 ? (
          <h3>You passed the quiz 🥳</h3>
        ) : (
          <h3>You failed the quiz 😢</h3>
        )}
      </p>

      <div className="flex flex-col justify-center items-center h-100">
        <button className="bg-amber-400 hover:bg-amber-700 text-white py-2 px-4 relative rounded-full my-2 px-5">
          <Link to="/">Play again !</Link>
        </button>

        <div className="underline cursor-pointer" onClick={() => setStep(0)}>
          Check my answers
        </div>
      </div>
    </>
  );
};

export default Result;
