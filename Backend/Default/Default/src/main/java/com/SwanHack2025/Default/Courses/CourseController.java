package com.SwanHack2025.Default.Courses;

import com.SwanHack2025.Default.Courses.Course;
import com.SwanHack2025.Default.Images.Image;
import com.SwanHack2025.Default.Images.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private ImageRepository imageRepo;

    // CREATE - Add a new course
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        try {
            courseRepo.save(course);
            return new ResponseEntity<>(course, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // READ - Get all courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        try {
            List<Course> courses = courseRepo.findAll();
            if (courses.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // READ - Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable("id") Long id) {
        Optional<Course> courseData = courseRepo.findById(id);

        if (courseData.isPresent()) {
            return new ResponseEntity<>(courseData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // READ - Get course by name
    @GetMapping("/name/{name}")
    public ResponseEntity<Course> getCourseByName(@PathVariable("name") String name) {
        Optional<Course> courseData = courseRepo.findByName(name);

        if (courseData.isPresent()) {
            return new ResponseEntity<>(courseData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // UPDATE - Update course by ID
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable("id") Long id, @RequestBody Course course) {
        Optional<Course> courseData = courseRepo.findById(id);

        if (courseData.isPresent()) {
            Course existingCourse = courseData.get();
            existingCourse.setName(course.getName());
            existingCourse.setDescription(course.getDescription());
            existingCourse.setPreviewImageUrl(course.getPreviewImageUrl());

            courseRepo.save(existingCourse);
            return new ResponseEntity<>(existingCourse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("addimage/{name}")
    public ResponseEntity<Course> updateCourseUrl(@PathVariable("name") String name, @RequestBody Image image) {
        Optional<Course> courseData = courseRepo.findByName(name);

        //exit if image url is already being used [no duplicates]
        if(imageRepo.existsByPath(image.getPath())){
            System.out.println("image url already in use!!!");
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        if (courseData.isPresent()) {
            Course course = courseData.get();
            course.addImage(image);
            Course savedCourse = courseRepo.save(course);
            return new ResponseEntity<>(savedCourse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Removes an image given the course name and the image's ID
    @DeleteMapping("{name}/removeimage/{imgID}")
    public ResponseEntity<Course> updateCourseUrl(@PathVariable("name") String name, @PathVariable("imgID") Long imgId) {
        Optional<Course> courseData = courseRepo.findByName(name);
        if (courseData.isPresent()) {
            courseData.get().removeImageById(imgId);
            courseRepo.save(courseData.get());
            return new ResponseEntity<>(courseData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // HELPER FUNCTION - retrieves a list of random images (number of images is specified)
    @GetMapping("/{name}/randomlist/{num_images}")
    public List<Image> getRandomImages(@PathVariable("name") String name,@PathVariable("num_images") int length) {
        Optional<Course> courseData = courseRepo.findByName(name);
        if (courseData.isPresent()) {
            List<Image> images = courseData.get().getImages();
            Collections.shuffle(images);
            images = images.subList(0, Math.min(images.size(), length));
            return images;

        } else {
            System.out.println("No course found!!!");
            return null;
        }
    }

    // DELETE - Delete course by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCourse(@PathVariable("id") Long id) {
        try {
            courseRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE - Delete course by name
    @DeleteMapping("/{name}")
    public ResponseEntity<HttpStatus> deleteCourse(@PathVariable("name") String name) {
        try {
            courseRepo.deleteByName(name);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE - Delete all courses
    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAllCourses() {
        try {
            courseRepo.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}