package com.patientdetails.patient_crud.repository;

import com.patientdetails.patient_crud.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // This interface will automatically provide CRUD operations for the Patient entity
    // Additional custom query methods can be defined here if needed

    
}
