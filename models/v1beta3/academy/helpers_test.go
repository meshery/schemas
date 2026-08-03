package academy

import (
	"encoding/json"
	"testing"
)

func TestQuizTimeLimitUnmarshalJSON(t *testing.T) {
	cases := []struct {
		name string
		in   string
		want QuizTimeLimit
	}{
		// The shape academy-theme emits today.
		{"number", `25`, 25},
		{"number zero", `0`, 0},
		// The shape persisted by earlier revisions.
		{"numeric string", `"25"`, 25},
		{"zero string", `"0"`, 0},
		{"padded string", `" 30 "`, 30},
		// Sentinels and junk all mean "no time limit" rather than an error.
		{"infinite sentinel", `"infinite"`, 0},
		{"empty string", `""`, 0},
		{"unparseable string", `"abc"`, 0},
		{"negative number", `-5`, 0},
		{"negative string", `"-5"`, 0},
		{"null", `null`, 0},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			var got QuizTimeLimit
			if err := json.Unmarshal([]byte(tc.in), &got); err != nil {
				t.Fatalf("Unmarshal(%s) returned error: %v", tc.in, err)
			}
			if got != tc.want {
				t.Fatalf("Unmarshal(%s) = %d, want %d", tc.in, got, tc.want)
			}
		})
	}
}

// A quiz whose time limit arrives as a number and one whose time limit arrives
// as a string must both decode; this is the pair that no plain scalar handles.
func TestQuizTimeLimitDecodesBothProductionEras(t *testing.T) {
	for _, payload := range []string{
		`{"timeLimit":25}`,
		`{"timeLimit":"25"}`,
		`{"timeLimit":"infinite"}`,
	} {
		var quiz struct {
			TimeLimit QuizTimeLimit `json:"timeLimit"`
		}
		if err := json.Unmarshal([]byte(payload), &quiz); err != nil {
			t.Fatalf("Unmarshal(%s) returned error: %v", payload, err)
		}
	}
}

func TestQuizTimeLimitMarshalJSONNormalizesToNumber(t *testing.T) {
	var limit QuizTimeLimit
	if err := json.Unmarshal([]byte(`"25"`), &limit); err != nil {
		t.Fatalf("Unmarshal returned error: %v", err)
	}

	encoded, err := json.Marshal(limit)
	if err != nil {
		t.Fatalf("Marshal returned error: %v", err)
	}
	if string(encoded) != `25` {
		t.Fatalf("Marshal = %s, want 25", encoded)
	}
}

func TestQuizTimeLimitAccessors(t *testing.T) {
	if got := QuizTimeLimit(30).Minutes(); got != 30 {
		t.Fatalf("Minutes() = %d, want 30", got)
	}
	if QuizTimeLimit(30).IsUnlimited() {
		t.Fatal("IsUnlimited() = true for a 30 minute limit, want false")
	}
	if !QuizTimeLimit(0).IsUnlimited() {
		t.Fatal("IsUnlimited() = false for 0, want true")
	}
}

// The two payloads below are the exact shapes that took production down:
//
//	uuid: incorrect UUID length 24 in string "corporate-sustainability"
//	uuid: incorrect UUID length 2 in string "q1"
//
// Both decode into the canonical models now; before this fix each aborted the
// whole response, so a single legacy record disabled an entire endpoint.
func TestHistoricalSlugQuizDecodes(t *testing.T) {
	payload := []byte(`{
	  "id": "corporate-sustainability",
	  "orgId": "d011fd20-a3f5-4480-883b-dfb34321d168",
	  "title": "Test", "description": "d", "slug": "s",
	  "relPermalink": "/x/", "permalink": "http://h/x/", "type": "test",
	  "section": "sec", "layout": "l", "date": "2024-01-01", "lastmod": "2024-01-01",
	  "draft": false, "final": true, "filePath": "f.md",
	  "passPercentage": 70, "timeLimit": "infinite", "maxAttempts": 0,
	  "totalQuestions": 1, "totalQuestionsInBank": 1, "totalQuestionSets": 1, "totalMarks": 2,
	  "questions": [{"id":"q1","text":"t","type":"single-answer","marks":2,
	    "options":[{"id":"a","text":"True","isCorrect":true}],"correctAnswer":"a"}],
	  "prerequisites": [{"id":"introduction","title":"I","relPermalink":"/i/","type":"test"}],
	  "parent": {"id":"sre","title":"S","relPermalink":"/s/","type":"module"},
	  "nextPage": {"id":"/academy/next/","title":"N","relPermalink":"/n/","type":"test"}
	}`)

	var quiz Quiz
	if err := json.Unmarshal(payload, &quiz); err != nil {
		t.Fatalf("historical quiz failed to decode: %v", err)
	}
	if quiz.ID != "corporate-sustainability" {
		t.Fatalf("ID = %q, want corporate-sustainability", quiz.ID)
	}
	if !quiz.TimeLimit.IsUnlimited() {
		t.Fatalf("TimeLimit = %d, want unlimited", quiz.TimeLimit)
	}
	if quiz.Questions[0].ID != "q1" {
		t.Fatalf("question ID = %q, want q1", quiz.Questions[0].ID)
	}
	if quiz.Questions[0].Options[0].ID != "a" {
		t.Fatalf("option ID = %q, want a", quiz.Questions[0].Options[0].ID)
	}
	if quiz.Parent.ID != "sre" {
		t.Fatalf("parent ID = %q, want sre", quiz.Parent.ID)
	}
	if quiz.Prerequisites[0].ID != "introduction" {
		t.Fatalf("prerequisite ID = %q, want introduction", quiz.Prerequisites[0].ID)
	}
}

// A quiz built by the current academy-theme carries a numeric time limit and
// derived-UUID ids; it must keep decoding.
func TestCurrentBuiltQuizStillDecodes(t *testing.T) {
	payload := []byte(`{
	  "id": "cf0d4693-a408-57db-a716-94bd84241aac",
	  "orgId": "d011fd20-a3f5-4480-883b-dfb34321d168",
	  "title": "Test", "description": "d", "slug": "s",
	  "relPermalink": "/x/", "permalink": "http://h/x/", "type": "test",
	  "section": "sec", "layout": "l", "date": "2024-01-01", "lastmod": "2024-01-01",
	  "draft": false, "final": true, "filePath": "f.md",
	  "passPercentage": 70, "timeLimit": 25, "maxAttempts": 0,
	  "totalQuestions": 1, "totalQuestionsInBank": 1, "totalQuestionSets": 1, "totalMarks": 2,
	  "questions": [{"id":"4c18de02-5977-545b-8c16-22673857dde9","text":"t",
	    "type":"single-answer","marks":2,
	    "options":[{"id":"8138ddf2-57bf-5c37-8a18-d9102026e370","text":"True","isCorrect":true}],
	    "correctAnswer":"8138ddf2-57bf-5c37-8a18-d9102026e370"}],
	  "prerequisites": [], "nextPage": {"id":"n","title":"N","relPermalink":"/n/","type":"test"}
	}`)

	var quiz Quiz
	if err := json.Unmarshal(payload, &quiz); err != nil {
		t.Fatalf("current built quiz failed to decode: %v", err)
	}
	if quiz.TimeLimit.Minutes() != 25 {
		t.Fatalf("TimeLimit = %d, want 25", quiz.TimeLimit.Minutes())
	}
}

// The submission payload behind `uuid: incorrect UUID length 2 in string "q1"`.
func TestHistoricalSubmissionDecodes(t *testing.T) {
	payload := []byte(`{
	  "quizAbsPath": "/a/b/index.json",
	  "registrationId": "550e8400-e29b-41d4-a716-446655440000",
	  "testSessionId": "550e8400-e29b-41d4-a716-446655440001",
	  "userId": "550e8400-e29b-41d4-a716-446655440002",
	  "answers": [{"questionId":"q1","selectedOptionId":{"a":true},"answerText":""}]
	}`)

	var submission QuizSubmission
	if err := json.Unmarshal(payload, &submission); err != nil {
		t.Fatalf("historical submission failed to decode: %v", err)
	}
	if submission.Answers[0].QuestionId != "q1" {
		t.Fatalf("questionId = %q, want q1", submission.Answers[0].QuestionId)
	}
}
