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
  language?: "zh" | "en";
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
  language = "zh",
}: CourseLessonFooterProps) {
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const quizCorrect = quizChoice === quiz?.answer;
  const en = language === "en";

  return (
    <div className="course-lesson-footer">
      {quiz && (
        <section className="chapter-quiz">
          <div className="chapter-quiz-heading">
            <span>{en ? "CHAPTER QUIZ" : "章节小测验"}</span>
            <div>
              <h2>{en ? "One last check" : "最后确认一下"}</h2>
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
              <strong>
                {quizCorrect
                  ? en
                    ? "Correct!"
                    : "答对了！"
                  : en
                    ? "Try again"
                    : "再想一想"}
              </strong>
              {quiz.explanation}
            </p>
          )}
        </section>
      )}

      <section className="parent-learning-tip">
        <span aria-hidden="true">👨‍👩‍👧</span>
        <div>
          <small>{en ? "FOR GROWN-UPS" : "给陪学家长"}</small>
          <strong>{parentTip}</strong>
        </div>
      </section>

      <section className="lesson-completion">
        <div>
          <small>{en ? "LESSON STATUS" : "本课学习状态"}</small>
          <strong>
            {completed
              ? en
                ? "Completed — ready to move on"
                : "已经完成，可以继续前进"
              : en
                ? "Finish the activities before checking this lesson"
                : "完成互动和代码实验后再打勾"}
          </strong>
        </div>
        <button
          className={completed ? "completed" : ""}
          type="button"
          onClick={onToggleComplete}
          aria-pressed={completed}
        >
          {completed
            ? en
              ? "✓ Learned"
              : "✓ 已学会"
            : en
              ? "Mark as learned"
              : "标记为已学会"}
        </button>
      </section>

      <nav className="lesson-bottom-nav" aria-label="课程前后导航">
        <button
          className="lesson-nav-previous"
          type="button"
          disabled={!previous}
          onClick={() => previous && onOpenLesson(previous.id)}
        >
          <span className="lesson-nav-direction">
            <i aria-hidden="true">←</i> {en ? "Previous" : "上一课"}
          </span>
          <strong>
            {previous
              ? `${previous.chapter} · ${previous.number} · ${previous.title}`
              : en
                ? "This is the first lesson"
                : "已经是第一课"}
          </strong>
        </button>
        <button
          className="lesson-nav-next"
          type="button"
          disabled={!next}
          onClick={() => next && onOpenLesson(next.id)}
        >
          <span className="lesson-nav-direction">
            {en ? "Next" : "下一课"} <i aria-hidden="true">→</i>
          </span>
          <strong>
            {next
              ? `${next.chapter} · ${next.number} · ${next.title}`
              : en
                ? "All lessons completed"
                : "已经完成全部课程"}
          </strong>
        </button>
      </nav>
      <span className="lesson-footer-id">
        {en ? "Lesson ID" : "课程编号"} {lessonId}
      </span>
    </div>
  );
}
