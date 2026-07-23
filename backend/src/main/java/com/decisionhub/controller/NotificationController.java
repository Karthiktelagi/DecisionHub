package com.decisionhub.controller;

import com.decisionhub.entity.Notification;
import com.decisionhub.entity.User;
import com.decisionhub.service.NotificationService;
import com.decisionhub.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getUserNotifications() {
        return ResponseEntity.ok(notificationService.getUserNotifications(getCurrentUser().getId()));
    }

    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadCount() {
        return ResponseEntity.ok(notificationService.getUnreadCount(getCurrentUser().getId()));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead() {
        notificationService.markAllAsRead(getCurrentUser().getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.ok().build();
    }
}
