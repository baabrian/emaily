import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import DashBoard from "./DashBoard";
import Landing from "./Landing";
import Survey from "./Survey";
import Header from "./Header";
import SurveyNew from "./SurveyNew";
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
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/survey" component={Survey} />
        <Route path="/survey/new" component={SurveyNew} />
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
