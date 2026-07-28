"use client";

import { useState } from "react";

type LessonLink = {
  id: string;
  chapter: string;
  number: string;
  title: string;
};

type Quiz = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type CourseLessonFooterProps = {
  lessonId: string;
  completed: boolean;
  onToggleComplete: () => void;
  previous?: LessonLink;
  next?: LessonLink;
  onOpenLesson: (id: string) => void;
  parentTip: string;
  quiz?: Quiz;
};

export default function CourseLessonFooter({
  lessonId,
  completed,
  onToggleComplete,
  previous,
  next,
  onOpenLesson,
  parentTip,
  quiz,
}: CourseLessonFooterProps) {
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const quizCorrect = quizChoice === quiz?.answer;

  return (
    <div className="course-lesson-footer">
      {quiz && (
        <section className="chapter-quiz">
          <div className="chapter-quiz-heading">
            <span>章节小测验</span>
            <div>
              <h2>最后确认一下</h2>
              <p>{quiz.question}</p>
            </div>
          </div>
          <div className="chapter-quiz-options">
            {quiz.options.map((option, index) => (
              <button
                className={quizChoice === index ? "chosen" : ""}
                type="button"
                onClick={() => setQuizChoice(index)}
                key={option}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            ))}
          </div>
          {quizChoice !== null && (
            <p className={`chapter-quiz-result ${quizCorrect ? "correct" : ""}`}>
              <strong>{quizCorrect ? "答对了！" : "再想一想"}</strong>
              {quiz.explanation}
            </p>
          )}
        </section>
      )}

      <section className="parent-learning-tip">
        <span aria-hidden="true">👨‍👩‍👧</span>
        <div>
          <small>给陪学家长</small>
          <strong>{parentTip}</strong>
        </div>
      </section>

      <section className="lesson-completion">
        <div>
          <small>本课学习状态</small>
          <strong>{completed ? "已经完成，可以继续前进" : "完成互动和代码实验后再打勾"}</strong>
        </div>
        <button
          className={completed ? "completed" : ""}
          type="button"
          onClick={onToggleComplete}
          aria-pressed={completed}
        >
          {completed ? "✓ 已学会" : "标记为已学会"}
        </button>
      </section>

      <nav className="lesson-bottom-nav" aria-label="课程前后导航">
        <button
          type="button"
          disabled={!previous}
          onClick={() => previous && onOpenLesson(previous.id)}
        >
          <span>← 上一课</span>
          <strong>
            {previous
              ? `${previous.chapter} · ${previous.number} · ${previous.title}`
              : "已经是第一课"}
          </strong>
        </button>
        <button
          type="button"
          disabled={!next}
          onClick={() => next && onOpenLesson(next.id)}
        >
          <span>下一课 →</span>
          <strong>
            {next
              ? `${next.chapter} · ${next.number} · ${next.title}`
              : "已经完成全部课程"}
          </strong>
        </button>
      </nav>
      <span className="lesson-footer-id">课程编号 {lessonId}</span>
    </div>
  );
}
