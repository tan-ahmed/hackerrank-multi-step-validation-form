import React, { useState, createContext } from "react";
import NameStep from "../NameStep";
import EmailStep from "../EmailStep";
import PasswordStep from "../PasswordStep";
import FinalPage from "../FinalPage";
import "./index.css";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../validation";

export const FormContext = createContext({
  formData: {
    name: "",
    email: "",
    password: "",
  },
  setFormData: () => {},
  setStep: () => {},
});
export const TOTAL_STEPS = 3;

function ProgressIndicator({ currentStep }) {
  return (
    <div data-testid="progress-indicator">
      <span>
        Step {currentStep + 1}/{TOTAL_STEPS}
      </span>
    </div>
  );
}

function MultiStepForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [step, setStep] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <NameStep />;
      // return <PasswordStep />;
      case 1:
        return <EmailStep />;
      case 2:
        return <PasswordStep />;
      case 3:
        return <FinalPage />;
      default:
        return null;
    }
  };

  return (
    <div className="layout-column align-items-center justify-content-start">
      <FormContext.Provider value={{ formData, setFormData, setStep }}>
        <div className="card w-40 pt-30 pb-8 mt-10">
          <form onSubmit={handleFormSubmit} data-testid="step-form">
            {renderStep()}
            {step !== TOTAL_STEPS && (
              <div>
                <section className="layout-row align-items-center justify-content-center mt-15">
                  <button
                    onClick={() => {
                      setStep(step - 1);
                    }}
                    disabled={step === 0}
                    data-testid="prev-btn"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      setStep(step + 1);
                    }}
                    disabled={
                      (step === 0 && !validateName(formData.name)) ||
                      (step === 1 && !validateEmail(formData.email)) ||
                      (step === 2 && !validatePassword(formData.password))
                    }
                    data-testid="next-btn"
                  >
                    Next
                  </button>
                </section>
              </div>
            )}
          </form>
        </div>
        <div className="mt-20">
          {step != TOTAL_STEPS && <ProgressIndicator currentStep={step} />}
        </div>
      </FormContext.Provider>
    </div>
  );
}

export default MultiStepForm;
