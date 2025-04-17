import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

function Routes({ login, signup }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          {currentUser ? <Redirect to="/" /> : <LoginForm login={login} />}
        </Route>

        <Route exact path="/signup">
          {currentUser ? <Redirect to="/" /> : <SignupForm signup={signup} />}
        </Route>

        <Route exact path="/companies">
          {currentUser ? <CompanyList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/companies/:handle">
          {currentUser ? <CompanyDetail /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/jobs">
          {currentUser ? <JobList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/profile">
          {currentUser ? <ProfileForm /> : <Redirect to="/login" />}
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes; 