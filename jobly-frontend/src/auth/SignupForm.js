import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./SignupForm.css";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm() {
  const history = useHistory();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: "" }));
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await signup(formData);
      history.push("/");
    } catch (err) {
      setErrors((e) => ({
        ...e,
        form: err.message || "Signup failed",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            {errors.form && (
              <div className="alert alert-danger" role="alert">
                {errors.form}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={isSubmitting}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-primary float-right"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;