import { useEffect, useState } from "react";
import { Hotel } from "../../types";
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

interface FiltersProps {
  adultsNumber: number;
  changeNumberOfVisitors: (
    action: "increment" | "decrement",
    type: "adults" | "children"
  ) => () => void;
  childrenNumber: number;
  numberOfStars: number;
  changeNumberOfStars: (newNumberOfStars: number) => void;
}
export function Filters({
  adultsNumber,
  changeNumberOfVisitors,
  childrenNumber,
  numberOfStars,
  changeNumberOfStars,
}: FiltersProps) {
  return (
    <div className={classes.filtersWrapper}>
      <div className={classes.filters}>
        <StarFilter
          numberOfStars={numberOfStars}
          changeNumberOfStars={changeNumberOfStars}
        />
        <NumberOfVisitors
          type="Adults"
          number={adultsNumber}
          increment={changeNumberOfVisitors("increment", "adults")}
          decrement={changeNumberOfVisitors("decrement", "adults")}
        />
        <NumberOfVisitors
          type="Children"
          number={childrenNumber}
          increment={changeNumberOfVisitors("increment", "children")}
          decrement={changeNumberOfVisitors("decrement", "children")}
        />
      </div>
    </div>
  );
}
