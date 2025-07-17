package com.system.mentoring.repository;

import com.system.mentoring.entity.Role;
import com.system.mentoring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);

    Optional<User> findByIdAndRole(Long id, Role role);
    List<User> findByRoleAndHodId(Role role, Long hodId);
    List<User> findByMentorId(Long mentorId);
 // NEW: Fetch students under a mentor for a specific course
    List<User> findByMentorIdAndCourseId(Long mentorId, Long courseId);
    List<User> findByRoleAndCourseId(String role, Long courseId);



}
