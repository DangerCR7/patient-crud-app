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

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this patient?')) return;
    await fetch(`http://localhost:8080/api/patients/${id}`, {
      method: 'DELETE',
    });
    fetchPatients(); // reload
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
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
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.age}</td>
              <td className="border px-4 py-2">{p.gender}</td>
              <td className="border px-4 py-2">{p.disease}</td>
              <td className="border px-4 py-2">{p.contact}</td>
              <td className="border px-4 py-2">
                <Link href={`/patient-form?id=${p.id}`}>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
