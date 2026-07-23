package com.decisionhub.service;

import com.decisionhub.dto.CommunityRequest;
import com.decisionhub.entity.Community;
import com.decisionhub.entity.CommunityMember;
import com.decisionhub.entity.User;
import com.decisionhub.repository.CommunityMemberRepository;
import com.decisionhub.repository.CommunityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityMemberRepository communityMemberRepository;

    @Transactional
    public Community createCommunity(CommunityRequest request, User creator) {
        Community community = new Community();
        community.setName(request.getName());
        community.setDescription(request.getDescription());
        community.setCategory(request.getCategory());
        community.setPublic(request.getIsPublic());
        community.setCreator(creator);

        Community saved = communityRepository.save(community);

        CommunityMember member = new CommunityMember();
        member.setCommunity(saved);
        member.setUser(creator);
        member.setRole(CommunityMember.MemberRole.ADMIN);
        communityMemberRepository.save(member);

        return saved;
    }

    public Community getCommunityById(Long id) {
        return communityRepository.findById(id).orElseThrow(() -> new RuntimeException("Community not found"));
    }

    public List<Community> getPublicCommunities() {
        return communityRepository.findByIsPublicTrue();
    }

    public List<Community> getCommunitiesByUser(Long userId) {
        return communityMemberRepository.findByUserId(userId)
                .stream().map(CommunityMember::getCommunity).collect(Collectors.toList());
    }

    @Transactional
    public void joinCommunity(Long communityId, User user) {
        Community community = getCommunityById(communityId);
        if (communityMemberRepository.existsByCommunityIdAndUserId(communityId, user.getId())) {
            throw new RuntimeException("User already in community");
        }
        CommunityMember member = new CommunityMember();
        member.setCommunity(community);
        member.setUser(user);
        member.setRole(CommunityMember.MemberRole.MEMBER);
        communityMemberRepository.save(member);
    }

    @Transactional
    public void leaveCommunity(Long communityId, User user) {
        CommunityMember member = communityMemberRepository.findByCommunityIdAndUserId(communityId, user.getId())
                .orElseThrow(() -> new RuntimeException("User not in community"));
        communityMemberRepository.delete(member);
    }

    @Transactional
    public Community updateCommunity(Long id, CommunityRequest request, User user) {
        Community community = getCommunityById(id);
        CommunityMember member = communityMemberRepository.findByCommunityIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        
        if (member.getRole() != CommunityMember.MemberRole.ADMIN && member.getRole() != CommunityMember.MemberRole.MODERATOR) {
            throw new RuntimeException("Unauthorized");
        }

        community.setName(request.getName());
        community.setDescription(request.getDescription());
        community.setCategory(request.getCategory());
        community.setPublic(request.getIsPublic());
        return communityRepository.save(community);
    }

    public List<CommunityMember> getCommunityMembers(Long communityId) {
        return communityMemberRepository.findByCommunityId(communityId);
    }

    public List<Community> searchCommunities(String query) {
        return communityRepository.findByNameContainingIgnoreCase(query);
    }
}
