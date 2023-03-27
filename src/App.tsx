import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import "./app.module.css";
import { Filters } from "./components/Filters";
import { Hotels } from "./components/Hotel";
import { getHotels } from "./services/getHotels";
import { Hotel } from "./types";
import classes from "./app.module.css";

function App() {
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hotelsGetter = async () => {
      const { data, error } = await getHotels();
      if (error) {
        setError(String(error));
      } else if (data) {
        setAllHotels(data);
      }
    };
    hotelsGetter();
  }, []);

  return (
    <div>
      <Header />
      <Filters allHotels={allHotels} setHotels={setHotels} />
      {error ? <div className={classes.errorEmptyState}>{error}</div> : null}
      <Hotels hotels={hotels} />
    </div>
  );
}

export default App;
