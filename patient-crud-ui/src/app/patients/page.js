'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  const fetchPatients = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/patients');
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;
    try {
      await fetch(`http://localhost:8080/api/patients/${id}`, {
        method: 'DELETE',
      });
      fetchPatients(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  const handleEdit = (patient) => {
    // Save patient data in localStorage to prefill the form
    localStorage.setItem('editPatient', JSON.stringify(patient));
    router.push('/patient-form');
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>

      {/* ✅ Add Patient Button */}
      <div className="flex justify-end mb-4">
        <Link href="/patient-form">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            ➕ Add Patient
          </button>
        </Link>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300 bg-white text-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Disease</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No patients found.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{patient.id}</td>
                <td className="border px-4 py-2">{patient.name}</td>
                <td className="border px-4 py-2">{patient.age}</td>
                <td className="border px-4 py-2">{patient.gender}</td>
                <td className="border px-4 py-2">{patient.disease}</td>
                <td className="border px-4 py-2">{patient.contact}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
