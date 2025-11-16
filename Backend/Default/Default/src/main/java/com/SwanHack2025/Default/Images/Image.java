package com.SwanHack2025.Default.Images;

import jakarta.persistence.*;
import com.SwanHack2025.Default.Courses.Course;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String path;

    private Integer imgElo;

    private Boolean isAi;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    // Constructors
    public Image() {}

    public Image(String path, Integer imgElo) {
        this.path = path;
        this.imgElo = imgElo;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getImgElo() {
        return imgElo;
    }

    public void setImgElo(Integer imgElo) {
        this.imgElo = imgElo;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Boolean getIsAi() { return isAi; }

    public void setIsAi(Boolean isAi) {
        this.isAi = isAi;
    }
}
