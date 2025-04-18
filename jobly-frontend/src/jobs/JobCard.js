import React from "react";
import { useAuth } from "../auth/AuthContext";
import "./JobCard.css";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {
  const { currentUser, applyToJob, hasAppliedToJob } = useAuth();
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
      <div className="JobCard card"> {applied}
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
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

/** Render integer salary like '$1,250,343' */

function formatSalary(salary) {
  const digitsRev = [];
  const salaryStr = salary.toString();

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}

export default JobCard;
