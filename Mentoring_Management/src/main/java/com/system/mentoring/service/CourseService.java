package com.system.mentoring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.mentoring.entity.Course;
import com.system.mentoring.entity.Role;
import com.system.mentoring.entity.User;
import com.system.mentoring.repository.CourseRepository;
import com.system.mentoring.repository.UserRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course assignHodToCourse(Long courseId, Long hodId) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        User hod = userRepository.findById(hodId).orElseThrow();

        if (hod.getRole() != Role.HOD) throw new IllegalArgumentException("User is not HOD");

        course.setHod(hod);
        return courseRepository.save(course);
    }

    public Course removeHodFromCourse(Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        course.setHod(null);
        return courseRepository.save(course);
    }
}

