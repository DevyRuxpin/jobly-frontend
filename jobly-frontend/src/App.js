import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContext";
import Routes from "./routes-nav/Routes";
import Navigation from "./routes-nav/Navigation";
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
    <BrowserRouter>
      <AuthContextProvider>
        <div className="App">
          <Navigation />
          <main>
            <Routes />
          </main>
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
