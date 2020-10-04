import React, { useState } from "react";
import SurveyForm from "./SurveyForm";
import { reduxForm } from "redux-form";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = () => {
  const [review, showReview] = useState(false);
  return (
    <div>
      {!review ? (
        <SurveyForm review={review} showReview={showReview} />
      ) : (
        <SurveyFormReview review={review} showReview={showReview} />
      )}
    </div>
  );
};

export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
