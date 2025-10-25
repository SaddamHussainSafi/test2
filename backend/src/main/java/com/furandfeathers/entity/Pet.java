package com.furandfeathers.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "pets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer age;
    private String breed;

    @Column(length = 1000)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    private String status;

    @ManyToOne
    @JoinColumn(name = "shelter_id")   // foreign key
    @JsonBackReference
    private User shelter;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;
}
