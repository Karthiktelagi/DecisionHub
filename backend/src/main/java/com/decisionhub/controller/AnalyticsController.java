package com.decisionhub.controller;

import com.decisionhub.dto.DashboardStats;
import com.decisionhub.entity.User;
import com.decisionhub.service.AnalyticsService;
import com.decisionhub.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getDashboardStats(getCurrentUser()));
    }

    @GetMapping("/votes/{decisionId}")
    public ResponseEntity<Map<String, Double>> getVoteDistribution(@PathVariable Long decisionId) {
        return ResponseEntity.ok(analyticsService.getVoteDistribution(decisionId));
    }

    @GetMapping("/trends")
    public ResponseEntity<List<Map<String, Object>>> getDecisionTrends() {
        return ResponseEntity.ok(analyticsService.getDecisionTrends());
    }

    @GetMapping("/categories")
    public ResponseEntity<Map<String, Long>> getCategoryDistribution() {
        return ResponseEntity.ok(analyticsService.getCategoryDistribution());
    }

    @GetMapping("/user/{userId}/activity")
    public ResponseEntity<Map<String, Object>> getUserActivity(@PathVariable Long userId) {
        return ResponseEntity.ok(analyticsService.getUserActivityStats(userId));
    }
}
