import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Header } from "./components/Header/Header";
import "./app.module.css";
import { Filters } from "./components/Filters";
import { Hotels } from "./components/Hotel";
import hotels from "../hotels.json";

function App() {
  return (
    <div>
      <Header />
      <Filters />
      <Hotels hotels={hotels} />
    </div>
  );
}

export default App;
