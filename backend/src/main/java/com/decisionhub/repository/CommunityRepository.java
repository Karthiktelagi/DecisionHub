package com.decisionhub.repository;

import com.decisionhub.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByCreatorId(Long creatorId);
    List<Community> findByIsPublicTrue();
    List<Community> findByCategory(String category);
    List<Community> findByNameContainingIgnoreCase(String name);
}
