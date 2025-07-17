package com.system.mentoring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.system.mentoring.entity.Course;
import com.system.mentoring.entity.User;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByHod(User hod);
}

