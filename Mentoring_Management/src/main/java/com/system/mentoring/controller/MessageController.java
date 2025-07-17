package com.system.mentoring.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.system.mentoring.entity.Message;
import com.system.mentoring.entity.User;
import com.system.mentoring.repository.MessageRepository;
import com.system.mentoring.repository.UserRepository;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

//    @PostMapping("/send")
//    public ResponseEntity<?> sendMessage(@RequestBody Map<String, Object> request) {
//        Long senderId = Long.parseLong(request.get("senderId").toString());
//        Long receiverId = Long.parseLong(request.get("receiverId").toString());
//        String content = request.get("content").toString();
//
//        User sender = userRepository.findById(senderId).orElseThrow();
//        User receiver = userRepository.findById(receiverId).orElseThrow();
//
//
//        Message message = new Message(); 
//        message.setSender(sender);
//        message.setReceiver(receiver);
//        message.setContent(content);
//        message.setTimestamp(LocalDateTime.now());
//
//        return ResponseEntity.ok(messageRepository.save(message));
//    }
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, Object> request) {
        Long senderId = Long.parseLong(request.get("senderId").toString());
        Long receiverId = Long.parseLong(request.get("receiverId").toString());
        String content = request.get("content").toString();

        String type = "NORMAL"; // default
        if (request.containsKey("type")) {
            type = request.get("type").toString(); // e.g., COURSE_ANNOUNCEMENT
        }

        User sender = userRepository.findById(senderId).orElseThrow();
        User receiver = userRepository.findById(receiverId).orElseThrow();

        Message message = new Message(); 
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setType(type); // ✅ set type

        return ResponseEntity.ok(messageRepository.save(message));
    }


//    @GetMapping("/chat/{user1Id}/{user2Id}")
//    public ResponseEntity<?> getChat(@PathVariable("user1Id") Long user1Id, @PathVariable("user2Id") Long user2Id) {
//        List<Message> messages = messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
//            user1Id, user2Id, user1Id, user2Id);
//        return ResponseEntity.ok(messages);
//    }
    @GetMapping("/chat/{user1Id}/{user2Id}")
    public ResponseEntity<List<Message>> getChat(
        @PathVariable(name = "user1Id") Long user1Id,
        @PathVariable(name = "user2Id") Long user2Id) {

        List<Message> messages = messageRepository.getChatBetween(user1Id, user2Id);
        return ResponseEntity.ok(messages);
    }
    @PostMapping("/send-course-announcement")
    public ResponseEntity<?> sendCourseAnnouncement(@RequestBody Map<String, Object> request) {
        Long senderId = Long.parseLong(request.get("senderId").toString());
        Long courseId = Long.parseLong(request.get("courseId").toString());
        String content = request.get("content").toString();

        User sender = userRepository.findById(senderId).orElseThrow();

        // Find all students with that course
        List<User> students = userRepository.findByRoleAndCourseId("STUDENT", courseId);

        for (User student : students) {
            Message msg = new Message();
            msg.setSender(sender);
            msg.setReceiver(student);
            msg.setContent(content);
            msg.setTimestamp(LocalDateTime.now());
            msg.setType("COURSE_ANNOUNCEMENT");  // ✅ Mark it specially

            messageRepository.save(msg);
        }

        return ResponseEntity.ok("Course announcement sent to " + students.size() + " students.");
    }



}
