import React from "react";
import { connect } from "react-redux";
import formFields from "./gloabls/formFields";

const SurveyFormReview = ({ review, showReview, formValues }) => {
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
        className="yellow darken-3 btn-flat"
        onClick={() => showReview((review = !review))}
      >
        Cancel
      </button>
    </div>
  );
};

const mapsStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values,
  };
};
export default connect(mapsStateToProps, {})(SurveyFormReview);
