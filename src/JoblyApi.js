import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App.js"

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here

  static async request(endpoint, data = {}, method = "get") {

    let token = localStorage.getItem(TOKEN_STORAGE_ID);

    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static formatSearchData(data) {
    //Filters through search data to ensure correct parameters are added to url
      let newData = Object.fromEntries(Object.entries(data).filter(pair => pair[1] !== ""))
      return newData
  }

  static async getCompanies(data) {
    if (data) {
      let formattedData = this.formatSearchData(data)
      let res = await this.request("companies", { ...formattedData });
      return res.companies;
      } else {
      let res = await this.request("jobs", { ...data });
      return res.jobs;
    }
    
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJobs(data) {
    if (data) {
      let formattedData = this.formatSearchData(data)
      let res = await this.request("jobs", { ...formattedData });
      return res.jobs;
    } else {
      let res = await this.request("jobs", { ...data });
      return res.jobs;
    }
    
  }

  static async applyToJob(username, id) {
    let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default JoblyApi;
