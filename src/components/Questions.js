//import Timer from "./Timer";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

const formatText = (txt) => {
  return txt
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&rsquo;", "'")
    .replaceAll(";&rdquo;", '"')
    .replaceAll("&ldquo;", '"');
};

const Questions = ({
  questions,
  step,
  correctAnswers,
  handleClick,
  myAnswers,
}) => {
  return (
    <>
      <h2 className="font-bold mt-5">{formatText(questions[step].question)}</h2>
      <div>
        {questions[step].answers.map((answer) => {
          const result =
            correctAnswers[step] === answer ? (
              <BsCheckCircleFill className="text-green-500" />
            ) : (
              <AiFillCloseCircle className="text-red-500" />
            );

          let classname =
            "bg-amber-400 hover:bg-amber-700 text-white py-2 px-4 relative rounded-full my-2 px-5";
          if (myAnswers[step] === answer) classname += " font-bold";

          return (
            <div
              className={classname}
              key={answer}
              data-answer={answer}
              onClick={handleClick}
            >
              {formatText(answer)}
              {myAnswers[step] && (
                <div className="absolute top-3 right-2">{result}</div>
              )}
            </div>
          );
        })}
        <p className="text-center mt-5">
          Progress : {step + 1} / {questions.length}{" "}
        </p>
      </div>
    </>
  );
};

export default Questions;
