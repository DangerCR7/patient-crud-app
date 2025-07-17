// src/app/patient-form/page.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // ✅ import it here

export default function PatientForm() {
  const [form, setForm] = useState({ name: '', age: '', gender: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        alert("Patient added successfully!");
        setForm({ name: '', age: '', gender: '' });
      } else {
        alert("Failed to add patient.");
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Add Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* form fields here */}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {/* 🔗 Navigation Button */}
      <div className="mt-4">
        <Link href="/patients">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            View Patients
          </button>
        </Link>
      </div>
    </div>
  );
}
