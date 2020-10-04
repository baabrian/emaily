import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import formFields from "./gloabls/formFields";

import { validateEmails } from "../../utils/validateEmails";

const SurveyForm = ({ handleSubmit, showReview, review }) => {
  const renderFields = () => {
    return formFields.map(({ label, name }) => {
      return (
        <Field
          key={name}
          name={name}
          label={label}
          type="text"
          component={SurveyField}
        />
      );
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(() => showReview((review = !review)))}>
        {renderFields()}
        <Link
          to="/surveys"
          className="red btn-flat left white-text"
          type="submit"
        >
          Cancel
        </Link>
        <button className="teal btn-flat right white-text" type="submit">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });
  return errors;
}

export default reduxForm({
  form: "surveyForm",
  validate,
  destroyOnUnmount: false,
})(SurveyForm);
