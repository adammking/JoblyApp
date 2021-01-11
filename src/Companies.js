import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import Search from "./Search";
import JoblyApi from "./JoblyApi";

function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }

    getCompanies();
  }, []);

  async function handleSearch(search) {
    let companies = await JoblyApi.getCompanies(search);
    setCompanies(companies);
  }

  return (
    <div className="Companies col-md-8 offset-md-2">
      <Search endpoint="companies" searchFor={handleSearch} view={"company"} />
      <CardList cards={companies} />
    </div>
  );
}

export default Companies;
