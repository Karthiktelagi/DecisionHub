package com.decisionhub.controller;

import com.decisionhub.dto.DecisionRequest;
import com.decisionhub.dto.OptionRequest;
import com.decisionhub.entity.Decision;
import com.decisionhub.entity.User;
import com.decisionhub.service.DecisionService;
import com.decisionhub.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/decisions")
@CrossOrigin
@RequiredArgsConstructor
public class DecisionController {

    private final DecisionService decisionService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Decision> createDecision(@RequestBody DecisionRequest request) {
        return ResponseEntity.ok(decisionService.createDecision(request, getCurrentUser()));
    }

    @GetMapping
    public ResponseEntity<List<Decision>> getAllPublicDecisions() {
        return ResponseEntity.ok(decisionService.getAllPublicDecisions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Decision> getDecisionById(@PathVariable Long id) {
        return ResponseEntity.ok(decisionService.getDecisionById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Decision> updateDecision(@PathVariable Long id, @RequestBody DecisionRequest request) {
        return ResponseEntity.ok(decisionService.updateDecision(id, request, getCurrentUser()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDecision(@PathVariable Long id) {
        decisionService.deleteDecision(id, getCurrentUser());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    public ResponseEntity<List<Decision>> getMyDecisions() {
        return ResponseEntity.ok(decisionService.getDecisionsByUser(getCurrentUser().getId()));
    }

    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<Decision>> getCommunityDecisions(@PathVariable Long communityId) {
        return ResponseEntity.ok(decisionService.getDecisionsByCommunity(communityId));
    }

    @PostMapping("/{id}/options")
    public ResponseEntity<?> addOption(@PathVariable Long id, @RequestBody OptionRequest request) {
        return ResponseEntity.ok(decisionService.addOption(id, request));
    }

    @DeleteMapping("/options/{optionId}")
    public ResponseEntity<Void> removeOption(@PathVariable Long optionId) {
        decisionService.removeOption(optionId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/factors")
    public ResponseEntity<?> addFactor(@PathVariable Long id, @RequestParam String name, @RequestParam double weight) {
        return ResponseEntity.ok(decisionService.addComparisonFactor(id, name, weight));
    }

    @PostMapping("/options/{optionId}/scores")
    public ResponseEntity<?> setOptionScore(@PathVariable Long optionId, @RequestParam Long factorId, @RequestParam double score, @RequestParam String notes) {
        return ResponseEntity.ok(decisionService.setOptionScore(optionId, factorId, score, notes));
    }

    @PostMapping("/options/{optionId}/proscons")
    public ResponseEntity<?> addProCon(@PathVariable Long optionId, @RequestParam String type, @RequestParam String content) {
        return ResponseEntity.ok(decisionService.addProCon(optionId, type, content, getCurrentUser()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Decision>> searchDecisions(@RequestParam("q") String query) {
        return ResponseEntity.ok(decisionService.searchDecisions(query));
    }
}
