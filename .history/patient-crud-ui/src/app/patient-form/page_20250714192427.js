'use client';
import React, { useState } from 'react';

export default function PatientForm() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    disease: '',
    contact: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Failed to add patient');
      }

      const result = await response.json();
      alert('Patient added successfully!');
      console.log('Added:', result);

      // Reset form after submit
      setForm({
        name: '',
        age: '',
        gender: '',
        disease: '',
        contact: ''
      });

    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Error adding patient');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Add Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border px-3 py-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          className="border px-3 py-2 w-full rounded"
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          name="disease"
          value={form.disease}
          onChange={handleChange}
          placeholder="Disease"
          className="border px-3 py-2 w-full rounded"
        />
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="border px-3 py-2 w-full rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
