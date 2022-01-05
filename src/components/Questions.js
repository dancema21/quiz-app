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
      <h3>{formatText(questions[step].question)}</h3>
      <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
        {questions[step].answers.map((answer) => {
          const result =
            correctAnswers[step] === answer ? (
              <BsCheckCircleFill style={{ color: "green" }} />
            ) : (
              <AiFillCloseCircle style={{ color: "red" }} />
            );

          const classname =
            myAnswers[step] === answer ? "answer selected" : "answer";

          return (
            <div
              className={classname}
              key={answer}
              data-answer={answer}
              onClick={handleClick}
            >
              {formatText(answer)}
              {myAnswers[step] && <div className="result">{result}</div>}
            </div>
          );
        })}
        <p>
          Progress : {step + 1} / {questions.length}{" "}
        </p>
      </div>
    </>
  );
};

export default Questions;
