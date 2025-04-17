import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(function getCompaniesOnMount() {
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map(c => (
            <Link
              key={c.handle}
              to={`/companies/${c.handle}`}
              className="text-decoration-none"
            >
              <CompanyCard
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default CompanyList; 