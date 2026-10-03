package com.politest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.politest.model.BookRecommendation;
import com.politest.model.PersonalityMatch;
import com.politest.model.QuizResult;
import com.politest.service.QuizDataService;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class BookRecommendationTest {
    private static final String LEFT_LIBERTARIAN_VECTOR = "70,80,20,30,70,40,60,55,60,25,20,45";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private QuizDataService dataService;

    private QuizResult result(String lang) throws Exception {
        String body = mockMvc.perform(get("/api/results/by-axes").param("v", LEFT_LIBERTARIAN_VECTOR).param("lang", lang))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        return objectMapper.readValue(body, QuizResult.class);
    }

    @Test
    void recommendsUpToThreeBooksFromTopPersonalitiesSortedByCompatibility() throws Exception {
        QuizResult result = result("en");
        Set<String> pool = Stream.concat(result.personalityMatches().stream(), result.categoryBestMatches().stream())
                .map(PersonalityMatch::personalityId)
                .collect(Collectors.toSet());

        assertThat(result.bookRecommendations()).isNotEmpty().hasSizeLessThanOrEqualTo(3);
        assertThat(result.bookRecommendations())
                .isSortedAccordingTo((a, b) -> Double.compare(b.compatibility(), a.compatibility()));
        assertThat(result.bookRecommendations()).extracting(BookRecommendation::personalityId)
                .doesNotHaveDuplicates()
                .allSatisfy(id -> {
                    assertThat(pool).contains(id);
                    assertThat(dataService.getBooks()).containsKey(id);
                });
    }

    @Test
    void usesEnglishStoreForUnsupportedLanguage() throws Exception {
        assertThat(result("zz").bookRecommendations()).allSatisfy(book -> {
            assertThat(book.title()).isNotBlank();
            assertThat(book.url()).startsWith("https://www.amazon.com/s?k=").doesNotContain("tag=");
        });
    }

    @Test
    void usesUsStoreWithoutAnUnconfiguredAffiliateTagInEnglish() throws Exception {
        assertThat(result("en").bookRecommendations()).allSatisfy(book ->
                assertThat(book.url()).startsWith("https://www.amazon.com/s?k=").doesNotContain("tag="));
    }

    @Test
    void everyBookPointsToAnExistingPersonality() {
        assertThat(dataService.getBooks()).isNotEmpty();
        assertThat(dataService.getBooks().keySet())
                .allSatisfy(id -> assertThat(dataService.getPersonalityById(id)).isNotNull());
    }
}
