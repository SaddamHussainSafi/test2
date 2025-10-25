package com.furandfeathers.controller;

import com.furandfeathers.entity.AdoptionApplication;
import com.furandfeathers.entity.Pet;
import com.furandfeathers.entity.User;
import com.furandfeathers.repository.AdoptionApplicationRepository;
import com.furandfeathers.repository.PetRepository;
import com.furandfeathers.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/adoptions")
public class AdoptionController {

    @Autowired
    private AdoptionApplicationRepository adoptionApplicationRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    // Submit adoption application
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> applyForAdoption(@RequestBody AdoptionRequest request, Principal principal) {
        User adopter = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Pet pet = petRepository.findById(request.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        // Check if pet is available
        if (!"AVAILABLE".equals(pet.getStatus())) {
            return ResponseEntity.badRequest().body("Pet is not available for adoption");
        }

        AdoptionApplication application = new AdoptionApplication();
        application.setAdopter(adopter);
        application.setPet(pet);
        application.setStatus("PENDING");
        application.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));

        adoptionApplicationRepository.save(application);

        return ResponseEntity.ok("Adoption application submitted successfully");
    }

    // Get user's adoption applications
    @GetMapping("/my-applications")
    @PreAuthorize("isAuthenticated()")
    public List<AdoptionApplication> getMyApplications(Principal principal) {
        User adopter = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return adoptionApplicationRepository.findByAdopterId(adopter.getId());
    }

    // Get applications for a pet (for shelters)
    @GetMapping("/pet/{petId}")
    @PreAuthorize("isAuthenticated()")
    public List<AdoptionApplication> getApplicationsForPet(@PathVariable Long petId, Principal principal) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        // Check if user is the shelter owner
        if (!pet.getShelter().getEmail().equals(principal.getName())) {
            throw new RuntimeException("Unauthorized");
        }

        return adoptionApplicationRepository.findByPetId(petId);
    }

    // Update application status (approve/reject)
    @PutMapping("/{id}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request, Principal principal) {
        AdoptionApplication application = adoptionApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Check if user is the shelter owner
        if (!application.getPet().getShelter().getEmail().equals(principal.getName())) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        application.setStatus(request.getStatus());
        adoptionApplicationRepository.save(application);

        // If approved, update pet status
        if ("APPROVED".equals(request.getStatus())) {
            application.getPet().setStatus("ADOPTED");
            petRepository.save(application.getPet());
        }

        return ResponseEntity.ok("Application status updated");
    }
}

// DTOs
class AdoptionRequest {
    private Long petId;

    public Long getPetId() {
        return petId;
    }

    public void setPetId(Long petId) {
        this.petId = petId;
    }
}

class StatusUpdateRequest {
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}