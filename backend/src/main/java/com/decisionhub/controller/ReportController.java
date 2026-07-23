package com.decisionhub.controller;

import com.decisionhub.service.ReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/decision/{id}/pdf")
    public ResponseEntity<byte[]> downloadDecisionPdf(@PathVariable Long id) {
        byte[] pdf = reportService.generateDecisionReport(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=decision_report_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/poll/{id}/csv")
    public ResponseEntity<byte[]> downloadPollCsv(@PathVariable Long id) {
        byte[] csv = reportService.generatePollReport(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=poll_report_" + id + ".csv")
                .contentType(MediaType.valueOf("text/csv"))
                .body(csv);
    }
}
