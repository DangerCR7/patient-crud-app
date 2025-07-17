'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PatientForm() {
  const [form, setForm] = useState({
    id: null,
    name: '',
    age: '',
    gender: '',
    disease: '',
    contact: ''
  });

  const router = useRouter();

  // Preload data from localStorage (for editing)
  useEffect(() => {
    const storedPatient = localStorage.getItem('editPatient');
    if (storedPatient) {
      setForm(JSON.parse(storedPatient));
      localStorage.removeItem('editPatient'); // Clear after loading
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = form.id ? 'PUT' : 'POST';
      const url = form.id
        ? `http://localhost:8080/api/patients/${form.id}`
        : 'http://localhost:8080/api/patients';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Failed to submit patient data');
      alert(`Patient ${form.id ? 'updated' : 'added'} successfully!`);
      router.push('/patients'); // Redirect to patient list
    } catch (error) {
      console.error(error);
      alert('Error submitting patient');
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-xl font-semibold mb-4">
        {form.id ? 'Edit Patient' : 'Add Patient'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          name="disease"
          placeholder="Disease"
          value={form.disease}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {form.id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
