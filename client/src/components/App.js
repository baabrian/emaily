import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import DashBoard from "./DashBoard";
import Landing from "./Landing";
import Survey from "./Surveys/SurveyForm";
import Header from "./Layouts/Header";
import SurveyNew from "./Surveys/SurveyNew";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  });

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={DashBoard} />
        <Route path="/surveys/new" component={SurveyNew} />
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
