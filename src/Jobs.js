import React, { useState, useEffect, useContext } from "react";
import CardList from "./CardList";
import Search from "./Search";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { currentUser } = useContext(UserContext);

  async function search(search) {
    let jobs = await JoblyApi.getJobs(search);
    setJobs(jobs);
  }

  useEffect(function() {
    search();
  }, []);

  async function apply(idx) {
    let jobId = jobs[idx].id;
    let message = await JoblyApi.applyToJob(currentUser.username, jobId);
    let status = Object.keys(message)[0]
    setJobs(j => j.map(job => 
      job.id === jobId ? { ...job, state: status} : job
    ));
  }

  useEffect(() => {
    async function getAppliedJobs() {
      const { applications } = currentUser
      let jobs = await JoblyApi.getJobs();

      let appliedJobs = new Set(applications.map(job => job))

      jobs = jobs.map(job => ({
        ...job,
        state: appliedJobs.has(job.id) ? "applied" : null
      }));
      setJobs(jobs)
    }
    
    getAppliedJobs()
  }, [currentUser])

  return (
    <div className="Jobs col-md-8 offset-md-2">
      <Search endpoint="jobs" searchFor={search} view={"jobs"}/>
      <CardList cards={jobs} apply={apply} />
    </div>
  );
}

export default Jobs;
