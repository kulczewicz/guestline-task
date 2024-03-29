import { Header } from "./components/Header/Header";
import { Filters } from "./components/Filters";
import { Hotels } from "./components/Hotel";
import classes from "./app.module.css";
import { useHotels } from "./hooks/useHotels";
import { Spinner } from "./components/Spinner/Spinner";

function App() {
  const {
    hotels,
    allImages,
    error,
    loading,
    adultsNumber,
    childrenNumber,
    changeNumberOfVisitors,
    numberOfStars,
    changeNumberOfStars,
  } = useHotels();

  return (
    <div>
      <Header allImages={allImages} />
      <Filters
        adultsNumber={adultsNumber}
        changeNumberOfVisitors={changeNumberOfVisitors}
        childrenNumber={childrenNumber}
        numberOfStars={numberOfStars}
        changeNumberOfStars={changeNumberOfStars}
      />
      {loading ? <Spinner /> : null}
      {error ? <div className={classes.errorEmptyState}>{error}</div> : null}
      {Array.isArray(hotels) ? <Hotels hotels={hotels} /> : null}
    </div>
  );
}

export default App;
