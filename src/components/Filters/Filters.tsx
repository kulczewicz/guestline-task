import { useState } from "react";
import { StarFilter } from "../Stars";
import classes from "./filters.module.css";

function decrementIfNonNegative(number: number) {
  const newNumber = number - 1;
  return newNumber < 0 ? number : newNumber;
}

interface NumberOfVisitorsProps {
  type: "Adults" | "Children";
  number: number;
  increment: () => void;
  decrement: () => void;
}
export function NumberOfVisitors({
  type,
  number,
  increment,
  decrement,
}: NumberOfVisitorsProps) {
  return (
    <div>
      <span className={classes.numberOfVisitorsLabel}>{type}: </span>
      <button className={classes.numberOfVisitorsButton} onClick={increment}>
        +
      </button>
      <span className={classes.numberOfVisitorsLabel}>{number}</span>
      <button className={classes.numberOfVisitorsButton} onClick={decrement}>
        -
      </button>
    </div>
  );
}

export function Filters() {
  const [adultsNumber, setAdultsNumber] = useState(2);
  const [childrenNumber, setChildrenNumber] = useState(0);

  const incrementAdults = () => {
    setAdultsNumber((number) => number + 1);
  };
  const decrementAdults = () => {
    setAdultsNumber(decrementIfNonNegative);
  };
  const incrementChildren = () => {
    setChildrenNumber((number) => number + 1);
  };
  const decrementChildren = () => {
    setChildrenNumber(decrementIfNonNegative);
  };

  return (
    <div className={classes.filtersWrapper}>
      <div className={classes.filters}>
        <StarFilter numberOfStars={3} />
        <NumberOfVisitors
          type="Adults"
          number={adultsNumber}
          increment={incrementAdults}
          decrement={decrementAdults}
        />
        <NumberOfVisitors
          type="Children"
          number={childrenNumber}
          increment={incrementChildren}
          decrement={decrementChildren}
        />
      </div>
    </div>
  );
}
