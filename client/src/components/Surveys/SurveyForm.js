import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";

import { validateEmails } from "../../utils/validateEmails";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Emails", name: "recipients" },
];

const SurveyForm = ({ handleSubmit }) => {
  const renderFields = () => {
    return FIELDS.map(({ label, name }) => {
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
      <form onSubmit={handleSubmit((value) => console.log(value))}>
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

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });
  validateEmails(FIELDS);
  return errors;
}

export default reduxForm({
  form: "surveyForm",
  validate,
})(SurveyForm);
