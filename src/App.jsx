import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
