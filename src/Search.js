import React, { useState } from "react";
import "./Search.css";

function Search({ searchFor, view }) {
  const [search, setSearch] = useState({
    name: "", 
    title: "",
    minEmployees: "", 
    maxEmployees: "", 
    hasEquity: "",
    minSalary: ""

  });



  function handleSubmit(evt) {
    evt.preventDefault();
    let data;

    if (view === "jobs") {
      // these fields aren't req'd---pass "", not empty string
       data = {
        title:  search.title,
        hasEquity: search.hasEquity,
        minSalary: search.minSalary 
      };

    } else {
      // these fields aren't req'd---pass "", not empty string
       data = {
        name: search.name,
        minEmployees: +search.minEmployees,
        maxEmployees: +search.maxEmployees
      };
    }
    searchFor(search);
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setSearch(info => ({...info, [name]: value }));
  }

  const jobSearchFields = (
    <div className="Search mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          name="title"
          placeholder="Job Title"
          value={search.title}
          onChange={handleChange}
        />

        <input
          className="form-control form-control-lg flex-grow-1"
          name="hasEquity"
          placeholder="Enter true or false for equity"
          value={search.hasEquity}
          onChange={handleChange}
        />

        <input
          className="form-control form-control-lg flex-grow-1"
          name="minSalary"
          placeholder="Minimum Salary"
          value={search.minSalary}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  )

  const companySearchFields = (
    <div className="Search mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          name="name"
          placeholder="Company name"
          value={search.name}
          onChange={handleChange}
        />

        <input
          className="form-control form-control-lg flex-grow-1"
          name="minEmployees"
          placeholder="Minimum Employees"
          value={search.minEmployees}
          onChange={handleChange}
        />

        <input
          className="form-control form-control-lg flex-grow-1"
          name="maxEmployees"
          placeholder="Maximum Employees"
          value={search.maxEmployees}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  )

  


  return (
    (view) === "jobs" ? jobSearchFields : companySearchFields
  )
}
    

export default Search;
