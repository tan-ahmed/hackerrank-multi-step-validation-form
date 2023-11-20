import React, { useContext } from "react";
import "./index.css";
import { validateEmail } from "../../validation";
import { FormContext } from "../MultiStepForm";

function EmailStep() {
  const { formData, setStep, setFormData } = useContext(FormContext);
  const isEmailValid = validateEmail(formData.email);

  return (
    <div>
      <section className="layout-row align-items-center justify-content-center mt-10">
        <label htmlFor="email" className="email-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          data-testid="email-input"
        />
      </section>
      {!isEmailValid && formData.email.length > 0 && (
        <section className="layout-row align-items-center justify-content-center mt-10">
          <p className="error-message" data-testid="email-validation-message">
            Invalid Email!
          </p>
        </section>
      )}
    </div>
  );
}

export default EmailStep;
