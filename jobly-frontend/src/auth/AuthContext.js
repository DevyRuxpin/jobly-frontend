import React, { createContext, useContext, useState, useEffect } from "react";
import JoblyApi from "../api";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

/** AuthContextProvider component
 *
 * Provides authentication context to all child components
 * Manages user state and token
 */

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("token");
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  /** Load user info from API. Should only run once when token changes. */
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          let { username } = JSON.parse(atob(token.split(".")[1]));
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
    setApplicationIds(new Set([]));
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Logs in user and sets token.
   */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  async function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    await JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        token,
        setToken,
        login,
        signup,
        logout,
        hasAppliedToJob,
        applyToJob
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Custom hook to use auth context */
function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext, AuthContextProvider, useAuth }; 