import classes from "./spinner.module.css";

export function Spinner() {
  return (
    <div className={classes.spinnerWrapper}>
      <div className={classes.spinner} />
    </div>
  );
}
