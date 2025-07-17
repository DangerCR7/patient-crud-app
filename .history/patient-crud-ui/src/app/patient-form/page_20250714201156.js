'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PatientForm() {
  const router = useRouter();
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
    await fetch('http://localhost:8080/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/patients');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {['name', 'age', 'disease', 'contact'].map((f) => (
        <input key={f} name={f} placeholder={f} value={form[f]} onChange={handleChange} className="border p-2 w-full" required />
      ))}
      <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 w-full" required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Submit</button>
    </form>
  );
}
