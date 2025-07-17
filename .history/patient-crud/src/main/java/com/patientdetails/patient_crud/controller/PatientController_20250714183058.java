package com.patientdetails.patient_crud.controller;

import com.patientdetails.patient_crud.model.Patient;
import com.patientdetails.patient_crud.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientRepository patientRepo;

    @GetMapping("/")
    public String redirectToPatients() {
        return "redirect:/patients";
    }

    @GetMapping("/patients")
    public String listPatients(Model model) {
        model.addAttribute("patients", patientRepo.findAll());
        return "patients"; // returns patients.html
    }

    @GetMapping("/patients/add")
    public String showAddForm(Model model) {
        model.addAttribute("patient", new Patient());
        return "patient_form"; // returns patient_form.html
    }

    @PostMapping("/patients/save")
    public String savePatient(@ModelAttribute Patient patient) {
        patientRepo.save(patient);
        return "redirect:/patients";
    }

    @GetMapping("/patients/edit/{id}")
    public String showEditForm(@PathVariable("id") Long id, Model model) {
        model.addAttribute("patient", patientRepo.findById(id).orElse(null));
        return "patient_form";
    }

    @GetMapping("/patients/delete/{id}")
    public String deletePatient(@PathVariable("id") Long id) {
        patientRepo.deleteById(id);
        return "redirect:/patients";
    }
}
