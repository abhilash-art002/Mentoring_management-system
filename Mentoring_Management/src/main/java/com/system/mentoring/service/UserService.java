package com.system.mentoring.service;

import com.system.mentoring.entity.Role;
import com.system.mentoring.entity.User;
import com.system.mentoring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Save password as plain text (not recommended for production)
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    public Optional<User> getUserByIdAndRole(Long id, Role role) {
        return userRepository.findByIdAndRole(id, role);
    }
    public List<User> getStudentsUnderHod(Long hodId) {
        return userRepository.findByRoleAndHodId(Role.STUDENT, hodId);
    }


}
