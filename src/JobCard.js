import React from "react";

function JobCard({ item = {}, handleApply }) {
  const { title, salary, equity } = item;

  return (
    <div className="Card card">
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-between">
          <span className="text-capitalize">{title}</span>
        </h6>
        <div>Salary: {salary}</div>
        <div>Equity: {equity}</div>
        <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={item.state}
        >
          {item.state ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
