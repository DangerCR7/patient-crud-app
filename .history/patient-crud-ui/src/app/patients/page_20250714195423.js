// src/app/patients/page.js
'use client';

import React from 'react';
import Link from 'next/link';

<Link href="/patient-form">
  <button className="bg-green-600 text-white px-4 py-2 mb-4 rounded">
    ➕ Add Patient
  </button>
</Link>


export default function PatientsList() {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>

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
          {/* You can dynamically fetch and render patient data here */}
          <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">John Doe</td>
            <td className="border px-4 py-2">34</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  <tbody>
  {patients.map((patient) => (
    <tr key={patient.id}>
      <td className="border px-4 py-2">{patient.id}</td>
      <td className="border px-4 py-2">{patient.name}</td>
      <td className="border px-4 py-2">{patient.age}</td>
      <td className="border px-4 py-2">
        <Link href={`/edit-patient/${patient.id}`}>
          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
        </Link>
        <button
          onClick={() => handleDelete(patient.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

}
