package com.decisionhub.dto;

import com.decisionhub.entity.Decision;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStats {
    private long totalDecisions;
    private long activeDecisions;
    private long totalVotes;
    private long totalCommunities;
    private long totalUsers;
    private List<Decision> recentDecisions;
    private Map<String, Long> popularCategories;
}
