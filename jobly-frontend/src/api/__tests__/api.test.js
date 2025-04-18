import JoblyApi from "../api";

describe("JoblyApi", () => {
  beforeEach(() => {
    JoblyApi.token = null;
  });

  describe("getCompanies", () => {
    it("should return companies when no name is provided", async () => {
      const companies = await JoblyApi.getCompanies();
      expect(companies).toBeInstanceOf(Array);
      expect(companies.length).toBeGreaterThan(0);
    });

    it("should return filtered companies when name is provided", async () => {
      const companies = await JoblyApi.getCompanies("test");
      expect(companies).toBeInstanceOf(Array);
    });
  });

  describe("getCompany", () => {
    it("should return company details when handle is provided", async () => {
      const company = await JoblyApi.getCompany("test-company");
      expect(company).toHaveProperty("handle");
      expect(company).toHaveProperty("name");
      expect(company).toHaveProperty("description");
    });

    it("should throw error when handle is invalid", async () => {
      await expect(JoblyApi.getCompany("invalid-handle")).rejects.toThrow();
    });
  });

  describe("getJobs", () => {
    it("should return jobs when no title is provided", async () => {
      const jobs = await JoblyApi.getJobs();
      expect(jobs).toBeInstanceOf(Array);
      expect(jobs.length).toBeGreaterThan(0);
    });

    it("should return filtered jobs when title is provided", async () => {
      const jobs = await JoblyApi.getJobs("test");
      expect(jobs).toBeInstanceOf(Array);
    });
  });

  describe("login", () => {
    it("should set token when login is successful", async () => {
      const token = await JoblyApi.login("testuser", "password");
      expect(token).toBeTruthy();
      expect(JoblyApi.token).toBe(token);
    });

    it("should throw error when login fails", async () => {
      await expect(JoblyApi.login("invalid", "invalid")).rejects.toThrow();
    });
  });

  describe("signup", () => {
    it("should set token when signup is successful", async () => {
      const token = await JoblyApi.signup({
        username: "newuser",
        password: "password",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com"
      });
      expect(token).toBeTruthy();
      expect(JoblyApi.token).toBe(token);
    });

    it("should throw error when signup fails", async () => {
      await expect(JoblyApi.signup({
        username: "existinguser",
        password: "password",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com"
      })).rejects.toThrow();
    });
  });

  describe("getCurrentUser", () => {
    it("should return user data when token is valid", async () => {
      JoblyApi.token = "valid-token";
      const user = await JoblyApi.getCurrentUser("testuser");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("firstName");
      expect(user).toHaveProperty("lastName");
      expect(user).toHaveProperty("email");
    });

    it("should throw error when token is invalid", async () => {
      JoblyApi.token = "invalid-token";
      await expect(JoblyApi.getCurrentUser("testuser")).rejects.toThrow();
    });
  });
}); 