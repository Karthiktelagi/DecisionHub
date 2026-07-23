package com.decisionhub.controller;

import com.decisionhub.dto.CommunityRequest;
import com.decisionhub.entity.Community;
import com.decisionhub.entity.CommunityMember;
import com.decisionhub.entity.User;
import com.decisionhub.service.CommunityService;
import com.decisionhub.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/api/communities")
@CrossOrigin
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Community> createCommunity(@RequestBody CommunityRequest request) {
        return ResponseEntity.ok(communityService.createCommunity(request, getCurrentUser()));
    }

    @GetMapping
    public ResponseEntity<List<Community>> listPublicCommunities() {
        return ResponseEntity.ok(communityService.getPublicCommunities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getCommunityDetail(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getCommunityById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Community> updateCommunity(@PathVariable Long id, @RequestBody CommunityRequest request) {
        return ResponseEntity.ok(communityService.updateCommunity(id, request, getCurrentUser()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Community>> getMyCommunities() {
        return ResponseEntity.ok(communityService.getCommunitiesByUser(getCurrentUser().getId()));
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<Void> joinCommunity(@PathVariable Long id) {
        communityService.joinCommunity(id, getCurrentUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/leave")
    public ResponseEntity<Void> leaveCommunity(@PathVariable Long id) {
        communityService.leaveCommunity(id, getCurrentUser());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<CommunityMember>> getMembers(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getCommunityMembers(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Community>> search(@RequestParam("q") String query) {
        return ResponseEntity.ok(communityService.searchCommunities(query));
    }
}
