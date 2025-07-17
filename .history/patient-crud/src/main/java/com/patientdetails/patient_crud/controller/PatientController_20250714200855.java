package com.patientdetails.patient_crud.controller;

import com.patientdetails.patient_crud.model.Patient;
import com.patientdetails.patient_crud.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    
    @Autowired
    private PatientRepository repo;

    @GetMapping
    public List<Patient> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Patient create(@RequestBody Patient p) {
        return repo.save(p);
    }

    @PutMapping("/{id}")
    public Patient update(@PathVariable Long id, @RequestBody Patient p) {
        p.setId(id);
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
