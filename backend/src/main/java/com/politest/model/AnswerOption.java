package com.politest.model;

public record AnswerOption(
        AnswerValue id,
        String label,
        double scoreTowardAgreement
) {
}
