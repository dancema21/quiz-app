import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import Result from "../src/components/Result";
import Questions from "../src/components/Questions";
import Timer from "../src/components/Timer";
import Spinner from "./components/Spinner";

const QuizPage = (props) => {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState();
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);
  const [secondsDuration, setSecondsDuration] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    fetchQuestions(id);
  }, []);

  async function fetchQuestions(id) {
    try {
      const quizData = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${id}`
      );
      const res = await quizData.json();

      const category = res.results[0].category;
      const correct_answers = res.results.map(
        (result) => result.correct_answer
      );
      const questions = res.results.map((result) => ({
        question: result.question,
        answers: [result.correct_answer, ...result.incorrect_answers].sort(),
      }));

      setCategory(category);
      setCorrectAnswers(correct_answers);
      setQuestions(questions);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError(true);
    }
  }

  const handleClick = (e) => {
    if (myAnswers[step]) {
      return;
    }

    setMyAnswers([...myAnswers, e.currentTarget.dataset.answer]);
    setTimeout(() => setStep((prevStep) => prevStep + 1), 300);
  };

  useEffect(() => {
    const score = myAnswers.reduce((acc, answer, index) => {
      const point = correctAnswers[index] === answer ? 1 : 0;
      return point + acc;
    }, 0);
    setScore(score);
  }, [correctAnswers, myAnswers]);

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleNextStep = () => {
    if (step < correctAnswers.length) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  if (loading) return <Spinner />;

  if (error)
    return (
      <>
        <h1 className="text-center mb-2 text-lg font-bold">Quiz App</h1>
        <div className="font-bold text-lg mt-15 text-rose-500 text-center">
          App is not available for now, try again later
        </div>
      </>
    );

  return (
    <>
      {step !== questions.length ? (
        <>
          <div className="flex justify-between">
            <Timer
              secondsDuration={secondsDuration}
              setSecondsDuration={setSecondsDuration}
              isOver={questions.length === myAnswers.length}
            />
            <p>Score: {score}</p>
          </div>
          <h2 className="text-center text-lg mb-1 mt-5">{category}</h2>
          <Questions
            questions={questions}
            step={step}
            handleClick={handleClick}
            correctAnswers={correctAnswers}
            myAnswers={myAnswers}
          />
          {questions.length === myAnswers.length && step < questions.length && (
            <div className="flex justify-between content-between w-1/4 m-auto mt-2 cursor-pointer ">
              <GrLinkPrevious onClick={handlePreviousStep} />
              <GrLinkNext onClick={handleNextStep} />
            </div>
          )}
        </>
      ) : (
        <Result
          score={score}
          questions={questions}
          setStep={setStep}
          secondsDuration={secondsDuration}
        />
      )}
    </>
  );
};

export default QuizPage;
