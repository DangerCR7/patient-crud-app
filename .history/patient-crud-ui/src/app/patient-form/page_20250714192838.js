'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const res = await fetch('http://localhost:8080/api/patients');
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const deletePatient = async (id) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    const res = await fetch(`http://localhost:8080/api/patients/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Deleted successfully');
      fetchPatients(); // Refresh the list
    } else {
      alert('Error deleting');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>

      <Link href="/patient-form">
        <button className="bg-green-600 text-white px-4 py-2 mb-4 rounded">
          ➕ Add Patient
        </button>
      </Link>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="border px-4 py-2">{patient.id}</td>
              <td className="border px-4 py-2">{patient.name}</td>
              <td className="border px-4 py-2">{patient.age}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => alert('Edit not implemented yet')}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deletePatient(patient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
