package com.SwanHack2025.Default.Images;

import com.SwanHack2025.Default.Courses.Course;
import com.SwanHack2025.Default.Courses.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageRepository imageRepo;

    @Autowired
    private CourseRepository courseRepo;

    // CREATE - Add a new image
    @PostMapping
    public ResponseEntity<Image> createImage(@RequestBody Image image) {
        try {
            // Optional: check that the course exists
            Optional<Course> courseOpt = courseRepo.findById(image.getCourse().getId());
            if (courseOpt.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            image.setCourse(courseOpt.get());
            imageRepo.save(image);
            return new ResponseEntity<>(image, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // READ - Get all images
    @GetMapping
    public ResponseEntity<List<Image>> getAllImages() {
        List<Image> images = imageRepo.findAll();
        if (images.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    // READ - Get image by ID
    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable Long id) {
        Optional<Image> imageOpt = imageRepo.findById(id);
        return imageOpt.map(image -> new ResponseEntity<>(image, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // READ - Get all images for a given course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Image>> getImagesByCourse(@PathVariable Long courseId) {
        Optional<Course> courseOpt = courseRepo.findById(courseId);
        if (courseOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Image> images = imageRepo.findByCourse(courseOpt.get());
        if (images.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    // DELETE - Delete image by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteImage(@PathVariable Long id) {
        try {
            imageRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
