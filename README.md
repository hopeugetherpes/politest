<div align="center">

# Politest

A political quiz that places you on twelve independent axes and compares your answers with +230 ideologies, +170 countries and regimes, and +390 political figures.

**[politest.anatole.co](https://politest.anatole.co)** · no data collection · no sign-up

![Node.js](https://img.shields.io/badge/Node.js-22-339933) ![Vercel](https://img.shields.io/badge/Vercel-Static-black) ![React](https://img.shields.io/badge/React-18-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6) ![CI](https://github.com/hopeugetherpes/politest/actions/workflows/ci.yml/badge.svg)

</div>

## Overview

Most political tests reduce you to a single point on a left-right line, or to a two-axis grid. Politest measures twelve dimensions separately, so someone who wants a free market and a strong state, or open borders and a religious society, sees that combination instead of an average that hides it.

Politest is a static website: quizzes, results, shared links and comparisons are computed directly in the browser. The same tested JavaScript engine preserves the original matching algorithm and versioned JSON catalogs. English is available at `/` and French at `/fr`, including all 240 questions, results, catalogs, PNG sharing and PDF reports. The original Java engine remains as a reference for parity tests.

## About the project

### What it is

An anonymous quiz. You rate statements on a five-point agreement scale and get a percentage on each axis, your closest ideologies, the country or historical regime nearest to you, and the political figures who think most like you.

### Who it is for

People curious about politics who want more than a left-right label, students comparing doctrines and regimes, and anyone who wants to see where they disagree with their own side.

### What sets it apart

- Twelve axes scored independently, so the result keeps tensions and unusual combinations.
- Three catalogs (ideologies, countries, personalities), each matched on its own. Countries include +68 historical regimes, from the Paris Commune to Atatürk's Turkey.
- Every profile in the catalogs answered the same 240 questions a user can answer, instead of being placed by hand.
- An optional religion filter, so a user can hide profiles tied to a faith that is not theirs.
- A shareable result card, a PDF report, and a link that rebuilds the result from the URL.

### The 12 axes

The model is inspired by the [original political spectrum test](https://politicaltests.github.io/12axes/). Each axis runs between two poles:

| Axis | Pole A | Pole B |
|------|--------|--------|
| Structure | Federal | Unitary |
| Representation | Democracy | Autocracy |
| Power | Security | Liberty |
| Immigration | Assimilation | Multiculturalism |
| Diplomacy | Militarist | Pacifist |
| Intervention | Non-interventionist | Nationalist |
| Economy | Public | Private |
| Control | Planning | Free market |
| Trade | Protectionism | Globalism |
| Religion | Irreligious | Religious |
| Morality | Progressive | Traditionalist |
| Technology | Technology | Biology |

### Political spectra

The axes describe the user. Ideologies are grouped into eight broader families, in the spirit of the [Political Compass](https://www.politicalcompass.org/), which place a result on the familiar map: Left, Radical Left, Center, Right, Far-Right, Libertarian, Anarchist, and Third Position. The family is a label for reading the result. It does not count in the score.

### How your result is calculated

1. Each answer moves an axis toward one of its poles. Strong agreement counts fully, "neutral" leaves the axis at the center, and disagreement pushes the other way.
2. The average of your answers on each axis becomes a percentage between the two poles, labeled balanced, leaning, strong, or very strong depending on how far it is from the center.
3. Your twelve percentages form a profile, which is compared with every ideology, country, and personality in the catalogs. The closest ones are shown with a compatibility score.

### Questions and scoring

| Format | Questions | Per axis |
|--------|----------:|---------:|
| Short | 36 | 3 |
| Complete | 60 | 5 |
| Extreme | 240 | 20 |

The pool has 240 statements, 20 per axis, half phrased toward each pole so agreeing with everything does not skew the result. The short and complete formats draw a balanced subset. Five multiple-choice "archetype" questions at the end add broader signals across several axes. A last, optional question about your religion sets the filter and does not affect the score.

| Answer | Value |
|--------|------:|
| Strongly agree | 1.00 |
| Agree | 0.75 |
| Neutral | 0.50 |
| Disagree | 0.25 |
| Strongly disagree | 0.00 |

### Methodological note

Politest is a tool for exploring ideas. It is not a scientific instrument. A high compatibility means your answers are close to a profile, not that you belong to a movement, should vote for someone, or share anyone's values in full. Profiles are simplified models, and the questions inevitably carry the framing of whoever wrote them.

## Features

- Three quiz lengths with auto-advance and a back button.
- Results by axis, with intensity and the rarest and most common positions in your profile.
- Top ideologies, the closest current and historical countries, and matching personalities by category, plus the least compatible ideology.
- An "axis tension" readout for pairs of positions that rarely appear together.
- Book recommendations tied to your profile.
- Religion filter for Christianity, Judaism, Islam, and Buddhism.
- Share card (PNG), PDF report, and shareable result link.
- Static, indexable pages for every ideology, country, and personality.

## Demo

<div align="center">
<img src=".github/assets/result-card.png" alt="Politest result card" width="360">
</div>

The share card sums up a result: the main ideology and its family, the most compatible personality, the dominant pole on each of the twelve axes, and the closest personalities and countries.

## Architecture

### Stack

| Layer | Technology |
|-------|------------|
| Calculation | Shared JavaScript engine, executed locally in the browser |
| Reference engine | Java 21, Spring Boot 3.3, Maven (optional) |
| Frontend | React 18, TypeScript, Vite 8 |
| Data | Versioned JSON, bundled as static assets and loaded on demand |
| Tests | Node.js test runner, Java reference fixtures, Vitest, JUnit 5 |
| CI | GitHub Actions (API parity, Java reference tests, catalog check, frontend tests and build) |
| Deploy | Static assets on Vercel, no backend or API |

There is no database or deployed API. Catalogs change through commits. The browser loads the scoring engine on demand and calculates results locally. Answers never leave the browser; an unfinished quiz is saved locally so it can be resumed. Shared links contain only the 12 percentages and the optional recommendation filter.

### Project data

The canonical English data lives in `backend/src/main/resources/data/`. French text snapshots live in `frontend/src/i18n/catalog-fr.json`, and the UI dictionaries in `frontend/src/i18n/index.ts` and `fr.ts`. French text never changes identifiers, answer polarity, weights, vectors or rankings. No translation service is used at runtime.

| File | Contents |
|------|----------|
| `axes.json` | The 12 axes, their poles and labels |
| `questions-pool.json` | 240 questions, with axis, polarity, and weight |
| `archetype-questions.json` | The five multiple-choice questions |
| `ideologies.json` / `ideology-profiles.json` | Ideologies and their 12-axis vectors |
| `countries.json` / `countries-profiles.json` | Countries, regions, and historical regimes |
| `personalities.json` / `personality-profiles.json` | Political figures and intellectuals |
| `books.json` | Book recommendations |

The shared engine validates every catalog vector before calculating results.

### Repository structure

```txt
Politest/
├── server/                  Browser-compatible scoring, rankings, comparisons and reference tests
├── backend/                 Canonical JSON catalogs and original Java reference
│   └── src/main/java/com/politest/
│       ├── config/          CORS, cache headers, origin enforcement
│       ├── controller/      REST endpoints
│       ├── model/           records and DTOs
│       └── service/         data loading, scoring, matchers, religion filter
├── frontend/                React + Vite app
│   ├── src/components/      home, quiz, results, report
│   ├── src/i18n/            English and French UI and catalog text
│   └── scripts/             static page generator, image optimizer
├── profile-audit/           pipeline that builds the catalog vectors
└── scripts/                 repository checks (catalogs)
```

### How matching works

A result is a vector of twelve values from 0 to 100. The `ProfileMatchScorer` compares it with each profile using four weighted parts:

| Component | Weight | What it measures |
|-----------|-------:|------------------|
| Per axis | 0.42 | Distance on each axis, with an extra penalty when you and the profile are on opposite sides of the center |
| Direction | 0.33 | Cosine similarity of both vectors around the center, damped near it, where direction is mostly noise |
| Magnitude | 0.18 | Whether your overall intensity matches the profile's, so a moderate user does not match an extreme profile just because the direction agrees |
| Outlier | 0.07 | A penalty for a single axis that is far off |

Each catalog is ranked separately. A match also reports a percentile inside its own catalog, because ideologies tend to be more extreme than real countries and the raw scores are not comparable across catalogs. `ScorerBenchmarkTest` guards the calibration: it checks that noisy answers generated from a profile still find that profile.

### Languages and local calculation

The navigation offers **Français 🇫🇷** and **English 🇬🇧**. French routes use `/fr`, `/fr/results`, `/fr/240questions` and `/fr/{ideologies,personalities,countries}`. Internal links and shared results retain the selected language. Switching language preserves the percentages in shared links; a saved quiz can be resumed in either language because question IDs are identical.

`frontend/src/services/quizApi.ts` retains its existing frontend interface but now loads `server/engine.mjs` locally. It makes no API requests and ignores old `VITE_API_URL` settings. Questions, archetypes, scores, religion filters, comparisons and book recommendations all work on a static deployment.

### Running locally

You need Node.js 22 and npm. No environment variables, Java server or API keys are needed.

```bash
npm --prefix frontend ci
npm --prefix frontend run dev   # http://localhost:5173
```

To preview the static production build:

```bash
npm run build
npm run preview                # http://localhost:4173
```

### Tests

```bash
npm run test:api                # complete responses compared with Java reference fixtures
npm --prefix frontend test     # frontend behavior, translation coverage and local calculation
npm run build                  # type checking, production bundle and static catalog pages
```

The API parity suite checks complete results for every catalog vector, all three quiz
formats, archetype options, religious preferences, edge cases and deterministic random
inputs. It covers rankings, dimensions, outliers, tensions, recommendations, shared
results and comparisons. HTTP tests verify successful requests and JSON error responses.

The original Java test suite is also retained (`cd backend && mvn test`, Java 21 and
Maven required for that optional reference check). Maintainers can regenerate the
fixtures with `scripts/export-java-reference.mjs` against the local Java engine.

### Deploy

**Import the repository root into Vercel. The entire site deploys as static files.**
No backend, API, database, translation service or environment variable is required.

1. Import [this repository](https://github.com/hopeugetherpes/politest) into Vercel.
2. Keep **Root Directory** at the repository root and **Framework Preset** at **Other**.
   The root `vercel.json` supplies the installation command, build command and output directory.
3. Deploy and connect your custom domain if desired. All three quiz formats and both languages are included.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhopeugetherpes%2Fpolitest&project-name=politest)

The deployment installs the frontend dependencies, builds the React app and generates the English and French catalog pages in `frontend/dist`. The shared scoring engine and catalog data are bundled as static JavaScript assets. Vercel does not compile Java or deploy functions.

Connect Vercel to this GitHub repository for automatic deployments on pushes. The retained Java, Docker and reference HTTP files are optional development infrastructure and are not used by the deployed site.

Every push and pull request runs `.github/workflows/ci.yml`.

## Contributing

Bug reports, corrections to profiles, and text fixes are welcome as issues or pull requests. Keep each pull request to one change, run the integrated API and frontend tests, and describe how you tested it. [CONTRIBUTING.md](CONTRIBUTING.md) has the full checklist.

### Adding ideologies, countries, or personalities

Catalog entries are not written by hand. Each new profile answers all 240 questions, one by one, in character, and its vector is computed from those answers with the same formula a user gets. Follow [`profile-audit/NEW_PROFILE.md`](profile-audit/NEW_PROFILE.md) to add a profile, or [`profile-audit/README.md`](profile-audit/README.md) to re-audit an existing one, using the audit scripts in `profile-audit/`.

A new profile has to meet these requirements before it is merged:

- English and French metadata, with questions free of country-specific references.
- A full 240-answer audit, archived in `profile-audit/answers/`.
- `python profile-audit/validate.py <catalog> <id>` passes. It blocks vectors that are near duplicates of an existing profile, too many neutral answers, and a religious vector with no religion tag.
- Portraits and historical flags come from Wikimedia Commons, with their source recorded, and are compressed with `npm run optimize:images`.
- `mvn test` passes.


