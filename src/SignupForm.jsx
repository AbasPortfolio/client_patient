import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState(""); // Ensure states are initialized properly
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://server-patient.vercel.app/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100">
      {/* Left design section */}
      <div
        className="bg-light p-5 d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          width: "50%", // Left section takes half the screen width
          height: "100vh", // Full viewport height
        }}
      >
        <h1 className="display-3 text-primary">Dr P.T Lekalakala's Data Management</h1>
        <p className="lead text-muted">
          Manage clinic's data efficiently and securely.
        </p>
      </div>

      {/* Right form section */}
      <div
        className="bg-white p-5 shadow-lg rounded d-flex flex-column justify-content-center align-items-center"
        style={{
          width: "50%", // Right section takes the other half of the screen width
          height: "100vh", // Full viewport height
        }}
      >
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Register
          </button>

          <Link to="/login" className="btn btn-secondary w-100 mt-3">
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
