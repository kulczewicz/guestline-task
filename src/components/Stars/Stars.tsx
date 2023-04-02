import classes from "./stars.module.css";

interface StarSVGProps {
  isOn: boolean;
  isHoverable?: boolean;
}
function StarSVG({ isOn, isHoverable = false }: StarSVGProps) {
  const hoverableClass = isOn
    ? classes.starOnHoverable
    : classes.starOffHoverable;
  const nonHoverableClass = isOn ? classes.starOn : classes.starOff;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 51 48"
    >
      <path
        className={isHoverable ? hoverableClass : nonHoverableClass}
        strokeWidth="2px"
        d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
      />
    </svg>
  );
}

interface StarButtonProps extends StarSVGProps {
  onClick: () => void;
  starRating: number;
}
function StarButton({ onClick, starRating, ...rest }: StarButtonProps) {
  return (
    <button
      className={classes.starButton}
      onClick={onClick}
      aria-label={`Show hotels with rating of at least ${starRating} stars`}
    >
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

interface StarFilterProps {
  numberOfStars: number;
  changeNumberOfStars: (newNumberOfStars: number) => void;
}
export function StarFilter({
  numberOfStars,
  changeNumberOfStars,
}: StarFilterProps) {
  return (
    <div className={classes.stars}>
      {[1, 2, 3, 4, 5].map((number) => (
        <StarButton
          key={number}
          starRating={number}
          isOn={number <= numberOfStars}
          isHoverable
          onClick={() => {
            changeNumberOfStars(number);
          }}
        />
      ))}
    </div>
  );
}
