'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6 space-x-4">
      <Link href="/patient-form">
        <button className="bg-green-500 text-white px-4 py-2">Add Patient</button>
      </Link>
      <Link href="/patients">
        <button className="bg-blue-500 text-white px-4 py-2">View Patients</button>
      </Link>
    </div>
  );
}
