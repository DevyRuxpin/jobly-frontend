import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;