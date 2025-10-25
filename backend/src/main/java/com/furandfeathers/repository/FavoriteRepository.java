package com.furandfeathers.repository;

import com.furandfeathers.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByAdopterId(Long adopterId);
    Optional<Favorite> findByAdopterIdAndPetId(Long adopterId, Long petId);
}