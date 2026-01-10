import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import PatientForm from "./PatientForm";
import Dashboard from "./Dashboard"; // Import Dashboard component
import PatientList from "./PatientList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignupForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Default route */}
        <Route path="/patients" element={<PatientForm />} />
        <Route path="/patientList" element={<PatientList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
