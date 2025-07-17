'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function PatientForm() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    disease: '',
    contact: ''
  });
  const [editingId, setEditingId] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setEditingId(id);
      fetch(`http://localhost:8080/api/patients/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `http://localhost:8080/api/patients/${editingId}`
        : 'http://localhost:8080/api/patients';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Failed to save patient');
      alert(`Patient ${editingId ? 'updated' : 'added'} successfully!`);
      router.push('/patients');
    } catch (error) {
      console.error(error);
      alert('Error saving patient');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">
        {editingId ? 'Edit Patient' : 'Add Patient'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border px-2 py-1 w-full" required />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="border px-2 py-1 w-full" required />
        <select name="gender" value={form.gender} onChange={handleChange} className="border px-2 py-1 w-full" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="text" name="disease" placeholder="Disease" value={form.disease} onChange={handleChange} className="border px-2 py-1 w-full" />
        <input type="text" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} className="border px-2 py-1 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
