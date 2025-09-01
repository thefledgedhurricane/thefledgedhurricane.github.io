'use client';

import { useMemo, useState } from 'react';
import type { QuizQuestion } from '@/lib/lms-data';
import { saveQuizScore } from '@/lib/lms-storage';

export default function Quiz({
  courseId,
  lessonId,
  questions,
  onPassed,
}: {
  courseId: string;
  lessonId: string;
  questions: QuizQuestion[];
  onPassed?: (score: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    let s = 0;
    for (const q of questions) {
      if (answers[q.id] === q.correctOptionId) s++;
    }
    return Math.round((s / questions.length) * 100);
  }, [submitted, answers, questions]);

  const handleSubmit = () => {
    setSubmitted(true);
    const computed = (() => {
      let s = 0;
      for (const q of questions) if (answers[q.id] === q.correctOptionId) s++;
      return Math.round((s / questions.length) * 100);
    })();
    saveQuizScore(courseId, lessonId, computed);
    if (computed >= 70 && onPassed) onPassed(computed);
  };

  return (
    <div className="mt-8 p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
      <h3 className="text-lg font-semibold mb-4">Quiz</h3>
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id}>
            <p className="font-medium mb-2">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt) => (
                <label key={opt.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.id}
                    checked={answers[q.id] === opt.id}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                    }
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>
            {submitted && (
              <div className="mt-2 text-sm">
                {answers[q.id] === q.correctOptionId ? (
                  <span className="text-green-600">Correct ✔</span>
                ) : (
                  <span className="text-red-600">Incorrect ✖</span>
                )}
                {q.explanation && (
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{q.explanation}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Soumettre
      </button>
      {submitted && (
        <div className="mt-4 font-medium">
          Score: <span className="text-blue-600">{score}%</span>
        </div>
      )}
    </div>
  );
}
