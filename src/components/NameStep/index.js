import React, { useContext } from "react";
import "./index.css";
import { FormContext } from "../MultiStepForm";
import { validateName } from "../../validation";

function NameStep() {
  const { formData, setStep, setFormData } = useContext(FormContext);
  const isNameValid = validateName(formData.name);
  return (
    <div>
      <section className="layout-row align-items-center justify-content-center mt-10">
        <label htmlFor="name" className="name-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          data-testid="name-input"
        />
      </section>
      {!isNameValid && formData.name.length > 0 && (
        <section className="layout-row align-items-center justify-content-center mt-10">
          <p className="error-message" data-testid="name-validation-message">
            Invalid Name!
          </p>
        </section>
      )}
    </div>
  );
}

export default NameStep;
