import React from "react";
import "./CompanyCard.css";

function CompanyCard({ name, description, logoUrl }) {
  return (
    <div className="CompanyCard card">
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-between">
          <span className="text-capitalize">{name}</span>
          {logoUrl && (
            <img src={logoUrl} alt={name} className="float-right ml-5" />
          )}
        </h6>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CompanyCard; 