'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/patients')
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this patient?');
    if (!confirm) return;

    await fetch(`http://localhost:8080/api/patients/${id}`, { method: 'DELETE' });
    setPatients(patients.filter(p => p.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      <Link href="/patient-form" className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block">+ Add New</Link>
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
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
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.age}</td>
              <td className="border px-4 py-2">{p.gender}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link href={`/patient-form?id=${p.id}`}>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                </Link>
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
