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
      setForm({ name: '', age: '', gender: '' }); // Reset form
    } else {
      alert("Failed to add patient.");
    }
  } catch (error) {
    console.error("Error adding patient:", error);
  }
};
