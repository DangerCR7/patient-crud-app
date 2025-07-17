'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const res = await fetch('http://localhost:8080/api/patients');
    const data = await res.json();
    setPatients(data);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete this patient?')) return;
    await fetch(`http://localhost:8080/api/patients/${id}`, {
      method: 'DELETE',
    });
    fetchPatients(); // reload
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Patient L
