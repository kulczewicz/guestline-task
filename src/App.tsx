import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import "./app.module.css";
import { Filters } from "./components/Filters";
import { Hotels } from "./components/Hotel";
import { getHotels } from "./services/getHotels";
import { Hotel } from "./types";

function App() {
  const [initialHotels, setInitialHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hotelsGetter = async () => {
      const { data, error } = await getHotels();
      if (error) {
        setError(String(error));
      } else if (data) {
        setInitialHotels(data);
      }
    };
    hotelsGetter();
  }, []);

  return (
    <div>
      <Header />
      <Filters />
      {error ? <div>{error}</div> : null}
      <Hotels hotels={initialHotels} />
    </div>
  );
}

export default App;
