package com.system.mentoring.controller;

import com.system.mentoring.entity.Course;
import com.system.mentoring.entity.Role;
import com.system.mentoring.entity.User;
import com.system.mentoring.repository.CourseRepository;
import com.system.mentoring.repository.UserRepository;
import com.system.mentoring.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists with this email.");
        }
        return ResponseEntity.ok(userService.registerUser(user));
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        return userService.findByEmail(user.getEmail()).map(existingUser -> {
            if (existingUser.getPassword().equals(user.getPassword())) {
                return ResponseEntity.ok(existingUser);
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        }).orElse(ResponseEntity.status(404).body("User not found"));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/role/{role}")
    public ResponseEntity<?> getUsersByRole(@PathVariable("role") Role role) {
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    @GetMapping("/role/{role}/id/{id}")
    public ResponseEntity<?> getUserByIdAndRole(
            @PathVariable("role") Role role,
            @PathVariable("id") Long id) {

        return userService.getUserByIdAndRole(id, role)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/students/{studentId}/choose-course/{courseId}")
    public ResponseEntity<?> assignCourseToStudent(@PathVariable("studentId") Long studentId, @PathVariable("courseId") Long courseId) {
        User student = userRepository.findById(studentId).orElseThrow();
        Course course = courseRepository.findById(courseId).orElseThrow();

        student.setCourse(course);
        student.setHod(course.getHod()); // Automatically set HOD from Course
        userRepository.save(student);
        // ✅ Return JSON instead of string
        Map<String, String> response = new HashMap<>();
        response.put("message", "Course and HOD assigned to student");
        return ResponseEntity.ok(response);
    }

//    @PutMapping("/hods/{hodId}/assign-mentor/{studentId}/{mentorId}")
//    public ResponseEntity<?> assignMentorToStudent(
//    		@PathVariable("hodId") Long hodId,
//            @PathVariable("studentId") Long studentId,
//            @PathVariable("mentorId") Long mentorId)  {
//        User hod = userRepository.findById(hodId).orElseThrow();
//        User student = userRepository.findById(studentId).orElseThrow();
//        User mentor = userRepository.findById(mentorId).orElseThrow();
//
//        if (!student.getHod().getId().equals(hod.getId())) {
//            return ResponseEntity.badRequest().body("Student not under this HOD");
//        }
//
//        student.setMentor(mentor);
//        userRepository.save(student);
//        return ResponseEntity.ok("Mentor assigned to student");
//    }
    
//    @PutMapping("/hods/{hodId}/assign-mentor/{studentId}/{mentorId}")
//    public ResponseEntity<?> assignMentorToStudent(
//            @PathVariable("hodId") Long hodId,
//            @PathVariable("studentId") Long studentId,
//            @PathVariable("mentorId") Long mentorId) {
//
//        User hod = userRepository.findById(hodId).orElseThrow();
//        User student = userRepository.findById(studentId).orElseThrow();
//
//        if (!student.getHod().getId().equals(hod.getId())) {
//            return ResponseEntity.badRequest().body("Student not under this HOD");
//        }
//
//        if (mentorId == 0) {
//            student.setMentor(null);
//        } else {
//            User mentor = userRepository.findById(mentorId).orElseThrow();
//            student.setMentor(mentor);
//        }
//
//        userRepository.save(student);
//        return ResponseEntity.ok("Mentor updated for student");
//    }
    @PutMapping("/hods/{hodId}/assign-mentor/{studentId}/{mentorId}")
    public ResponseEntity<?> assignMentorToStudent(
            @PathVariable("hodId") Long hodId,
            @PathVariable("studentId") Long studentId,
            @PathVariable("mentorId") Long mentorId) {

        User hod = userRepository.findById(hodId).orElseThrow();
        User student = userRepository.findById(studentId).orElseThrow();

        if (!student.getHod().getId().equals(hod.getId())) {
            return ResponseEntity.badRequest().body("Student not under this HOD");
        }

        if (mentorId == 0) {
            student.setMentor(null);
        } else {
            User mentor = userRepository.findById(mentorId).orElseThrow();
            student.setMentor(mentor);
        }

        userRepository.save(student);

        // Wrap response as a JSON map
        Map<String, String> response = new HashMap<>();
        response.put("message", "Mentor updated for student");
        return ResponseEntity.ok(response);
    }

   
    
    @GetMapping("/by-hod/{hodId}")
    public ResponseEntity<?> getStudentsUnderHod(@PathVariable("hodId") Long hodId) {
        return ResponseEntity.ok(userService.getStudentsUnderHod(hodId));
    }
    
    @GetMapping("/by-mentor/{mentorId}")
    public ResponseEntity<?> getStudentsUnderMentor(@PathVariable("mentorId") Long mentorId) {
        List<User> students = userRepository.findByMentorId(mentorId);
        return ResponseEntity.ok(students);
    }
    
    @PutMapping("/upload-profile-image/{id}")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable("id") Long userId,
            @RequestParam("image") MultipartFile imageFile) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        try {
            String uploadsDir = "mentors-images"; // ✅ Save to root folder
            String filename = user.getId() + "_" + imageFile.getOriginalFilename();
            Path filepath = Paths.get(uploadsDir, filename);

            Files.createDirectories(filepath.getParent());
            Files.write(filepath, imageFile.getBytes());

            user.setProfileImage(filename); // ✅ Save only filename in DB
            userRepository.save(user);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Image uploaded successfully!");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
        }
    }
    
    
    @GetMapping("/mentors")
    public ResponseEntity<?> getAllMentors() {
        List<User> mentors = userRepository.findByRole(Role.MENTOR);
        return ResponseEntity.ok(mentors);
    }
    @PutMapping("/set-profile-image/{id}")
    public ResponseEntity<?> setDefaultProfileImage(
            @PathVariable("id") Long userId,
            @RequestParam("filename") String filename) {

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setProfileImage(filename); // Save only filename
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Default image set successfully");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/by-mentor/{mentorId}/course/{courseId}")
    public ResponseEntity<?> getStudentsByMentorAndCourse(
            @PathVariable("mentorId") Long mentorId,
            @PathVariable("courseId") Long courseId) {

        List<User> students = userRepository.findByMentorIdAndCourseId(mentorId, courseId);
        return ResponseEntity.ok(students);
    }


}

    
    





