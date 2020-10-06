import React from "react";
import { Link } from "react-router-dom";
import SurveysList from "../components/Surveys/SurveysList";

const DashBoard = () => {
  return (
    <div>
      <SurveysList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default DashBoard;
