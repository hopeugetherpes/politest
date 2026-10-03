package com.twelveaxes.service;

import com.twelveaxes.model.Book;
import com.twelveaxes.model.BookRecommendation;
import com.twelveaxes.model.PersonalityMatch;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;
import org.springframework.stereotype.Service;

@Service
public class BookRecommendationService {
    static final int MAX_BOOKS = 3;
    static final String AMAZON_US_HOST = "www.amazon.com";
    static final String AMAZON_US_TAG = "12axes0d-20";

    private final QuizDataService dataService;

    public BookRecommendationService(QuizDataService dataService) {
        this.dataService = dataService;
    }

    /**
     * Livros das personalidades mais compativeis (geral + melhor de cada area de
     * atuacao) que tem livro cadastrado, da maior para a menor compatibilidade.
     */
    public List<BookRecommendation> recommend(
            List<PersonalityMatch> generalMatches,
            List<PersonalityMatch> areaMatches,
            String lang
    ) {
        String normalizedLang = QuizDataService.normalizeLang(lang);
        Map<String, Book> books = dataService.getBooks();
        Map<String, PersonalityMatch> candidates = new LinkedHashMap<>();
        Stream.concat(generalMatches.stream(), areaMatches.stream())
                .filter(match -> books.containsKey(match.personalityId()))
                .forEach(match -> candidates.putIfAbsent(match.personalityId(), match));

        return candidates.values().stream()
                .sorted(Comparator.comparingDouble(PersonalityMatch::compatibility).reversed())
                .limit(MAX_BOOKS)
                .map(match -> toRecommendation(match, books.get(match.personalityId()), normalizedLang))
                .toList();
    }

    private BookRecommendation toRecommendation(PersonalityMatch match, Book book, String lang) {
        String title = localized(book.title(), lang);
        return new BookRecommendation(
                match.personalityId(),
                match.name(),
                match.imagePath(),
                title,
                book.year(),
                affiliateUrl(localized(book.url(), lang), title, match.name(), lang),
                match.compatibility()
        );
    }

    static String affiliateUrl(String directUrl, String title, String author, String lang) {
        if (directUrl != null && !directUrl.isBlank()) {
            return directUrl;
        }
        String query = URLEncoder.encode(title + " " + author, StandardCharsets.UTF_8);
        return "https://" + AMAZON_US_HOST
                + "/s?k=" + query + "&i=stripbooks&tag=" + AMAZON_US_TAG;
    }

    private static String localized(Map<String, String> values, String lang) {
        if (values == null) {
            return null;
        }
        return values.get(QuizDataService.LANG_EN);
    }
}
