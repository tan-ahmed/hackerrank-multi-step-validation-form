import React, { useContext } from "react";
import "./index.css";
import { FormContext } from "../MultiStepForm";
import { validatePassword } from "../../validation";

function PasswordStep() {
  const { formData, setStep, setFormData } = useContext(FormContext);
  const isValidPassword = validatePassword(formData.password);

  return (
    <div>
      <section className="layout-row align-items-center justify-content-center mt-10">
        <label htmlFor="password" className="password-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          data-testid="password-input"
        />
      </section>
      {!isValidPassword && formData.password.length > 0 && (
        <section className="layout-row align-items-center justify-content-center mt-10">
          <p
            className="error-message"
            data-testid="password-validation-message"
          >
            Invalid Password!
          </p>
        </section>
      )}
    </div>
  );
}

export default PasswordStep;
