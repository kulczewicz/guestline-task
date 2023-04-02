import { StarFilter } from "../Stars";
import classes from "./filters.module.css";

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
    <div className={classes.numberOfVisitors}>
      <span className={classes.visitorsLabel}>{type}: </span>
      <button className={classes.numberOfVisitorsButton} onClick={increment}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes.numberOfVisitorsSVG}
          viewBox="0 0 24 24"
        >
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
      </button>
      <span className={classes.numberOfVisitorsLabel}>{number}</span>
      <button className={classes.numberOfVisitorsButton} onClick={decrement}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes.numberOfVisitorsSVG}
          viewBox="0 0 24 24"
        >
          <path d="M0 10h24v4h-24z" />
        </svg>
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
