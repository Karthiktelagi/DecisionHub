package com.decisionhub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="polls")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @Enumerated(EnumType.STRING)
    private PollType type;

    @Builder.Default
    private boolean isAnonymous = false;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PollStatus status = PollStatus.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "decision_id")
    @JsonIgnore
    private Decision decision;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PollOption> pollOptions;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vote> votes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime closesAt;

    public enum PollType {
        SINGLE_CHOICE, MULTIPLE_CHOICE, RATING
    }

    public enum PollStatus {
        ACTIVE, CLOSED
    }
}
