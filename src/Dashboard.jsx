import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import frontDesk from './assets/reception.jpg';
import Logo from './assets/Lekalakala_Dental-removebg.png';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Function to handle redirection to the "Add Patient" form
  const handleAddPatient = () => {
    navigate("/patients");
  };

  // Function to handle redirection to the "Look Up Patient" page
  const handleLookUpPatient = () => {
    navigate("/patientList"); // Replace this with the actual path to your LookUp Patient page
  };

  // Function to handle user logout (optional, can be used for redirecting to login)
  const handleLogout = () => {
    navigate("/login"); // Redirect to login page on logout
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* Left design section */}
      <div
        className="bg-light p-5 d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          width: "50%", // Left section takes half the screen width
          height: "100vh", // Full viewport height
        }}
      >
        <img src={frontDesk} alt="Lekalakala front desk" />
      </div>

      {/* Right form section */}
      <div
        className="bg-black p-2 m-auto shadow-lg rounded d-flex flex-column justify-content-center align-items-center"
        style={{
          width: "50%", // Right section takes the other half of the screen width
          height: "100vh", // Full viewport height
        }}
      >
        
        <img src={Logo} alt="Logo" className="text-center mb-4 rounded-xl" />
        <div className="d-flex flex-column w-100">
          {/* Add New Patient Button */}
          <button
            onClick={handleAddPatient}
            className="btn btn-success w-100 mb-3"
          >
            Add New Patient
          </button>

          {/* Look Up Patient Button */}
          <button
            onClick={handleLookUpPatient}
            className="btn btn-primary w-100 mb-3"
          >
            Look Up Patient
          </button>

          {/* Logout Button */}
          <button onClick={handleLogout} className="btn btn-danger w-100">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
