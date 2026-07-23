package com.decisionhub.service;

import com.decisionhub.dto.DashboardStats;
import com.decisionhub.entity.User;
import com.decisionhub.repository.CommunityRepository;
import com.decisionhub.repository.DecisionRepository;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.repository.VoteRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final DecisionRepository decisionRepository;
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;

    public DashboardStats getDashboardStats(User user) {
        DashboardStats stats = new DashboardStats();
        stats.setTotalDecisions(decisionRepository.count());
        stats.setActiveDecisions(0L); // placeholder
        stats.setTotalVotes(voteRepository.count());
        stats.setTotalCommunities(communityRepository.count());
        stats.setTotalUsers(userRepository.count());
        stats.setRecentDecisions(Collections.emptyList());
        stats.setPopularCategories(Collections.emptyMap());
        return stats;
    }

    public Map<String, Double> getVoteDistribution(Long decisionId) {
        // basic mock
        return new HashMap<>();
    }

    public List<Map<String, Object>> getDecisionTrends() {
        return Collections.emptyList();
    }

    public Map<String, Long> getCategoryDistribution() {
        return new HashMap<>();
    }

    public Map<String, Object> getUserActivityStats(Long userId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("decisions", decisionRepository.countByCreatorId(userId));
        return stats;
    }
}
