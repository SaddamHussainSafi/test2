package com.furandfeathers.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    private String provider; // "local" or "google"
    
    @com.fasterxml.jackson.annotation.JsonIgnore
    public String getPassword() { return password; }
    @com.fasterxml.jackson.annotation.JsonIgnore
    public String getProvider() { return provider; }
    private String picture;

    private Boolean verified;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;

    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JsonIgnoreProperties({"shelter"})
    @Builder.Default
    private List<Pet> pets = new ArrayList<>();
}
