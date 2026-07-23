package com.decisionhub.service;

import com.decisionhub.dto.DecisionRequest;
import com.decisionhub.dto.OptionRequest;
import com.decisionhub.entity.*;
import com.decisionhub.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DecisionService {

    private final DecisionRepository decisionRepository;
    private final OptionRepository optionRepository;
    private final ComparisonFactorRepository factorRepository;
    private final OptionScoreRepository scoreRepository;
    private final ProConRepository proConRepository;
    private final CommunityRepository communityRepository;

    @Transactional
    public Decision createDecision(DecisionRequest request, User creator) {
        Decision decision = new Decision();
        decision.setTitle(request.getTitle());
        decision.setDescription(request.getDescription());
        decision.setCategory(request.getCategory());
        decision.setPublic(request.getIsPublic());
        decision.setStatus(Decision.Status.DRAFT);
        decision.setDeadline(request.getDeadline());
        decision.setCreator(creator);
        decision.setCreatedAt(LocalDateTime.now());
        decision.setUpdatedAt(LocalDateTime.now());

        if (request.getCommunityId() != null) {
            Community community = communityRepository.findById(request.getCommunityId())
                    .orElseThrow(() -> new RuntimeException("Community not found"));
            decision.setCommunity(community);
        }

        Decision savedDecision = decisionRepository.save(decision);

        if (request.getOptions() != null) {
            for (OptionRequest optReq : request.getOptions()) {
                Option option = new Option();
                option.setTitle(optReq.getTitle());
                option.setDescription(optReq.getDescription());
                option.setImageUrl(optReq.getImageUrl());
                option.setDecision(savedDecision);
                optionRepository.save(option);
            }
        }
        return savedDecision;
    }

    public Decision getDecisionById(Long id) {
        return decisionRepository.findById(id).orElseThrow(() -> new RuntimeException("Decision not found"));
    }

    public List<Decision> getAllPublicDecisions() {
        return decisionRepository.findByIsPublicTrue();
    }

    public List<Decision> getDecisionsByUser(Long userId) {
        return decisionRepository.findByCreatorId(userId);
    }

    public List<Decision> getDecisionsByCommunity(Long communityId) {
        return decisionRepository.findByCommunityId(communityId);
    }

    @Transactional
    public Decision updateDecision(Long id, DecisionRequest request, User user) {
        Decision decision = getDecisionById(id);
        if (!decision.getCreator().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        decision.setTitle(request.getTitle());
        decision.setDescription(request.getDescription());
        decision.setCategory(request.getCategory());
        decision.setPublic(request.getIsPublic());
        decision.setDeadline(request.getDeadline());
        decision.setUpdatedAt(LocalDateTime.now());
        return decisionRepository.save(decision);
    }

    @Transactional
    public void deleteDecision(Long id, User user) {
        Decision decision = getDecisionById(id);
        if (!decision.getCreator().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        decisionRepository.delete(decision);
    }

    @Transactional
    public Option addOption(Long decisionId, OptionRequest request) {
        Decision decision = getDecisionById(decisionId);
        Option option = new Option();
        option.setTitle(request.getTitle());
        option.setDescription(request.getDescription());
        option.setImageUrl(request.getImageUrl());
        option.setDecision(decision);
        return optionRepository.save(option);
    }

    @Transactional
    public void removeOption(Long optionId) {
        optionRepository.deleteById(optionId);
    }

    @Transactional
    public ComparisonFactor addComparisonFactor(Long decisionId, String name, double weight) {
        Decision decision = getDecisionById(decisionId);
        ComparisonFactor factor = new ComparisonFactor();
        factor.setName(name);
        factor.setWeight(weight);
        factor.setDecision(decision);
        return factorRepository.save(factor);
    }

    @Transactional
    public OptionScore setOptionScore(Long optionId, Long factorId, double scoreVal, String notes) {
        Option option = optionRepository.findById(optionId).orElseThrow();
        ComparisonFactor factor = factorRepository.findById(factorId).orElseThrow();
        OptionScore score = new OptionScore();
        score.setOption(option);
        score.setFactor(factor);
        score.setScore(scoreVal);
        score.setNotes(notes);
        return scoreRepository.save(score);
    }

    @Transactional
    public ProCon addProCon(Long optionId, String type, String content, User user) {
        Option option = optionRepository.findById(optionId).orElseThrow();
        ProCon proCon = new ProCon();
        proCon.setOption(option);
        proCon.setType(ProCon.Type.valueOf(type.toUpperCase()));
        proCon.setContent(content);
        proCon.setUser(user);
        return proConRepository.save(proCon);
    }

    public List<Decision> searchDecisions(String query) {
        return decisionRepository.findByTitleContainingIgnoreCase(query);
    }
}
