package com.SwanHack2025.Default.Images;

import com.SwanHack2025.Default.Courses.Course;
import com.SwanHack2025.Default.Courses.CourseRepository;
import com.SwanHack2025.Default.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import com.SwanHack2025.Default.Users.User;
import com.SwanHack2025.Default.Auth.JwtUtil;


@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageRepository imageRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

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

    @PostMapping("/guess")
    public ResponseEntity<?> guessImage(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ImageGuessRequest request) {

        try {
            // Extract token from "Bearer <token>"
            String token = authHeader.replace("Bearer ", "");
            Long userId = jwtUtil.validateAndGetUserId(token);

            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Image image = imageRepo.findById(request.getImageId())
                    .orElseThrow(() -> new RuntimeException("Image not found"));

            double actualScoreUser = (image.getIsAi() == request.isGuessedAI()) ? 1.0 : 0.0;
            double actualScoreImage = 1.0 - actualScoreUser; // opposite of user

            // Get current ratings
            double ratingUser = user.getElo();
            double ratingImage = image.getImgElo();

            double expectedUser = 1.0 / (1.0 + Math.pow(10, (ratingImage - ratingUser) / 400.0));
            double expectedImage = 1.0 / (1.0 + Math.pow(10, (ratingUser - ratingImage) / 400.0));

            //K val of 40 is good for calibration, K val of 32 is good after that
            int K = 30;

            int newUserElo = (int) Math.round(ratingUser + K * (actualScoreUser - expectedUser));
            int newImageElo = (int) Math.round(ratingImage + K * (actualScoreImage - expectedImage));

            user.setElo(newUserElo);
            image.setImgElo(newImageElo);

            userRepo.save(user);
            imageRepo.save(image);

            boolean correct = actualScoreUser == 1.0;

            return ResponseEntity.ok(new Object() {
                public final boolean correctGuess = correct;
                public final int userElo = user.getElo();
                public final int imageElo = image.getImgElo();
            });

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}
