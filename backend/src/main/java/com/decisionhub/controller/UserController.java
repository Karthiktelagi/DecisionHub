package com.decisionhub.controller;

import com.decisionhub.dto.UserDTO;
import com.decisionhub.entity.User;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getOwnProfile() {
        return ResponseEntity.ok(getCurrentUser());
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody UserDTO dto) {
        User user = getCurrentUser();
        return ResponseEntity.ok(userService.updateProfile(user.getId(), dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<Map<String, Object>> getUserStats(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserStats(id));
    }
}
