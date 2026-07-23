package com.decisionhub.repository;

import com.decisionhub.entity.ProCon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProConRepository extends JpaRepository<ProCon, Long> {
    List<ProCon> findByOptionId(Long optionId);
    List<ProCon> findByType(ProCon.Type type);
}
