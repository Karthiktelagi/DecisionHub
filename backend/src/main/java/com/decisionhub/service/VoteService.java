package com.decisionhub.service;

import com.decisionhub.dto.VoteRequest;
import com.decisionhub.entity.*;
import com.decisionhub.repository.PollOptionRepository;
import com.decisionhub.repository.PollRepository;
import com.decisionhub.repository.VoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;
    private final PollRepository pollRepository;
    private final PollOptionRepository pollOptionRepository;

    @Transactional
    public Vote castVote(Long pollId, VoteRequest request, User user) {
        Poll poll = pollRepository.findById(pollId).orElseThrow(() -> new RuntimeException("Poll not found"));
        
        if (poll.getType() == Poll.PollType.SINGLE_CHOICE && hasUserVoted(pollId, user.getId())) {
            throw new RuntimeException("User already voted in this poll");
        }

        PollOption pollOption = pollOptionRepository.findById(request.getPollOptionId())
                .orElseThrow(() -> new RuntimeException("Poll option not found"));

        Vote vote = new Vote();
        vote.setPoll(poll);
        vote.setPollOption(pollOption);
        vote.setUser(user);
        vote.setRating(request.getRating());
        
        return voteRepository.save(vote);
    }

    public List<Vote> getVotesByPoll(Long pollId) {
        return voteRepository.findByPollId(pollId);
    }

    public Map<String, Long> getPollResults(Long pollId) {
        List<PollOption> options = pollOptionRepository.findByPollId(pollId);
        Map<String, Long> results = new HashMap<>();
        for (PollOption opt : options) {
            long count = voteRepository.countByPollOptionId(opt.getId());
            results.put(opt.getLabel(), count);
        }
        return results;
    }

    public boolean hasUserVoted(Long pollId, Long userId) {
        return voteRepository.existsByPollIdAndUserId(pollId, userId);
    }
}
