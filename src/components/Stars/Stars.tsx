import { useState } from "react";
import classes from "./stars.module.css";

interface StarSVGProps {
  isOn: boolean;
}
function StarSVG({ isOn }: StarSVGProps) {
  return (
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
  );
}

interface StarButtonProps extends StarSVGProps {
  onClick: () => void;
}
function StarButton({ onClick, ...rest }: StarButtonProps) {
  return (
    <button onClick={onClick}>
      <StarSVG {...rest} />
    </button>
  );
}

interface StarRatingProps {
  numberOfStars: number;
}
export function StarRating({ numberOfStars }: StarRatingProps) {
  return (
    <div className={classes.stars}>
      {[1, 2, 3, 4, 5].map((number) => (
        <StarSVG key={number} isOn={number <= numberOfStars} />
      ))}
    </div>
  );
}

export function StarFilter({
  numberOfStars: initialNumberOfStars,
}: StarRatingProps) {
  const [numberOfStars, setNumberOfStars] = useState(initialNumberOfStars);

  return (
    <div className={classes.stars}>
      {[1, 2, 3, 4, 5].map((number) => (
        <StarButton
          key={number}
          isOn={number <= numberOfStars}
          onClick={() => {
            setNumberOfStars(number);
          }}
        />
      ))}
    </div>
  );
}
