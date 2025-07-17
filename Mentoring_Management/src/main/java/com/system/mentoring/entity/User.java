package com.system.mentoring.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    

    @Enumerated(EnumType.STRING)
    private Role role;
    
    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnoreProperties("hod") // prevent infinite loop
    private Course course;

    @ManyToOne
    @JoinColumn(name = "hod_id")
    @JsonIgnoreProperties({"hod", "mentor", "course", "hodCourses"})
    private User hod;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    @JsonIgnoreProperties({"hod", "course", "hodCourses"})
    private User mentor;

    @OneToMany(mappedBy = "hod")
    @JsonIgnore // optional if not required in frontend
    private List<Course> hodCourses;
    
    private String profileImage; // Store filename like "mentor1.jpg"
     
    // Getters and Setters
    
    public String getProfileImage() {
        return profileImage;
    }
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
	public List<Course> getHodCourses() {
		return hodCourses;
	}
	public void setHodCourses(List<Course> hodCourses) {
		this.hodCourses = hodCourses;
	}
	public User getHod() {
		return hod;
	}
	public void setHod(User hod) {
		this.hod = hod;
	}
	public User getMentor() {
		return mentor;
	}
	public void setMentor(User mentor) {
		this.mentor = mentor;
	}
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
    
    
    
    
}
