package com.politest;

import static org.assertj.core.api.Assertions.assertThat;

import com.politest.service.QuizDataService;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

// Category names select the result and share-card colors in ideologyColors.ts.
@SpringBootTest
class IdeologyCategoryTest {
    private static final Set<String> CATEGORIES = Set.of(
            "Radical Left", "Left", "Center", "Right", "Far-Right",
            "Third Position", "Libertarian", "Anarchist");

    @Autowired
    private QuizDataService dataService;

    @Test
    void everyCategoryIsOneOfTheEight() {
        assertThat(dataService.getIdeologies()).isNotEmpty()
                .allSatisfy(ideology -> assertThat(ideology.category())
                        .as("Invalid category for %s", ideology.id())
                        .isIn(CATEGORIES));
    }
}
