package com.SwanHack2025.Default.Courses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    // Custom query method to find course by name
    Optional<Course> findByName(String name);

    // Custom query method to check if a course name exists
    boolean existsByName(String name);

}
