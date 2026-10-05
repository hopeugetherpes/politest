<div align="center">

# Politest

A political quiz that places you on twelve independent axes and compares your answers with +230 ideologies, +170 countries and regimes, and +390 political figures.

**[politest.anatole.co](https://politest.anatole.co)** · No Data collection · no sign-up

![Node.js](https://img.shields.io/badge/Node.js-22-339933) ![Vercel](https://img.shields.io/badge/Vercel-Functions-black) ![React](https://img.shields.io/badge/React-18-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6) ![CI](https://github.com/hopeugetherpes/politest/actions/workflows/ci.yml/badge.svg)

</div>

## Overview

Most political tests reduce you to a single point on a left-right line, or to a two-axis grid. Politest measures twelve dimensions separately, so someone who wants a free market and a strong state, or open borders and a religious society, sees that combination instead of an average that hides it.

The frontend and quiz API deploy together on Vercel. The integrated Node.js engine preserves the original matching algorithm and uses the same versioned JSON catalogs. The original Java engine remains in the repository as a reference for parity tests.

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
| API | Node.js 22, Vercel Functions, no third-party runtime dependencies |
| Reference engine | Java 21, Spring Boot 3.3, Maven (optional) |
| Frontend | React 18, TypeScript, Vite 8 |
| Data | Versioned JSON, loaded into memory at startup |
| Tests | Node.js test runner, Java reference fixtures, Vitest, JUnit 5 |
| CI | GitHub Actions (API parity, Java reference tests, catalog check, frontend tests and build) |
| Deploy | Frontend and API together on Vercel |

There is no database. The catalogs change through commits. Each function instance loads the JSON once, validates the catalog vectors, and scores requests in memory. Answers are used for computation and are not written to a database or logged by the application.

### Project data

All data lives in `backend/src/main/resources/data/`, in English.

| File | Contents |
|------|----------|
| `axes.json` | The 12 axes, their poles and labels |
| `questions-pool.json` | 240 questions, with axis, polarity, and weight |
| `archetype-questions.json` | The five multiple-choice questions |
| `ideologies.json` / `ideology-profiles.json` | Ideologies and their 12-axis vectors |
| `countries.json` / `countries-profiles.json` | Countries, regions, and historical regimes |
| `personalities.json` / `personality-profiles.json` | Political figures and intellectuals |
| `books.json` | Book recommendations |

The API refuses to start if any catalog entry lacks a valid vector for the 12 axes.

### Repository structure

```txt
Politest/
├── api/                     Vercel Function entry point
├── server/                  Integrated scoring, rankings, comparisons and API tests
├── backend/                 Canonical JSON catalogs and original Java reference
│   └── src/main/java/com/politest/
│       ├── config/          CORS, cache headers, origin enforcement
│       ├── controller/      REST endpoints
│       ├── model/           records and DTOs
│       └── service/         data loading, scoring, matchers, religion filter
├── frontend/                React + Vite app
│   ├── src/components/      home, quiz, results, report
│   ├── src/i18n/            English UI strings
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

### API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/quiz?variant=short\|extended\|extreme` | Quiz metadata and the question pool |
| `POST` | `/api/results` | Scores answers and returns axes and matches |
| `GET` | `/api/results/by-axes?v=...` | Rebuilds a result from 12 values, for shared links |
| `GET` | `/api/ideologies[/{id}]` | Ideology catalog |
| `GET` | `/api/countries[/{id}]` | Country catalog |
| `GET` | `/api/personalities[/{id}]` | Personality catalog |
| `GET` | `/api/compare/catalog` | Searchable profiles, with an optional religion filter |
| `GET` | `/api/compare?type=...&id=...&v=...` | Compare a result with a selected profile |

English is the only supported language. The optional `lang` parameter resolves to `en`, and result endpoints accept `religion` for the filter. The frontend calls `/api/**` on its own domain, so custom domains and Vercel previews work without CORS configuration. Result responses use `Cache-Control: no-store`.

<details>
<summary>Example request</summary>

```json
POST /api/results?lang=en
{
  "variant": "short",
  "answers": [
    { "questionId": "estrutura_01", "answer": "STRONGLY_AGREE" },
    { "questionId": "poder_03", "answer": "DISAGREE" }
  ]
}
```

`answer` is one of `STRONGLY_AGREE`, `AGREE`, `NEUTRAL`, `DISAGREE`, `STRONGLY_DISAGREE`.

</details>

### Running locally

You need Node.js 22 and npm. Java and a separate hosting account are not needed.

```bash
npm --prefix frontend ci
npm run api:dev                 # http://127.0.0.1:8080
```

In another terminal:

```bash
npm --prefix frontend run dev   # http://localhost:5173, proxies /api to the Node API
```

To preview the production build with its API on one origin:

```bash
npm run build
npm run preview                 # http://127.0.0.1:8080
```

`PORT` changes the local API/preview port. Leave `VITE_API_URL` empty for normal use:
the deployed frontend calls the API on the same domain. This variable remains available
only for maintainers deliberately using a separately hosted compatible API.

### Tests

```bash
npm run test:api                # complete responses compared with Java reference fixtures
npm --prefix frontend test     # frontend behavior and API error handling
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

**Import the repository root into Vercel. The frontend and quiz API deploy together.**
No Render account, Java server, database or API URL is required.

1. Import [this repository](https://github.com/hopeugetherpes/politest) into Vercel.
2. Keep **Root Directory** at the repository root and **Framework Preset** at **Other**.
   The root `vercel.json` supplies the install command, build command, output directory,
   API routing and catalog files bundled with the function.
3. Leave `VITE_API_URL` unset or empty. If an old value is present, remove it and redeploy.
4. Deploy, then connect your custom domain if desired. Short (36), Full (60) and Extreme
   (240) tests use `/api/quiz` and `/api/results` on that same domain.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhopeugetherpes%2Fpolitest&project-name=politest)

The deployment installs frontend dependencies, runs the production build, publishes
`frontend/dist` with all generated catalog pages, and bundles `api/handler.js` as a Node.js
function with the canonical JSON catalogs. It does not compile or launch Java.

Connect Vercel to this GitHub repository for automatic deployments on pushes. Use the
repository root, rather than `frontend`, so Vercel includes the API function. The retained
Java/Docker files are optional reference infrastructure and are not used by this deployment.

Every push and pull request runs `.github/workflows/ci.yml`.

## Contributing

Bug reports, corrections to profiles, and text fixes are welcome as issues or pull requests. Keep each pull request to one change, run the integrated API and frontend tests, and describe how you tested it. [CONTRIBUTING.md](CONTRIBUTING.md) has the full checklist.

### Adding ideologies, countries, or personalities

Catalog entries are not written by hand. Each new profile answers all 240 questions, one by one, in character, and its vector is computed from those answers with the same formula a user gets. Follow [`profile-audit/NEW_PROFILE.md`](profile-audit/NEW_PROFILE.md) to add a profile, or [`profile-audit/README.md`](profile-audit/README.md) to re-audit an existing one, using the audit scripts in `profile-audit/`.

A new profile has to meet these requirements before it is merged:

- English metadata, with questions free of country-specific references.
- A full 240-answer audit, archived in `profile-audit/answers/`.
- `python profile-audit/validate.py <catalog> <id>` passes. It blocks vectors that are near duplicates of an existing profile, too many neutral answers, and a religious vector with no religion tag.
- Portraits and historical flags come from Wikimedia Commons, with their source recorded, and are compressed with `npm run optimize:images`.
- `mvn test` passes.

### License

Politest is source-available but not open source. The code, questions, profiles, and vectors are © 2026 Enzo Xavier Santos, all rights reserved. You may read the code and send contributions, but copying, redistributing, translating, or using any part commercially needs written permission. See [LICENSE](LICENSE) for the full terms.

## Credit

Politest is a fork of [Enzo Xavier Santos's original project](https://github.com/RomanCypherpunk/12axes), adapted for this repository. The original author's copyright and license terms remain in [LICENSE](LICENSE).
