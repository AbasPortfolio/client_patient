import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPatient, setEditingPatient] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    file_number: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get("https://server-patient.vercel.app/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Error fetching patients:", err));
  };


  const handleDelete = (patientId, patientName) => {
    if (window.confirm(`Are you sure you want to delete ${patientName}?`)) {
      axios
        .delete("https://server-patient.vercel.app/patients/delete", {
          data: { id: patientId },
        })
        .then(() => {
          alert(`${patientName} deleted successfully!`);
          fetchPatients();
        })
        .catch((err) => {
          console.error("Error deleting patient:", err);
          alert("Error deleting patient.");
        });
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient._id);
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contact: patient.contact,
      doctor: patient.address,
    });
  };

  const handleUpdate = () => {
    axios
      .put(`https://server-patient.vercel.app/patients/update/${editingPatient}`, formData)
      .then(() => {
        alert("Patient updated successfully!");
        setEditingPatient(null);
        fetchPatients();
      })
      .catch((err) => {
        console.error("Error updating patient:", err);
        alert("Error updating patient.");
      });
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchPatients();
      return;
    }

    axios
      .get(`https://server-patient.vercel.app/patients/search?query=${searchQuery}`)
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Search error:", err));
  };

  const handleReset = () => {
    setSearchQuery("");
    fetchPatients();
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const sortPatients = (criteria) => {
    const sorted = [...patients];
    if (criteria === "age") {
      sorted.sort((a, b) => a.age - b.age);
    } else if (criteria === "nameLength") {
      sorted.sort((a, b) => a.name.length - b.name.length);
    }
    setPatients(sorted);
    setSortBy(criteria);
  };

  return (
    <div className="d-flex h-auto">
      {/* Left Section */}
      

      {/* Right Section */}
      <div
        className="bg-white p-5 shadow-lg rounded d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100%", height: "100vh", overflowY: "scroll" }}
      >
        <h2 className="text-center mb-4">Patient Records</h2>

        <div className="d-flex mt-3 w-50">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-success me-2" onClick={handleSearch}>
            Search
          </button>
          
        </div>

        {/* Dropdown Sort Options */}
        <div className="dropdown mb-3 w-100 text-end">
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            id="sortDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort Options
          </button>
          <ul className="dropdown-menu" aria-labelledby="sortDropdown">
            <li>
              <button
                className="dropdown-item"
                onClick={() => sortPatients("age")}
              >
                Sort by file
              </button>
           </li>
              </ul>
              </div>
            {/* <li>
              <button
                className="dropdown-item"
                onClick={() => sortPatients("nameLength")}
              >
                Sort by Name Length
              </button>
            </li>
           */}

        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              
              <th>Address</th>
              <th>Gender</th>
              <th>#File Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.contact}</td>
                  
                  <td>{patient.address}</td>
                  
                  <td>{patient.gender}</td>
                  <td>{patient.age}</td>
                  
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(patient)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(patient._id, patient.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No patients found.
                </td>
              </tr>
            )}

            
          </tbody>
        </table>

        {editingPatient && (
          <div className="mt-4 w-100">
            <h4>Update Patient</h4>
            <input
              className="form-control mb-2"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
            <input
              className="form-control mb-3"
              placeholder="Doctor"
              value={formData.doctor}
              onChange={(e) =>
                setFormData({ ...formData, doctor: e.target.value })
              }
            />
            <button className="btn btn-success me-2" onClick={handleUpdate}>
              Update
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditingPatient(null)}
            >
              Cancel
            </button>
          </div>
        )}

        <button className="btn btn-secondary mt-4" onClick={handleBack}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PatientList;
