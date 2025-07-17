'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PatientForm() {
  const [form, setForm] = useState({ name: '', age: '', gender: '', disease: '', contact: '' });
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // get patient ID from URL

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/patients/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8080/api/patients/${id}` : 'http://localhost:8080/api/patients';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Error saving patient');
      alert(`Patient ${id ? 'updated' : 'added'} successfully!`);
      router.push('/patients'); // redirect to list
    } catch (err) {
      console.error(err);
      alert('Failed to submit');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{id ? 'Edit' : 'Add'} Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border px-2 py-1 w-full" required />
        <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" className="border px-2 py-1 w-full" required />
        <select name="gender" value={form.gender} onChange={handleChange} className="border px-2 py-1 w-full" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input name="disease" value={form.disease} onChange={handleChange} placeholder="Disease" className="border px-2 py-1 w-full" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" className="border px-2 py-1 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{id ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
}
