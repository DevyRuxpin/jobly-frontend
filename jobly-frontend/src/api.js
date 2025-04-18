import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    // Generate cache key for GET requests
    const cacheKey = method === "get" ? `${endpoint}-${JSON.stringify(data)}` : null;

    // Check cache for GET requests
    if (method === "get" && cacheKey) {
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.debug("Cache hit:", cacheKey);
        return cached.data;
      }
    }

    try {
      const response = await axios({ url, method, data, params, headers });
      
      // Cache GET responses
      if (method === "get" && cacheKey) {
        cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      }

      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "An unexpected error occurred";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies (filtered by name if not undefined) */
  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs (filtered by title if not undefined) */
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Apply to a job */
  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
    // Clear relevant caches
    this.clearCache(`users/${username}`);
  }

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    // Clear relevant caches
    this.clearCache(`users/${username}`);
    return res.user;
  }

  /** Clear cache for a specific endpoint */
  static clearCache(endpoint) {
    for (const key of cache.keys()) {
      if (key.startsWith(endpoint)) {
        cache.delete(key);
      }
    }
  }
}

export default JoblyApi; 