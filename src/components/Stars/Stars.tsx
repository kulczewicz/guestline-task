import { useState } from "react";
import classes from "./stars.module.css";

type StarValue = 1 | 2 | 3 | 4 | 5;
interface StarProps {
  isOn: boolean;
  // starValue: StarValue;
  onClick: () => void;
}
export function Star({ isOn, onClick }: StarProps) {
  return (
    <button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 51 48"
      >
        <path
          fill={isOn ? "yellow" : "none"}
          stroke={isOn ? "yellow" : "#000"}
          strokeWidth="2px"
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
      </svg>
    </button>
  );
}

interface StarsProps {
  isEditable?: boolean;
  numberOfStars: StarValue;
}
export function StarsFilter({
  isEditable = false,
  numberOfStars: initialNumberOfStars,
}: StarsProps) {
  const [numberOfStars, setNumberOfStars] = useState(initialNumberOfStars);

  return (
    <div className={classes.stars}>
      {[1, 2, 3, 4, 5].map((number) => (
        <Star
          isOn={number <= numberOfStars}
          onClick={() => {
            setNumberOfStars(number as StarValue);
          }}
        />
      ))}
    </div>
  );
}
