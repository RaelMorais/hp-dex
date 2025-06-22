import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesReact } from "./RoutesReact";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesReact/>
      </BrowserRouter>
    </>
  )
}

export default App
