package com.SwanHack2025.Default.Courses;

import jakarta.persistence.*;
import com.SwanHack2025.Default.Images.Image;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;


    private String previewImageUrl;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();

    // Constructors
    public Course() {
    }

    public Course(String name, String description, String previewImageUrl) {
        this.name = name;
        this.description = description;

        this.previewImageUrl = previewImageUrl;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPreviewImageUrl() {
        return previewImageUrl;
    }

    public void setPreviewImageUrl(String previewImageUrl) {
        this.previewImageUrl = previewImageUrl;
    }


    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    // Convenience methods to add/remove images
    public void addImage(Image image) {
        images.add(image);
        image.setCourse(this);
    }

    public void removeImage(Image image) {
        images.remove(image);
        image.setCourse(null);
    }
}