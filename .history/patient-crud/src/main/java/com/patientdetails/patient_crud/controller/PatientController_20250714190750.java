package com.patientdetails.patient_crud.controller;

import com.patientdetails.patient_crud.model.Patient;
import com.patientdetails.patient_crud.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access backend
@RestController
@RequestMapping("/")
public class PatientController {

    @Autowired
    private PatientRepository patientRepo;

    // ✅ Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    // ✅ Add a new patient
    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return patientRepo.save(patient);
    }

    // ✅ Get a patient by ID
    @GetMapping("/{id}")
    public Optional<Patient> getPatientById(@PathVariable Long id) {
        return patientRepo.findById(id);
    }

    // ✅ Update a patient
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @RequestBody Patient updatedPatient) {
        updatedPatient.setId(id); // set the ID so it updates instead of inserts
        return patientRepo.save(updatedPatient);
    }

    // ✅ Delete a patient
    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientRepo.deleteById(id);
    }
}
