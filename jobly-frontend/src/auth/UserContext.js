import React from "react";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
  hasAppliedToJob: () => {},
  applyToJob: () => {},
});

export default UserContext;
