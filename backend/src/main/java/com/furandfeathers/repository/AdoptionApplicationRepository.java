package com.furandfeathers.repository;

import com.furandfeathers.entity.AdoptionApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, Long> {
    List<AdoptionApplication> findByAdopterId(Long adopterId);
    List<AdoptionApplication> findByPetId(Long petId);
    List<AdoptionApplication> findByStatus(String status);
}