package com.system.mentoring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.system.mentoring.entity.Message;  // ✅ CORRECT


public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(Long senderId, Long receiverId, Long receiverId2, Long senderId2);

    @Query("SELECT m FROM Message m WHERE " +
            "(m.sender.id = :user1 AND m.receiver.id = :user2) OR " +
            "(m.sender.id = :user2 AND m.receiver.id = :user1) " +
            "ORDER BY m.timestamp ASC")
     List<Message> getChatBetween(@Param("user1") Long user1Id, @Param("user2") Long user2Id);
    
 }

