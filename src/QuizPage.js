import { useEffect, useState } from "react";

import Result from "../src/components/Result";
import Questions from "../src/components/Questions";
import Timer from "../src/components/Timer";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useParams } from "react-router-dom";
const QuizPage = (props) => {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState();
  //const router = useRouter();
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);
  const [secondsDuration, setSecondsDuration] = useState(0);
  const [score, setScore] = useState(0);
  let { id } = useParams();

  useEffect(() => {
    fetchQuestions(id);
  }, []);

  async function fetchQuestions(id) {
    console.log(id);
    const quizData = await fetch(
      `https://opentdb.com/api.php?amount=10&type=multiple&category=${id}`
    );
    const res = await quizData.json();

    const category = res.results[0].category;
    const correct_answers = res.results.map((result) => result.correct_answer);
    const questions = res.results.map((result) => ({
      question: result.question,
      answers: [result.correct_answer, ...result.incorrect_answers].sort(),
    }));
    console.log(res);

    setCategory(category);
    setCorrectAnswers(correct_answers);
    setQuestions(questions);
  }

  const handleClick = (e) => {
    if (myAnswers[step]) {
      return;
    }

    setMyAnswers([...myAnswers, e.currentTarget.dataset.answer]);
    setTimeout(() => setStep((prevStep) => prevStep + 1), 300);
  };

  return (
    <main>
      {step !== questions.length ? (
        <>
          <div>
            <Timer
              secondsDuration={secondsDuration}
              setSecondsDuration={setSecondsDuration}
              isOver={questions.length === myAnswers.length}
            />
            <p>Score: {score}</p>
          </div>
          <h1>{category}</h1>
          <Questions
            questions={questions}
            step={step}
            handleClick={handleClick}
            correctAnswers={correctAnswers}
            myAnswers={myAnswers}
          />
        </>
      ) : (
        <Result
          score={score}
          questions={questions}
          setStep={setStep}
          secondsDuration={secondsDuration}
        />
      )}
    </main>
  );
};

export default QuizPage;
