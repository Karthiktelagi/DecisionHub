package com.decisionhub.repository;

import com.decisionhub.entity.OptionScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OptionScoreRepository extends JpaRepository<OptionScore, Long> {
    List<OptionScore> findByOptionId(Long optionId);
    List<OptionScore> findByFactorId(Long factorId);
}
