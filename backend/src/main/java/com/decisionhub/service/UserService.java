package com.decisionhub.service;

import com.decisionhub.dto.UserDTO;
import com.decisionhub.entity.User;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.repository.DecisionRepository;
import com.decisionhub.repository.VoteRepository;
import com.decisionhub.repository.CommunityMemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final DecisionRepository decisionRepository;
    private final VoteRepository voteRepository;
    private final CommunityMemberRepository communityMemberRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User updateProfile(Long userId, UserDTO dto) {
        User user = getUserById(userId);
        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getBio() != null) user.setBio(dto.getBio());
        if (dto.getAvatarUrl() != null) user.setAvatarUrl(dto.getAvatarUrl());
        if (dto.getInterests() != null) user.setInterests(dto.getInterests());
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Map<String, Object> getUserStats(Long userId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("decisionCount", decisionRepository.countByCreatorId(userId));
        stats.put("voteCount", voteRepository.findByUserId(userId).size());
        stats.put("communityCount", communityMemberRepository.findByUserId(userId).size());
        return stats;
    }
}
