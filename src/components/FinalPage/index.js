import React, { useContext } from "react";
import { FormContext } from "../MultiStepForm";

function FinalPage() {
  const { formData, setStep, setFormData } = useContext(FormContext);

  return (
    <div data-testid="final-page">
      <section className="layout-row align-items-center justify-content-center mt-5">
        <p>
          <i>Thank you for submitting your information!</i>
        </p>
      </section>
      <section className="layout-row align-items-center justify-content-center mt-5">
        <p data-testid="final-page-name">Name: {formData.name}</p>
      </section>
      <section className="layout-row align-items-center justify-content-center mt-5">
        <p data-testid="final-page-email">Email: {formData.email}</p>
      </section>
    </div>
  );
}

export default FinalPage;
