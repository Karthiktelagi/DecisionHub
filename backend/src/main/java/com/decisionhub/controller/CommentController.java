package com.decisionhub.controller;

import com.decisionhub.dto.CommentRequest;
import com.decisionhub.entity.Comment;
import com.decisionhub.entity.User;
import com.decisionhub.service.CommentService;
import com.decisionhub.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(@RequestBody CommentRequest request) {
        return ResponseEntity.ok(commentService.addComment(request, getCurrentUser()));
    }

    @GetMapping("/decision/{decisionId}")
    public ResponseEntity<List<Comment>> getCommentsForDecision(@PathVariable Long decisionId) {
        return ResponseEntity.ok(commentService.getCommentsByDecision(decisionId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody String content) {
        return ResponseEntity.ok(commentService.updateComment(id, content, getCurrentUser()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id, getCurrentUser());
        return ResponseEntity.ok().build();
    }
}
