package com.furandfeathers.repository;

import com.furandfeathers.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderId(Long senderId);
    List<Message> findByReceiverId(Long receiverId);
    List<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);
}