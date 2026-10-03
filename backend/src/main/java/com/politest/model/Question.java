package com.politest.model;

public record Question(
        String id,
        String axisId,
        String text,
        Pole agreePole,
        double weight
) {
}
