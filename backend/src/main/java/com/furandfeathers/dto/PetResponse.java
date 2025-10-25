package com.furandfeathers.dto;

public class PetResponse {
    public Long id;
    public String name;
    public String breed;
    public Integer age;
    public String description;
    public String status;
    public String imageUrl;
    public ShelterDTO shelter;

    public PetResponse() {}

    public PetResponse(Long id, String name, String breed, Integer age, String description, String status, String imageUrl, ShelterDTO shelter) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.description = description;
        this.status = status;
        this.imageUrl = imageUrl;
        this.shelter = shelter;
    }
}
