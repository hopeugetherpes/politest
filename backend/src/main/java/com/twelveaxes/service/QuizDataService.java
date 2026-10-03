package com.twelveaxes.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twelveaxes.model.Book;
import com.twelveaxes.model.AnswerOption;
import com.twelveaxes.model.ArchetypeQuestion;
import com.twelveaxes.model.AnswerValue;
import com.twelveaxes.model.Axis;
import com.twelveaxes.model.Country;
import com.twelveaxes.model.CountryProfile;
import com.twelveaxes.model.Ideology;
import com.twelveaxes.model.IdeologyProfile;
import com.twelveaxes.model.Personality;
import com.twelveaxes.model.PersonalityProfile;
import com.twelveaxes.model.Question;
import com.twelveaxes.model.QuizPayload;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class QuizDataService {
    public static final String SHORT_VARIANT = "short";
    public static final String EXTENDED_VARIANT = "extended";
    public static final String EXTREME_VARIANT = "extreme";

    public static final String LANG_EN = "en";

    private final ObjectMapper objectMapper;
    private LocaleBundle data;
    private Map<String, IdeologyProfile> ideologyProfiles;
    private Map<String, CountryProfile> countryProfiles;
    private Map<String, PersonalityProfile> personalityProfiles;
    private Map<String, Book> books;
    private List<ArchetypeQuestion> archetypeQuestions;

    // Textos por locale: profiles/vetores são independentes de idioma e ficam fora do bundle.
    private record LocaleBundle(
            List<Axis> axes,
            List<Question> questions,
            List<Ideology> ideologies,
            Map<String, Ideology> ideologiesById,
            List<Country> countries,
            Map<String, Country> countriesById,
            List<Personality> personalities,
            Map<String, Personality> personalitiesById
    ) {
        static LocaleBundle of(
                List<Axis> axes,
                List<Question> questions,
                List<Ideology> ideologies,
                List<Country> countries,
                List<Personality> personalities
        ) {
            return new LocaleBundle(
                    axes,
                    questions,
                    ideologies,
                    ideologies.stream().collect(Collectors.toUnmodifiableMap(Ideology::id, Function.identity())),
                    countries,
                    countries.stream().collect(Collectors.toUnmodifiableMap(Country::id, Function.identity())),
                    personalities,
                    personalities.stream().collect(Collectors.toUnmodifiableMap(Personality::id, Function.identity()))
            );
        }
    }

    public QuizDataService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    void loadData() throws IOException {
        List<Axis> axes = readJson("data/axes.json", new TypeReference<>() {});
        List<Question> questions = readJson("data/questions-pool.json", new TypeReference<>() {});
        List<Ideology> ideologies = readJson("data/ideologies.json", new TypeReference<>() {});
        List<Country> countries = readJson("data/countries.json", new TypeReference<>() {});
        List<Personality> personalities = readJson("data/personalities.json", new TypeReference<>() {});

        // Mapas na ordem dos JSONs: toUnmodifiableMap embaralha a iteracao a cada
        // JVM, o que mudava os exemplos da tensao entre reinicios do servidor.
        List<IdeologyProfile> profiles = readJson("data/ideology-profiles.json", new TypeReference<>() {});
        ideologyProfiles = profiles.stream()
                .collect(Collectors.collectingAndThen(
                        Collectors.toMap(IdeologyProfile::ideologyId, Function.identity(), (a, b) -> b, java.util.LinkedHashMap::new),
                        java.util.Collections::unmodifiableMap));
        List<CountryProfile> countryProfileList = readJson("data/countries-profiles.json", new TypeReference<>() {});
        countryProfiles = countryProfileList.stream()
                .collect(Collectors.collectingAndThen(
                        Collectors.toMap(CountryProfile::countryId, Function.identity(), (a, b) -> b, java.util.LinkedHashMap::new),
                        java.util.Collections::unmodifiableMap));
        List<PersonalityProfile> personalityProfileList = readJson("data/personality-profiles.json", new TypeReference<>() {});
        personalityProfiles = personalityProfileList.stream()
                .collect(Collectors.collectingAndThen(
                        Collectors.toMap(PersonalityProfile::personalityId, Function.identity(), (a, b) -> b, java.util.LinkedHashMap::new),
                        java.util.Collections::unmodifiableMap));

        archetypeQuestions = readJson("data/archetype-questions.json", new TypeReference<>() {});
        validateArchetypeQuestions(axes);

        data = LocaleBundle.of(axes, questions, ideologies, countries, personalities);

        List<Book> bookList = readJson("data/books.json", new TypeReference<>() {});
        List<String> unknownBookAuthors = bookList.stream()
                .map(Book::personalityId)
                .filter(id -> !data.personalitiesById().containsKey(id))
                .toList();
        if (!unknownBookAuthors.isEmpty()) {
            throw new IllegalStateException("books.json cita personalidades inexistentes: " + unknownBookAuthors);
        }
        books = bookList.stream()
                .collect(Collectors.toUnmodifiableMap(Book::personalityId, Function.identity()));

        validateCountryProfiles(data);
        validateIdeologyProfiles(data);
        validateIdeologyPersonalityLinks(data);
        validatePersonalityProfiles(data);
    }

    // The optional language parameter is retained for existing API clients.
    public static String normalizeLang(String lang) {
        return LANG_EN;
    }

    private LocaleBundle bundle(String lang) {
        return data;
    }

    private void validateCountryProfiles(LocaleBundle data) {
        List<String> missing = data.countries().stream()
                .map(Country::id)
                .filter(id -> !countryProfiles.containsKey(id))
                .toList();
        if (!missing.isEmpty()) {
            throw new IllegalStateException(
                    "Todo pais precisa de um perfil em countries-profiles.json. Faltando: " + missing
            );
        }

        List<String> unknown = countryProfiles.keySet().stream()
                .filter(id -> !data.countriesById().containsKey(id))
                .toList();
        if (!unknown.isEmpty()) {
            throw new IllegalStateException(
                    "countries-profiles.json aponta para paises inexistentes: " + unknown
            );
        }
    }

    private void validateIdeologyProfiles(LocaleBundle data) {
        List<String> missing = data.ideologies().stream()
                .map(Ideology::id)
                .filter(id -> !ideologyProfiles.containsKey(id))
                .toList();
        if (!missing.isEmpty()) {
            throw new IllegalStateException(
                    "Toda ideologia precisa de um perfil em ideology-profiles.json. Faltando: " + missing
            );
        }
    }

    private void validateIdeologyPersonalityLinks(LocaleBundle data) {
        List<String> broken = data.ideologies().stream()
                .filter(ideology -> ideology.personalityId() == null
                        || ideology.personalityId().isBlank()
                        || !data.personalitiesById().containsKey(ideology.personalityId()))
                .map(ideology -> ideology.id() + " -> " + ideology.personalityId())
                .toList();
        if (!broken.isEmpty()) {
            throw new IllegalStateException(
                    "Toda ideologia precisa de um personalityId que resolva para uma personalidade existente. Inválidos: " + broken
            );
        }
    }

    private void validatePersonalityProfiles(LocaleBundle data) {
        List<String> missing = data.personalities().stream()
                .map(Personality::id)
                .filter(id -> !personalityProfiles.containsKey(id))
                .toList();
        if (!missing.isEmpty()) {
            throw new IllegalStateException(
                    "Toda personalidade precisa de um perfil em personality-profiles.json. Faltando: " + missing
            );
        }
    }

    public QuizPayload getQuiz() {
        return getQuiz(SHORT_VARIANT);
    }

    public QuizPayload getQuiz(String variant) {
        return getQuiz(variant, LANG_EN);
    }

    public QuizPayload getQuiz(String variant, String lang) {
        String normalizedVariant = normalizeVariant(variant);
        String normalizedLang = normalizeLang(lang);
        LocaleBundle data = bundle(normalizedLang);
        int questionsPerAxis = switch (normalizedVariant) {
            case EXTREME_VARIANT -> 0;
            case EXTENDED_VARIANT -> 5;
            default -> 3;
        };
        int questionCount = normalizedVariant.equals(EXTREME_VARIANT)
                ? data.questions().size()
                : questionsPerAxis * data.axes().size();
        String description = "A quiz of " + questionCount + " questions to estimate your position on the 12 political axes.";
        return new QuizPayload(
                "12 Axes",
                description,
                normalizedVariant,
                questionCount,
                questionsPerAxis,
                data.axes(),
                data.questions(),
                answerOptions(normalizedLang),
                archetypeQuestions.stream().map(question -> question.view(normalizedLang)).toList()
        );
    }

    public List<ArchetypeQuestion> getArchetypeQuestions() {
        return archetypeQuestions;
    }

    // Cada efeito precisa apontar para um eixo real com valor 0–100: um erro de
    // digitação no JSON distorceria resultados em silêncio.
    private void validateArchetypeQuestions(List<Axis> axes) {
        java.util.Set<String> axisIds = axes.stream().map(Axis::id).collect(Collectors.toSet());
        for (ArchetypeQuestion question : archetypeQuestions) {
            for (ArchetypeQuestion.Option option : question.options()) {
                option.effects().forEach((axisId, value) -> {
                    if (!axisIds.contains(axisId) || value == null || value < 0 || value > 100) {
                        throw new IllegalStateException("archetype-questions.json: efeito inválido em "
                                + question.id() + "/" + option.id() + " -> " + axisId + "=" + value);
                    }
                });
            }
        }
    }

    public List<Axis> getAxes() {
        return getAxes(LANG_EN);
    }

    public List<Axis> getAxes(String lang) {
        return bundle(lang).axes();
    }

    public List<Question> getQuestions() {
        return bundle(LANG_EN).questions();
    }

    public List<Question> getQuestions(String variant) {
        normalizeVariant(variant);
        return bundle(LANG_EN).questions();
    }

    public List<Question> getQuestionsForLang(String lang) {
        return bundle(lang).questions();
    }

    public List<Ideology> getIdeologies() {
        return getIdeologies(LANG_EN);
    }

    public List<Ideology> getIdeologies(String lang) {
        return bundle(lang).ideologies();
    }

    public Ideology getIdeologyById(String id) {
        return getIdeologyById(id, LANG_EN);
    }

    public Ideology getIdeologyById(String id, String lang) {
        return bundle(lang).ideologiesById().get(id);
    }

    public Country getCountryById(String id) {
        return getCountryById(id, LANG_EN);
    }

    public Country getCountryById(String id, String lang) {
        return bundle(lang).countriesById().get(id);
    }

    public List<Personality> getPersonalities() {
        return getPersonalities(LANG_EN);
    }

    public List<Personality> getPersonalities(String lang) {
        return bundle(lang).personalities();
    }

    public Personality getPersonalityById(String id) {
        return getPersonalityById(id, LANG_EN);
    }

    public Personality getPersonalityById(String id, String lang) {
        return bundle(lang).personalitiesById().get(id);
    }

    public Map<String, Book> getBooks() {
        return books;
    }

    public Map<String, IdeologyProfile> getIdeologyProfiles() {
        return ideologyProfiles;
    }

    public List<Country> getCountries() {
        return getCountries(LANG_EN);
    }

    public List<Country> getCountries(String lang) {
        return bundle(lang).countries();
    }

    public Map<String, CountryProfile> getCountryProfiles() {
        return countryProfiles;
    }

    public Map<String, PersonalityProfile> getPersonalityProfiles() {
        return personalityProfiles;
    }


    private List<AnswerOption> answerOptions(String lang) {
        return Arrays.stream(AnswerValue.values())
                .map(value -> new AnswerOption(value, labelFor(value, lang), value.scoreTowardAgreement()))
                .toList();
    }

    private String labelFor(AnswerValue value, String lang) {
        return switch (value) {
            case STRONGLY_AGREE -> "Strongly agree";
            case AGREE -> "Agree";
            case NEUTRAL -> "Neutral or It depends";
            case DISAGREE -> "Disagree";
            case STRONGLY_DISAGREE -> "Strongly disagree";
        };
    }

    public String normalizeVariant(String variant) {
        if (variant == null || variant.isBlank()) {
            return SHORT_VARIANT;
        }
        return switch (variant.trim().toLowerCase()) {
            case SHORT_VARIANT, "curta" -> SHORT_VARIANT;
            case EXTENDED_VARIANT, "extensa" -> EXTENDED_VARIANT;
            case EXTREME_VARIANT, "extrema", "240", "240questions" -> EXTREME_VARIANT;
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid quiz variant");
        };
    }

    private <T> T readJson(String path, TypeReference<T> type) throws IOException {
        ClassPathResource resource = new ClassPathResource(path);
        try (InputStream input = resource.getInputStream()) {
            return objectMapper.readValue(input, type);
        }
    }
}
