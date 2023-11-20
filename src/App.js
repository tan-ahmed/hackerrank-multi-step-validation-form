import React from "react";
import "./App.css";
import "h8k-components";
import MultiStepForm from "./components/MultiStepForm";

const title = "Multi Step Validation Form";

const App = () => {
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <MultiStepForm />
    </div>
  );
};

export default App;
