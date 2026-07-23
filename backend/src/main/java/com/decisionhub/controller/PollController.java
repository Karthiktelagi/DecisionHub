package com.decisionhub.controller;

import com.decisionhub.dto.PollRequest;
import com.decisionhub.dto.VoteRequest;
import com.decisionhub.entity.Poll;
import com.decisionhub.entity.User;
import com.decisionhub.service.PollService;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.service.VoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin
@RequiredArgsConstructor
public class PollController {

    private final PollService pollService;
    private final VoteService voteService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Poll> createPoll(@RequestBody PollRequest request) {
        return ResponseEntity.ok(pollService.createPoll(request, getCurrentUser()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPoll(@PathVariable Long id) {
        return ResponseEntity.ok(pollService.getPollById(id));
    }

    @GetMapping("/decision/{decisionId}")
    public ResponseEntity<List<Poll>> getPollsForDecision(@PathVariable Long decisionId) {
        return ResponseEntity.ok(pollService.getPollsByDecision(decisionId));
    }

    @PostMapping("/{id}/vote")
    public ResponseEntity<?> castVote(@PathVariable Long id, @RequestBody VoteRequest request) {
        return ResponseEntity.ok(voteService.castVote(id, request, getCurrentUser()));
    }

    @GetMapping("/{id}/results")
    public ResponseEntity<Map<String, Long>> getResults(@PathVariable Long id) {
        return ResponseEntity.ok(voteService.getPollResults(id));
    }

    @PutMapping("/{id}/close")
    public ResponseEntity<Poll> closePoll(@PathVariable Long id) {
        return ResponseEntity.ok(pollService.closePoll(id, getCurrentUser()));
    }

    @GetMapping("/active")
    public ResponseEntity<List<Poll>> getActivePolls() {
        return ResponseEntity.ok(pollService.getActivePoll());
    }

    @GetMapping("/{id}/hasVoted")
    public ResponseEntity<Boolean> hasVoted(@PathVariable Long id) {
        return ResponseEntity.ok(voteService.hasUserVoted(id, getCurrentUser().getId()));
    }
}
