package com.SwanHack2025.Default.Images;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SwanHack2025.Default.Courses.Course;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByCourse(Course course);

    Image findById(long id);

    boolean existsByPath(String path);
}
