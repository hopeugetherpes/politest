package com.politest.controller;

import com.politest.model.CompareDetail;
import com.politest.model.CompareItem;
import com.politest.service.AxisValuesParser;
import com.politest.service.CompareService;
import com.politest.service.ProfileMatchScorer;
import com.politest.service.QuizDataService;
import com.politest.service.ReligionFilter;
import com.politest.service.ScoringService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompareController {
    private final CompareService compareService;
    private final ScoringService scoringService;
    private final ProfileMatchScorer scorer;

    public CompareController(CompareService compareService, ScoringService scoringService, ProfileMatchScorer scorer) {
        this.compareService = compareService;
        this.scoringService = scoringService;
        this.scorer = scorer;
    }

    // Perfis pesquisaveis na secao de comparacao, ja filtrados pela religiao escolhida (opcional).
    @GetMapping("/api/compare/catalog")
    public List<CompareItem> catalog(
            @RequestParam(defaultValue = QuizDataService.LANG_EN) String lang,
            @RequestParam(required = false) String religion
    ) {
        return compareService.catalog(lang, ReligionFilter.normalize(religion));
    }

    // Compara o vetor do usuario (12 leftPercents, como em /api/results/by-axes) com um perfil.
    @GetMapping("/api/compare")
    public CompareDetail compare(
            @RequestParam String type,
            @RequestParam String id,
            @RequestParam("v") String values,
            @RequestParam(defaultValue = QuizDataService.LANG_EN) String lang
    ) {
        var axes = scoringService.scoreFromLeftPercents(AxisValuesParser.parse(values), lang);
        return compareService.compare(type, id, scorer.userVectorFor(axes), lang);
    }
}
