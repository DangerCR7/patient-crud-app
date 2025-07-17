// src/app/patient-form/page.js
'use client';

import React, { useState } from 'react';

export default function PatientForm() {
  const [form, setForm] = useState({ name: '', age: '', gender: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your POST/PUT request here
    console.log(form);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Add Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
