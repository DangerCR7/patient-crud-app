'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPatient({ params }) {
  const { id } = params;
  const [form, setForm] = useState({ name: '', age: '', gender: '', disease: '', contact: '' });
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8080/api/patients/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/api/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    router.push('/patients');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} className="border px-2 py-1 w-full" required />
        <input type="number" name="age" value={form.age} onChange={handleChange} className="border px-2 py-1 w-full" required />
        <select name="gender" value={form.gender} onChange={handleChange} className="border px-2 py-1 w-full" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="text" name="disease" value={form.disease} onChange={handleChange} className="border px-2 py-1 w-full" />
        <input type="text" name="contact" value={form.contact} onChange={handleChange} className="border px-2 py-1 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
