package com.decisionhub.service;

import com.decisionhub.dto.PollRequest;
import com.decisionhub.entity.*;
import com.decisionhub.repository.DecisionRepository;
import com.decisionhub.repository.PollOptionRepository;
import com.decisionhub.repository.PollRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepository pollRepository;
    private final DecisionRepository decisionRepository;
    private final PollOptionRepository pollOptionRepository;

    @Transactional
    public Poll createPoll(PollRequest request, User user) {
        Decision decision = decisionRepository.findById(request.getDecisionId())
                .orElseThrow(() -> new RuntimeException("Decision not found"));

        Poll poll = new Poll();
        poll.setTitle(request.getTitle());
        poll.setType(request.getType());
        poll.setAnonymous(request.getIsAnonymous());
        poll.setStatus(Poll.PollStatus.ACTIVE);
        poll.setDecision(decision);
        poll.setCreatedAt(LocalDateTime.now());
        poll.setClosesAt(request.getClosesAt());

        Poll savedPoll = pollRepository.save(poll);

        if (request.getOptions() != null) {
            for (String label : request.getOptions()) {
                PollOption option = new PollOption();
                option.setLabel(label);
                option.setPoll(savedPoll);
                pollOptionRepository.save(option);
            }
        }
        return savedPoll;
    }

    public Poll getPollById(Long id) {
        return pollRepository.findById(id).orElseThrow(() -> new RuntimeException("Poll not found"));
    }

    public List<Poll> getPollsByDecision(Long decisionId) {
        return pollRepository.findByDecisionId(decisionId);
    }

    @Transactional
    public Poll closePoll(Long id, User user) {
        Poll poll = getPollById(id);
        if (!poll.getDecision().getCreator().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        poll.setStatus(Poll.PollStatus.CLOSED);
        return pollRepository.save(poll);
    }

    public List<Poll> getActivePoll() {
        return pollRepository.findByStatus(Poll.PollStatus.ACTIVE);
    }
}
