package com.SwanHack2025.Default.Courses;

import jakarta.persistence.*;
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


    @ElementCollection
    @CollectionTable(name = "course_image_urls", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "image_url")
    private String previewImageUrl = new ArrayList<>();

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
}