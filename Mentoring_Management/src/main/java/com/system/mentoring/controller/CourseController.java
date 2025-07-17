package com.system.mentoring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.system.mentoring.entity.Course;
import com.system.mentoring.service.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseService.addCourse(course);
    }

//    @PutMapping("/{courseId}/assign-hod/{hodId}")
//    public Course assignHod(@PathVariable Long courseId, @PathVariable Long hodId) {
//        return courseService.assignHodToCourse(courseId, hodId);
//    }
    @PutMapping("/{courseId}/assign-hod/{hodId}")
    public Course assignHod(
            @PathVariable("courseId") Long courseId,
            @PathVariable("hodId") Long hodId) {
        return courseService.assignHodToCourse(courseId, hodId);
    }


//    @PutMapping("/{courseId}/remove-hod")
//    public Course removeHod(@PathVariable Long courseId) {
//        return courseService.removeHodFromCourse(courseId);
//    }
    @PutMapping("/{courseId}/remove-hod")
    public Course removeHod(@PathVariable("courseId") Long courseId) {
        return courseService.removeHodFromCourse(courseId);
    }

}

