import React from "react";
import { connect } from "react-redux";
import formFields from "./gloabls/formFields";
import { submitSurvey } from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({
  review,
  showReview,
  formValues,
  submitSurvey,
  history,
}) => {
  const reviewFields = formFields.map(({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 left white-text btn-flat"
        onClick={() => showReview((review = !review))}
      >
        Cancel
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey<i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapsStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values,
  };
};

export default connect(
  mapsStateToProps,
  submitSurvey
)(withRouter(SurveyFormReview));
