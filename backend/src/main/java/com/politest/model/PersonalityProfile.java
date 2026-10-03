package com.politest.model;

import java.util.Map;

public record PersonalityProfile(
        String personalityId,
        Map<String, Double> vector
) {
}
