package com.decisionhub.repository;

import com.decisionhub.entity.Decision;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DecisionRepository extends JpaRepository<Decision, Long> {
    List<Decision> findByCreatorId(Long creatorId);
    List<Decision> findByIsPublicTrue();
    List<Decision> findByCommunityId(Long communityId);
    List<Decision> findByStatus(Decision.Status status);
    Long countByCreatorId(Long creatorId);
    List<Decision> findByTitleContainingIgnoreCase(String title);
}
