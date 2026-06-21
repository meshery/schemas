package academy

import (
	"encoding/json"
	"testing"

	"github.com/gofrs/uuid"
)

func TestQuizUnmarshalJSON_LegacyHugoQuiz(t *testing.T) {
	const legacyQuizJSON = `{
		"id": "11111111-1111-1111-1111-111111111111",
		"title": "Intro Quiz",
		"org_id": "22222222-2222-2222-2222-222222222222",
		"description": "Legacy Hugo quiz payload",
		"slug": "intro-quiz",
		"relPermalink": "/academy/tests/intro-quiz/",
		"permalink": "https://academy.meshery.io/academy/tests/intro-quiz/",
		"type": "test",
		"section": "test",
		"layout": "single",
		"date": "2026-05-07",
		"final": true,
		"lastmod": "2026-05-07",
		"draft": false,
		"file_path": "academy/intro-quiz/index.json",
		"pass_percentage": 70,
		"time_limit": "&#34;15&#34;",
		"max_attempts": 3,
		"questions": [
			{
				"id": "q1",
				"text": "What keyword defines a function in Go?",
				"type": "multiple_answers",
				"marks": 2,
				"options": [
					{"id": "a", "text": "func", "is_correct": true},
					{"id": "b", "text": "def", "is_correct": false}
				],
				"correct_answer": "a"
			},
			{
				"id": "q2",
				"text": "Go is statically typed.",
				"type": "short_answer",
				"marks": 2,
				"options": [
					{"id": "a", "text": "true", "is_correct": true}
				],
				"correct_answer": "true"
			}
		],
		"total_questions": 2,
		"total_questions_in_bank": 2,
		"total_question_sets": 1,
		"total_marks": 4,
		"prerequisites": [
			{"id": "creating-designs", "title": "Creating Designs", "relPermalink": "/academy/modules/creating-designs/", "type": "module"}
		],
		"parent": {"id": "creating-designs", "title": "Creating Designs", "relPermalink": "/academy/modules/creating-designs/", "type": "module"},
		"next_page": {}
	}`

	var quiz Quiz
	if err := json.Unmarshal([]byte(legacyQuizJSON), &quiz); err != nil {
		t.Fatalf("legacy Hugo quiz should unmarshal into canonical Quiz, got: %v", err)
	}

	if quiz.ID.String() != "11111111-1111-1111-1111-111111111111" {
		t.Fatalf("expected canonical quiz ID to be preserved, got %s", quiz.ID)
	}
	if quiz.OrgId.String() != "22222222-2222-2222-2222-222222222222" {
		t.Fatalf("expected canonical org ID to be preserved, got %s", quiz.OrgId)
	}
	if quiz.FilePath != "academy/intro-quiz/index.json" {
		t.Fatalf("expected filePath to map from file_path, got %q", quiz.FilePath)
	}
	if quiz.TimeLimit != 15 {
		t.Fatalf("expected string time_limit to normalize to 15, got %d", quiz.TimeLimit)
	}
	if quiz.Questions[0].Type != QuestionTypeMultipleAnswers {
		t.Fatalf("expected question type to normalize underscores to hyphens, got %q", quiz.Questions[0].Type)
	}
	if quiz.Questions[0].MultipleAnswers == nil || !*quiz.Questions[0].MultipleAnswers {
		t.Fatalf("expected multipleAnswers to be inferred for multiple-answers questions")
	}
	if quiz.Questions[0].CorrectAnswer != "a" {
		t.Fatalf("expected correct_answer to map to correctAnswer, got %q", quiz.Questions[0].CorrectAnswer)
	}
	if !quiz.Questions[0].Options[0].IsCorrect {
		t.Fatalf("expected is_correct to map to isCorrect")
	}
	if quiz.Questions[0].ID == uuid.Nil || quiz.Questions[1].ID == uuid.Nil {
		t.Fatalf("expected legacy question IDs to derive deterministic UUIDs")
	}
	if quiz.Questions[0].ID == quiz.Questions[1].ID {
		t.Fatalf("expected distinct derived UUIDs for distinct questions")
	}
	if quiz.Questions[0].Options[0].ID == uuid.Nil || quiz.Questions[1].Options[0].ID == uuid.Nil {
		t.Fatalf("expected legacy option IDs to derive deterministic UUIDs")
	}
	if quiz.Questions[0].Options[0].ID == quiz.Questions[1].Options[0].ID {
		t.Fatalf("expected option UUID derivation to include question scope")
	}
	if quiz.Parent == nil {
		t.Fatalf("expected legacy parent to map to canonical parent")
	}
	if quiz.Parent.ID == uuid.Nil {
		t.Fatalf("expected legacy parent ID to derive a UUID")
	}
	// Golden-value anchor: the parent ID is derived via NewV5(NamespaceURL, ...).
	// gofrs NewV5 is byte-identical to the prior google NewSHA1 for the same
	// namespace and inputs, so existing academy content IDs MUST NOT change.
	// If this value drifts, the derivation (library, namespace, input order, or
	// separator) regressed and persisted academy IDs would be orphaned.
	if quiz.Parent.ID.String() != "74e323bb-c345-5031-98b1-9f29e6f8adda" {
		t.Fatalf("derived parent UUID changed; academy content IDs would break: got %s", quiz.Parent.ID)
	}
	if quiz.NextPage != (Parent{}) {
		t.Fatalf("expected empty legacy next_page object to remain zero-valued, got %+v", quiz.NextPage)
	}

	var second Quiz
	if err := json.Unmarshal([]byte(legacyQuizJSON), &second); err != nil {
		t.Fatalf("legacy Hugo quiz should unmarshal consistently, got: %v", err)
	}
	if quiz.Parent.ID != second.Parent.ID || quiz.Questions[0].ID != second.Questions[0].ID {
		t.Fatalf("expected deterministic UUID derivation across repeated decodes")
	}
}

func TestHugoQuizToCanonical_PreservesValidNestedUUIDs(t *testing.T) {
	const canonicalNestedID = "33333333-3333-3333-3333-333333333333"
	const canonicalOptionID = "44444444-4444-4444-4444-444444444444"

	hugo := HugoQuiz{
		ID:             "11111111-1111-1111-1111-111111111111",
		OrgID:          "22222222-2222-2222-2222-222222222222",
		Title:          "Quiz",
		Description:    "Legacy quiz",
		Slug:           "quiz",
		RelPermalink:   "/academy/tests/quiz/",
		Permalink:      "https://academy.meshery.io/academy/tests/quiz/",
		Type:           "test",
		Section:        "test",
		Layout:         "single",
		FilePathLegacy: "academy/quiz/index.json",
		Questions: []HugoQuestion{
			{
				ID:            canonicalNestedID,
				Text:          "Question",
				Type:          "single-answer",
				Marks:         1,
				Options:       []HugoQuestionOption{{ID: canonicalOptionID, Text: "Option", IsCorrect: true}},
				CorrectAnswer: "option",
			},
		},
	}

	quiz, err := hugo.ToCanonical()
	if err != nil {
		t.Fatalf("expected valid UUID-based HugoQuiz to convert, got: %v", err)
	}

	if quiz.Questions[0].ID.String() != canonicalNestedID {
		t.Fatalf("expected valid nested UUID to be preserved, got %s", quiz.Questions[0].ID)
	}
	if quiz.Questions[0].Options[0].ID.String() != canonicalOptionID {
		t.Fatalf("expected valid option UUID to be preserved, got %s", quiz.Questions[0].Options[0].ID)
	}
}

func TestHugoQuizToCanonical_DerivesSlugTopLevelQuizID(t *testing.T) {
	hugo := HugoQuiz{
		ID:             "intro-quiz",
		OrgID:          "22222222-2222-2222-2222-222222222222",
		Title:          "Intro Quiz",
		Description:    "Legacy quiz",
		Slug:           "intro-quiz",
		RelPermalink:   "/academy/tests/intro-quiz/",
		Permalink:      "https://academy.meshery.io/academy/tests/intro-quiz/",
		Type:           "test",
		Section:        "test",
		Layout:         "single",
		FilePathLegacy: " academy/intro-quiz/index.json ",
	}

	first, err := hugo.ToCanonical()
	if err != nil {
		t.Fatalf("expected slug-based top-level quiz id to convert, got: %v", err)
	}
	second, err := hugo.ToCanonical()
	if err != nil {
		t.Fatalf("expected slug-based top-level quiz id to convert repeatedly, got: %v", err)
	}

	if first.ID == uuid.Nil {
		t.Fatalf("expected derived top-level quiz UUID")
	}
	if first.ID != second.ID {
		t.Fatalf("expected deterministic derived top-level quiz UUID, got %s and %s", first.ID, second.ID)
	}
}

func TestQuizUnmarshalJSON_CanonicalQuizPassthrough(t *testing.T) {
	const canonicalQuizJSON = `{
		"id": "11111111-1111-1111-1111-111111111111",
		"title": "Canonical Quiz",
		"org_id": "22222222-2222-2222-2222-222222222222",
		"description": "Canonical quiz payload",
		"slug": "canonical-quiz",
		"relPermalink": "/academy/tests/canonical-quiz/",
		"permalink": "https://academy.meshery.io/academy/tests/canonical-quiz/",
		"type": "test",
		"section": "test",
		"layout": "single",
		"date": "2026-05-07",
		"final": false,
		"lastmod": "2026-05-07",
		"draft": false,
		"filePath": "academy/canonical-quiz/index.json",
		"passPercentage": 80,
		"timeLimit": 30,
		"maxAttempts": 2,
		"questions": [
			{
				"id": "33333333-3333-3333-3333-333333333333",
				"text": "Question",
				"type": "single-answer",
				"marks": 1,
				"options": [{"id": "44444444-4444-4444-4444-444444444444", "text": "Option", "isCorrect": true}],
				"correctAnswer": "Option"
			}
		],
		"totalQuestions": 1,
		"totalQuestionsInBank": 1,
		"totalQuestionSets": 1,
		"totalMarks": 1,
		"prerequisites": [],
		"nextPage": {"id": "55555555-5555-5555-5555-555555555555", "title": "Next", "relPermalink": "/academy/tests/next/", "type": "test"}
	}`

	var quiz Quiz
	if err := json.Unmarshal([]byte(canonicalQuizJSON), &quiz); err != nil {
		t.Fatalf("canonical Quiz JSON should continue to unmarshal, got: %v", err)
	}

	if quiz.FilePath != "academy/canonical-quiz/index.json" {
		t.Fatalf("expected canonical filePath to be preserved, got %q", quiz.FilePath)
	}
	if quiz.TimeLimit != 30 {
		t.Fatalf("expected canonical timeLimit to be preserved, got %d", quiz.TimeLimit)
	}
	if quiz.Questions[0].ID.String() != "33333333-3333-3333-3333-333333333333" {
		t.Fatalf("expected canonical nested UUID to be preserved, got %s", quiz.Questions[0].ID)
	}
	if quiz.NextPage.ID.String() != "55555555-5555-5555-5555-555555555555" {
		t.Fatalf("expected canonical nextPage UUID to be preserved, got %s", quiz.NextPage.ID)
	}
}

func TestQuizUnmarshalJSON_CanonicalFieldsWithSlugNestedIDsFallsBackToLegacyCompatibility(t *testing.T) {
	const canonicalMixedQuizJSON = `{
		"id": "11111111-1111-1111-1111-111111111111",
		"title": "Canonical Mixed Quiz",
		"org_id": " 22222222-2222-2222-2222-222222222222 ",
		"description": "Canonical quiz fields with legacy nested IDs",
		"slug": "canonical-mixed-quiz",
		"relPermalink": "/academy/tests/canonical-mixed-quiz/",
		"permalink": "https://academy.meshery.io/academy/tests/canonical-mixed-quiz/",
		"type": "test",
		"section": "test",
		"layout": "single",
		"date": "2026-05-07",
		"final": false,
		"lastmod": "2026-05-07",
		"draft": false,
		"filePath": " academy/canonical-mixed-quiz/index.json ",
		"passPercentage": 80,
		"timeLimit": 30,
		"maxAttempts": 2,
		"questions": [
			{
				"id": " q1 ",
				"text": "Question",
				"type": "multiple_answers",
				"marks": 1,
				"options": [{"id": " a ", "text": "Option", "isCorrect": true}],
				"correctAnswer": "Option"
			}
		],
		"totalQuestions": 1,
		"totalQuestionsInBank": 1,
		"totalQuestionSets": 1,
		"totalMarks": 1,
		"prerequisites": [],
		"nextPage": {"id": "next-page", "title": "Next", "relPermalink": "/academy/tests/next/", "type": "test"}
	}`

	var quiz Quiz
	if err := json.Unmarshal([]byte(canonicalMixedQuizJSON), &quiz); err != nil {
		t.Fatalf("canonical-field payload with slug nested IDs should fall back to legacy compatibility, got: %v", err)
	}

	if quiz.FilePath != "academy/canonical-mixed-quiz/index.json" {
		t.Fatalf("expected canonical filePath to be normalized, got %q", quiz.FilePath)
	}
	if quiz.Questions[0].ID == uuid.Nil {
		t.Fatalf("expected slug-based question id to derive a UUID")
	}
	if quiz.Questions[0].Options[0].ID == uuid.Nil {
		t.Fatalf("expected slug-based option id to derive a UUID")
	}
	if quiz.NextPage.ID == uuid.Nil {
		t.Fatalf("expected slug-based nextPage id to derive a UUID")
	}
	if quiz.Questions[0].Type != QuestionTypeMultipleAnswers {
		t.Fatalf("expected underscore question type to normalize during compatibility fallback, got %q", quiz.Questions[0].Type)
	}
}
