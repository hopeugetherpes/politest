"""Validate the English source catalogs and their remaining text maps."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "backend/src/main/resources/data"
CATALOGS = {
    "axes": ("label", "leftPole", "rightPole"),
    "questions-pool": ("text",),
    "ideologies": ("name", "category", "description", "phrase"),
    "countries": ("name", "category", "description"),
    "personalities": ("name", "role", "description"),
}


def read_items(name, key="id"):
    items = json.loads((ROOT / f"{name}.json").read_text(encoding="utf-8"))
    ids = [item[key] for item in items]
    if len(ids) != len(set(ids)):
        raise ValueError(f"Duplicate IDs in {name}.json")
    return items


def english_text(value, label, allow_blank=False):
    if not isinstance(value, dict) or set(value) != {"en"}:
        errors.append(f"{label}: expected an English text map")
    elif not isinstance(value["en"], str) or (not allow_blank and not value["en"].strip()):
        errors.append(f"{label}: missing English text")


errors = []
for name, fields in CATALOGS.items():
    for item in read_items(name):
        for field in fields:
            if not isinstance(item.get(field), str) or not item[field].strip():
                errors.append(f"{name}/{item['id']}: missing {field}")

for question in read_items("archetype-questions"):
    for field in ("label", "text"):
        english_text(question.get(field), f"archetype/{question['id']}/{field}")
    for option in question["options"]:
        english_text(option.get("text"), f"archetype/{question['id']}/{option['id']}")

for book in read_items("books", "personalityId"):
    english_text(book.get("title"), f"books/{book['personalityId']}/title")
    english_text(book.get("url"), f"books/{book['personalityId']}/url", allow_blank=True)

if errors:
    raise SystemExit("\n".join(errors))
print("English source catalogs and text maps are valid.")
