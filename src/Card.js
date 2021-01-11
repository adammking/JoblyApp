import React from "react";
import CompanyCard from "./CompanyCard";
import JobCard from "./JobCard";
import "./Card.css";

function Card({ item = {}, apply = () => null, idx }) {
  if (item.handle) {
    return <CompanyCard item={item} />;
  } else {
    return <JobCard item={item} handleApply={() => apply(idx)} />;
  }
}

export default Card;
