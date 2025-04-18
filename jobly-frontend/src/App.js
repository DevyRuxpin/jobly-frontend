import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContext";
import ErrorBoundary from "./common/ErrorBoundary";
import Navigation from "./routes-nav/Navigation";
import Homepage from "./homepage/Homepage";
import CompanyList from "./companies/CompanyList";
import JobList from "./jobs/JobList";
import CompanyDetail from "./companies/CompanyDetail";
import LoginForm from "./auth/LoginForm";
import ProfileForm from "./profiles/ProfileForm";
import SignupForm from "./auth/SignupForm";
import PrivateRoute from "./routes-nav/PrivateRoute";
import "./App.css";

/** Jobly application.
 *
 * - infoLoaded: boolean to track if user data has been loaded
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * App -> Routes
 */

function App() {
  return (
    <ErrorBoundary>
      <Router basename={process.env.PUBLIC_URL}>
        <AuthContextProvider>
          <div className="App">
            <Navigation />
            <main className="container mt-4">
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>

                <Route exact path="/login">
                  <LoginForm />
                </Route>

                <Route exact path="/signup">
                  <SignupForm />
                </Route>

                <PrivateRoute exact path="/companies">
                  <CompanyList />
                </PrivateRoute>

                <PrivateRoute exact path="/jobs">
                  <JobList />
                </PrivateRoute>

                <PrivateRoute exact path="/companies/:handle">
                  <CompanyDetail />
                </PrivateRoute>

                <PrivateRoute path="/profile">
                  <ProfileForm />
                </PrivateRoute>

                <Redirect to="/" />
              </Switch>
            </main>
          </div>
        </AuthContextProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
