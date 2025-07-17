'use client';

import React, { useEffect, useState } from 'react';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error("Failed to fetch patients:", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No patients found.</td>
            </tr>
          ) : (
            patients.map(patient => (
              <tr key={patient.id}>
                <td className="border px-4 py-2">{patient.id}</td>
                <td className="border px-4 py-2">{patient.name}</td>
                <td className="border px-4 py-2">{patient.age}</td>
                <td className="border px-4 py-2">{patient.gender}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
