import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions/index.js";

const SurveysList = ({ fetchSurveys, surveys }) => {
  console.log(surveys);
  useEffect(() => {
    fetchSurveys();
  }, []);

  const renderSurveys = () => {
    return surveys.map((survey) => {
      return (
        <div key={survey._id} className="card darken-1">
          <div className="card-content"></div>
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    }).reverse();
  };

  return (
    <div>
      <h3>List of Surveys</h3>
      {renderSurveys()}
    </div>
  );
};

const mapStateToProps = ({ surveys: { surveysList } }) => {
  return {
    surveys: surveysList,
  };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveysList);
