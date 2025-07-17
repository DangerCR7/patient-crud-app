'use client';
import React, { useEffect, useState } from 'react';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const res = await fetch('http://localhost:8080/api/patients');
    const data = await res.json();
    setPatients(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/patients/${id}`, { method: 'DELETE' });
    fetchPatients();
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.age}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
