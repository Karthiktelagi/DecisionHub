package com.decisionhub.service;

import org.springframework.stereotype.Service;

@Service
public class ReportService {

    public byte[] generateDecisionReport(Long decisionId) {
        // mock simple PDF binary
        String content = "PDF Report for Decision " + decisionId;
        return content.getBytes();
    }

    public byte[] generatePollReport(Long pollId) {
        StringBuilder csv = new StringBuilder();
        csv.append("Option,Votes\n");
        csv.append("Option 1,10\n");
        csv.append("Option 2,5\n");
        return csv.toString().getBytes();
    }
}
