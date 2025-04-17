import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

function JobCard({ id, title, salary, equity }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = React.useState();

  React.useEffect(function updateAppliedStatus() {
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <div>Salary: {salary}</div>
        <div>Equity: {equity}</div>
        <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard; 