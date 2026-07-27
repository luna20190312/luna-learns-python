import type { ReactNode } from "react";

type LessonFrameProps = {
  chapter?: string;
  lesson: string;
  title: string;
  lead: string;
  goal: string;
  children: ReactNode;
  closing: string;
};

export default function LessonFrame({
  chapter = "第 1 章 · 给计算机准确的指令",
  lesson,
  title,
  lead,
  goal,
  children,
  closing,
}: LessonFrameProps) {
  return (
    <article className="learning-lesson">
      <header className="learning-hero">
        <div className="learning-number">{lesson}</div>
        <div>
          <p className="kicker">{chapter}</p>
          <h1>{title}</h1>
          <p>{lead}</p>
        </div>
      </header>

      <div className="today-goal">
        <span>今天只发现一件事</span>
        <strong>{goal}</strong>
      </div>

      <div className="learning-flow">{children}</div>

      <footer className="lesson-closing">
        <span aria-hidden="true">✓</span>
        <div>
          <small>如果能说出这句话，今天就完成了</small>
          <strong>{closing}</strong>
        </div>
      </footer>
    </article>
  );
}
