import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Header } from "./components/Header/Header";
import "./app.module.css";
import { Filters } from "./components/Filters";

function App() {
  return (
    <div>
      <Header />
      <Filters />
    </div>
  );
}

export default App;
