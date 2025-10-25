package com.furandfeathers.repository;

import com.furandfeathers.entity.Pet;
import com.furandfeathers.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByShelter(User shelter);

    @Query("SELECT p FROM Pet p JOIN FETCH p.shelter")
    List<Pet> findAllWithShelters();
}