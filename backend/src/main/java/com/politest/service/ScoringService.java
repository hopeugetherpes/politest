package com.politest.service;

import com.politest.model.ArchetypeQuestion;
import com.politest.model.Axis;
import com.politest.model.AxisResult;
import com.politest.model.Pole;
import com.politest.model.Question;
import com.politest.model.ResultRequest;
import com.politest.model.SubmittedAnswer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ScoringService {
    private final QuizDataService dataService;

    public ScoringService(QuizDataService dataService) {
        this.dataService = dataService;
    }

    public List<AxisResult> score(ResultRequest request) {
        return score(request, QuizDataService.LANG_EN);
    }

    public List<AxisResult> score(ResultRequest request, String lang) {
        Map<String, Question> questionById = dataService.getQuestions().stream()
                .collect(Collectors.toMap(Question::id, Function.identity()));

        validateAnswers(request.answers(), questionById);

        Map<String, WeightedScore> scores = new HashMap<>();
        for (SubmittedAnswer submittedAnswer : request.answers()) {
            Question question = questionById.get(submittedAnswer.questionId());
            double towardAgreement = submittedAnswer.answer().scoreTowardAgreement();
            double leftScore = question.agreePole() == Pole.LEFT ? towardAgreement : 1.0 - towardAgreement;
            scores.computeIfAbsent(question.axisId(), ignored -> new WeightedScore())
                    .add(leftScore, question.weight());
        }
        addArchetypeAnswers(request.archetype(), scores);

        String normalizedLang = QuizDataService.normalizeLang(lang);
        return dataService.getAxes(normalizedLang).stream()
                .map(axis -> toAxisResult(axis, scores.get(axis.id()), normalizedLang))
                .toList();
    }

    // Reconstrói o resultado a partir de um vetor de leftPercent (um valor por
    // eixo, na ordem de axes.json) — usado pelas URLs de resultado compartilhado.
    public List<AxisResult> scoreFromLeftPercents(List<Double> leftPercents, String lang) {
        String normalizedLang = QuizDataService.normalizeLang(lang);
        List<Axis> axes = dataService.getAxes(normalizedLang);
        if (leftPercents.size() != axes.size()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid axis vector: esperados " + axes.size() + " values"
            );
        }
        return java.util.stream.IntStream.range(0, axes.size())
                .mapToObj(index -> buildAxisResult(axes.get(index), leftPercents.get(index), normalizedLang))
                .toList();
    }

    // Cada alternativa escolhida entra como uma resposta a mais em cada eixo que
    // ela toca, com o mesmo peso (1) de uma pergunta comum.
    private void addArchetypeAnswers(Map<String, String> choices, Map<String, WeightedScore> scores) {
        if (choices == null || choices.isEmpty()) {
            return;
        }
        Map<String, ArchetypeQuestion> byId = dataService.getArchetypeQuestions().stream()
                .collect(Collectors.toMap(ArchetypeQuestion::id, Function.identity()));
        choices.forEach((questionId, optionId) -> {
            ArchetypeQuestion question = byId.get(questionId);
            ArchetypeQuestion.Option option = question == null ? null : question.options().stream()
                    .filter(candidate -> candidate.id().equals(optionId))
                    .findFirst()
                    .orElse(null);
            if (option == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Invalid archetype answer: " + questionId + "=" + optionId
                );
            }
            option.effects().forEach((axisId, leftPercent) ->
                    scores.computeIfAbsent(axisId, ignored -> new WeightedScore()).add(leftPercent / 100.0, 1.0));
        });
    }

    private void validateAnswers(List<SubmittedAnswer> answers, Map<String, Question> questionById) {
        Set<String> unknown = answers.stream()
                .map(SubmittedAnswer::questionId)
                .filter(id -> !questionById.containsKey(id))
                .collect(Collectors.toSet());
        if (!unknown.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid answers. Unknown IDs: " + unknown
            );
        }
    }

    private AxisResult toAxisResult(Axis axis, WeightedScore weightedScore, String lang) {
        return buildAxisResult(axis, weightedScore.average() * 100.0, lang);
    }

    private AxisResult buildAxisResult(Axis axis, double rawLeftPercent, String lang) {
        double leftPercent = round(Math.max(0.0, Math.min(100.0, rawLeftPercent)));
        double rightPercent = round(100.0 - leftPercent);
        String dominantPole = leftPercent >= rightPercent ? axis.leftPole() : axis.rightPole();
        double distanceFromCenter = Math.abs(leftPercent - 50.0);
        String intensity = intensityFor(distanceFromCenter, lang);
        return new AxisResult(
                axis.id(),
                axis.label(),
                axis.leftPole(),
                axis.rightPole(),
                leftPercent,
                rightPercent,
                dominantPole,
                intensity
        );
    }

    private String intensityFor(double distanceFromCenter, String lang) {
        if (distanceFromCenter < 7.5) {
            return "Balanced";
        }
        if (distanceFromCenter < 22.5) {
            return "Leaning";
        }
        if (distanceFromCenter < 37.5) {
            return "Strong";
        }
        return "Very strong";
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }

    private static final class WeightedScore {
        private double total;
        private double weight;

        void add(double score, double itemWeight) {
            total += score * itemWeight;
            weight += itemWeight;
        }

        double average() {
            return weight == 0.0 ? 0.5 : total / weight;
        }
    }
}
