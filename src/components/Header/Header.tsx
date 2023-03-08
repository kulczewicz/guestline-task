import classes from "./header.module.css";

export function Header() {
  return (
    <div className={classes.header}>
      <img className={classes.headerImage} src="/header.jpg" />
    </div>
  );
}
