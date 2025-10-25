package com.furandfeathers.controller;

import com.furandfeathers.entity.Pet;
import com.furandfeathers.dto.ShelterDTO;
import com.furandfeathers.dto.PetResponse;
import com.furandfeathers.entity.User;
import com.furandfeathers.repository.PetRepository;
import com.furandfeathers.repository.UserRepository;
import com.furandfeathers.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetRepository petRepository;
    
    @Autowired
    private UserRepository userRepository;

    // Test endpoint to verify authentication
    @GetMapping("/test")
    public String whoAmI(Principal principal) {
        return "Logged in as: " + principal.getName();
    }

    // 1 Add new pet
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addPet(
            @RequestPart("name") String name,
            @RequestPart("breed") String breed,
            @RequestPart("age") Integer age,
            @RequestPart("description") String description,
            @RequestPart(value = "status", required = false) String status,
            @RequestPart(value = "images", required = false) MultipartFile[] images,
            Principal principal
    ) throws IOException {

        System.out.println("Adding pet: name=" + name + ", breed=" + breed + ", age=" + age + ", description=" + description + ", status=" + status + ", images=" + (images != null ? images.length : 0));

        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("User: " + user.getEmail() + ", Role: " + user.getRole());

        // Allow any authenticated user to add a pet. Previously only shelters were allowed.
        // If you want to enforce role-based logic later, add checks here.

        String uploadDir = "uploads/";
        Files.createDirectories(Paths.get(uploadDir));

        MultipartFile image = (images != null && images.length > 0) ? images[0] : null;
        String fileName = image != null ? UUID.randomUUID() + "_" + image.getOriginalFilename() : null;
        if (image != null) {
            Files.copy(image.getInputStream(), Paths.get(uploadDir + fileName), StandardCopyOption.REPLACE_EXISTING);
        }

        Pet pet = new Pet();
        pet.setName(name);
        pet.setBreed(breed);
        pet.setAge(age);
        pet.setDescription(description);
        pet.setStatus(status != null ? status : "AVAILABLE");
        pet.setImageUrl(fileName != null ? "http://localhost:8080/uploads/" + fileName : null);
        pet.setShelter(user);

        petRepository.save(pet);
        return ResponseEntity.ok("Pet added successfully");
    }

    // 2 All pets (public)
    @GetMapping
    public List<PetResponse> getAllPets() {
        List<Pet> pets = petRepository.findAllWithShelters();
        return pets.stream().map(this::toResponse).toList();
    }

    // 3 Logged-in users pets (for shelters)
    @GetMapping("/my-pets")
    public List<PetResponse> getMyPets(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Pet> pets = petRepository.findByShelter(user);
        return pets.stream().map(this::toResponse).toList();
    }

    // helper to convert Pet -> PetResponse
    private PetResponse toResponse(Pet p) {
        ShelterDTO shelter = null;
        if (p.getShelter() != null) {
            shelter = new ShelterDTO(p.getShelter().getId(), p.getShelter().getName(), p.getShelter().getEmail(), p.getShelter().getPicture());
        }
        return new PetResponse(p.getId(), p.getName(), p.getBreed(), p.getAge(), p.getDescription(), p.getStatus(), p.getImageUrl(), shelter);
    }

    // 4 Update pet
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updatePet(
            @PathVariable Long id,
            @RequestPart(value = "name", required = false) String name,
            @RequestPart(value = "breed", required = false) String breed,
            @RequestPart(value = "age", required = false) Integer age,
            @RequestPart(value = "description", required = false) String description,
            @RequestPart(value = "status", required = false) String status,
            @RequestPart(value = "image", required = false) MultipartFile image,
            Principal principal
    ) throws IOException {

        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        if (!pet.getShelter().getEmail().equals(principal.getName()))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");

        if (name != null) pet.setName(name);
        if (breed != null) pet.setBreed(breed);
        if (age != null) pet.setAge(age);
        if (description != null) pet.setDescription(description);
        if (status != null) pet.setStatus(status);

        if (image != null && !image.isEmpty()) {
            String uploadDir = "uploads/";
            Files.createDirectories(Paths.get(uploadDir));
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Files.copy(image.getInputStream(), Paths.get(uploadDir + fileName), StandardCopyOption.REPLACE_EXISTING);
            pet.setImageUrl("http://localhost:8080/uploads/" + fileName);
        }

        petRepository.save(pet);
        return ResponseEntity.ok("Pet updated successfully");
    }

    // 5 Delete pet
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Long id, Principal principal) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));
        if (!pet.getShelter().getEmail().equals(principal.getName()))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");

        petRepository.delete(pet);
        return ResponseEntity.ok("Pet deleted successfully");
    }
}
