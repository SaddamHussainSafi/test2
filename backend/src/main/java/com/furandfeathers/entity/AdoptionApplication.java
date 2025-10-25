package com.furandfeathers.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "adoption_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdoptionApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "adopter_id")
    private User adopter;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    private String status; // PENDING, APPROVED, REJECTED

    @Column(length = 1000)
    private String message;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;
}