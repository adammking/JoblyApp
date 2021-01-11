import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import CardList from "./CardList";
import UserContext from "./UserContext";

function Company() {
  const { handle } = useParams();
  const { currentUser } = useContext(UserContext);

  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompanyAndJobs() {
      const { applications } = currentUser;
      const c = await JoblyApi.getCompany(handle);


      // grab a set of IDs of jobs applied to
     
        const jobsIDsAppliedTo = new Set(applications.map(job => job));
        
      // add key for each job in company if it is applied to ---
      // this let us handle the "apply/applied" button
      c.jobs = c.jobs.map(job => ({
        ...job,
        state: jobsIDsAppliedTo.has(job.id) ? "applied" : null
      }));
    
      setCompany(c);
    }

    getCompanyAndJobs();
  }, [handle, currentUser]);

  async function apply(idx) {
    if (company && Array.isArray(company.jobs) && idx < company.jobs.length) {
      let jobId = company.jobs[idx].id;
      let message = await JoblyApi.applyToJob(currentUser.username, jobId);
      let status = Object.keys(message)[0]
      setCompany(c => {
        let newCompany = { ...c };
        newCompany.jobs = newCompany.jobs.map(job =>
          job.id === jobId ? { ...job, state: status } : job
        );
        return newCompany;
      });
    }
  }

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-md-8 offset-md-2">
      <h5 className="text-capitalize">{company.name}</h5>
      <p>{company.description}</p>
      <CardList cards={company.jobs} apply={apply} />
    </div>
  );
}

export default Company;
