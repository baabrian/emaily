import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

const Header = ({ auth }) => {
  const renderContent = () => {
    switch (auth.userId) {
      case null: {
        return;
      }
      case false: {
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      }
      default: {
        return [
          <li key="#payments">
            <Payments />
          </li>,
          <li style={{ margin: "0 10px" }} key="credits">
            Credits: {auth.userId.credits}
          </li>,
          <li key="#sign_out">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
      }
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth.userId ? "/survey" : "/"} className="left brand-logo">
          Emaily
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Header);
