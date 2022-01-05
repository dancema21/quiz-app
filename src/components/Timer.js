import { useEffect, useRef } from "react";

const Timer = ({ secondsDuration, setSecondsDuration, isOver }) => {
  const intervalID = useRef(null);

  useEffect(() => {
    const id = setInterval(
      () => setSecondsDuration((prevSeconds) => 1 + prevSeconds),
      1000
    );
    intervalID.current = id;
  }, []);

  useEffect(() => {
    if (isOver) {
      clearInterval(intervalID.current);
    }
  }, [isOver]);

  const minutes = new Intl.NumberFormat("en-IN", {
    minimumIntegerDigits: 2,
  }).format(Math.floor(secondsDuration / 60));

  const seconds = new Intl.NumberFormat("en-IN", {
    minimumIntegerDigits: 2,
  }).format(secondsDuration % 60);

  return (
    <p>
      {minutes}m{seconds}
    </p>
  );
};

export default Timer;
