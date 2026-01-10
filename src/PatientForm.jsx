import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://server-patient.vercel.app/patients", {
        name,
        age,
        gender,
        contact,
        address,
        notes,
      })
      .then((res) => {
        console.log(res);
        alert("Patient added successfully!");
        navigate("/patients"); // Or wherever you want to go next
      })
      .catch((err) => console.log(err));
  };

  // Function to navigate back to the dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Or wherever your dashboard route is
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light vh-100">
      <div
        className="bg-white p-5 shadow-lg rounded"
        style={{ width: "600px" }}
      >
        <h2 className="text-center mb-4">Add New Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>
              <strong>File Number</strong>
            </label>
            <input
              type="number"
              placeholder="Enter File Number"
              className="form-control rounded-0"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>
              <strong>Gender</strong>
            </label>
            <select
              className="form-control rounded-0"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label>
              <strong>Contact Number</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              className="form-control rounded-0"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>
              <strong>Address</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="form-control rounded-0"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          

          <div className="mb-3">
            <label>
              <strong>Medical Notes</strong>
            </label>
            <textarea
              placeholder="Enter any notes"
              className="form-control rounded-0"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">
            Add Patient
          </button>
        </form>
        
        <button
          onClick={handleBackToDashboard}
          className="btn btn-secondary w-100 mt-3"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PatientForm;
