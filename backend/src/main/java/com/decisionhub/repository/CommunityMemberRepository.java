package com.decisionhub.repository;

import com.decisionhub.entity.CommunityMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {
    List<CommunityMember> findByCommunityId(Long communityId);
    List<CommunityMember> findByUserId(Long userId);
    Boolean existsByCommunityIdAndUserId(Long communityId, Long userId);
    Optional<CommunityMember> findByCommunityIdAndUserId(Long communityId, Long userId);
}
