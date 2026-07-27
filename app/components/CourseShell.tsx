"use client";

import { useEffect, useMemo, useState } from "react";
import CourseCover from "./CourseCover";
import Lesson00_01 from "../lessons/Lesson00_01";
import Lesson01_01 from "../lessons/Lesson01_01";
import Lesson01_02 from "../lessons/Lesson01_02";
import Lesson01_03 from "../lessons/Lesson01_03";
import Lesson01_04 from "../lessons/Lesson01_04";
import Lesson01_05 from "../lessons/Lesson01_05";
import Lesson01_06 from "../lessons/Lesson01_06";
import Lesson02_01 from "../lessons/Lesson02_01";
import Lesson02_02 from "../lessons/Lesson02_02";
import Lesson02_03 from "../lessons/Lesson02_03";
import Lesson02_04 from "../lessons/Lesson02_04";
import Lesson02_05 from "../lessons/Lesson02_05";
import Lesson02_06 from "../lessons/Lesson02_06";

type LessonEntry = {
  id: string;
  number: string;
  title: string;
  component: React.ComponentType;
  status: "ready" | "planned";
};

type ChapterEntry = {
  number: string;
  title: string;
  description: string;
  lessons: LessonEntry[];
};

const chapters: ChapterEntry[] = [
  {
    number: "第 0 章",
    title: "先看看能做什么",
    description: "不解释，先动手",
    lessons: [
      {
        id: "00-01",
        number: "第 1 课",
        title: "代码会做什么？",
        component: Lesson00_01,
        status: "ready",
      },
    ],
  },
  {
    number: "第 1 章",
    title: "给计算机准确的指令",
    description: "从最小语法开始",
    lessons: [
      {
        id: "01-01",
        number: "第 1 课",
        title: "代码是一行一行执行的",
        component: Lesson01_01,
        status: "ready",
      },
      {
        id: "01-02",
        number: "第 2 课",
        title: "一条指令由什么组成",
        component: Lesson01_02,
        status: "ready",
      },
      {
        id: "01-03",
        number: "第 3 课",
        title: "数字会计算",
        component: Lesson01_03,
        status: "ready",
      },
      {
        id: "01-04",
        number: "第 4 课",
        title: "文字也可以组合",
        component: Lesson01_04,
        status: "ready",
      },
      {
        id: "01-05",
        number: "第 5 课",
        title: "用变量记住东西",
        component: Lesson01_05,
        status: "ready",
      },
      {
        id: "01-06",
        number: "第 6 课",
        title: "制作角色状态卡",
        component: Lesson01_06,
        status: "ready",
      },
    ],
  },
  {
    number: "第 2 章",
    title: "让程序学会选择",
    description: "输入、比较与条件判断",
    lessons: [
      {
        id: "02-01",
        number: "第 1 课",
        title: "程序也会问问题",
        component: Lesson02_01,
        status: "ready",
      },
      {
        id: "02-02",
        number: "第 2 课",
        title: "这两个东西一样吗",
        component: Lesson02_02,
        status: "ready",
      },
      {
        id: "02-03",
        number: "第 3 课",
        title: "满足条件才行动",
        component: Lesson02_03,
        status: "ready",
      },
      {
        id: "02-04",
        number: "第 4 课",
        title: "两条不同的道路",
        component: Lesson02_04,
        status: "ready",
      },
      {
        id: "02-05",
        number: "第 5 课",
        title: "不止两种选择",
        component: Lesson02_05,
        status: "ready",
      },
      {
        id: "02-06",
        number: "第 6 课",
        title: "魔法门闯关",
        component: Lesson02_06,
        status: "ready",
      },
    ],
  },
];

const allLessons = chapters.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({ chapter, lesson })),
);

const progressStorageKey = "luna-learns-python:last-lesson";

export default function CourseShell() {
  const [activeId, setActiveId] = useState("cover");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastLessonId, setLastLessonId] = useState<string | null>(null);

  useEffect(() => {
    const readLessonFromUrl = () => {
      const requested = new URLSearchParams(window.location.search).get("lesson");
      if (requested && allLessons.some(({ lesson }) => lesson.id === requested)) {
        setActiveId(requested);
        setLastLessonId(requested);
        window.localStorage.setItem(progressStorageKey, requested);
      } else {
        setActiveId("cover");
      }
    };

    const savedLesson = window.localStorage.getItem(progressStorageKey);
    if (
      savedLesson &&
      allLessons.some(({ lesson }) => lesson.id === savedLesson)
    ) {
      setLastLessonId(savedLesson);
    }
    readLessonFromUrl();
    window.addEventListener("popstate", readLessonFromUrl);
    return () => window.removeEventListener("popstate", readLessonFromUrl);
  }, []);

  const active = useMemo(
    () => allLessons.find(({ lesson }) => lesson.id === activeId),
    [activeId],
  );
  const ActiveLesson = active?.lesson.component;
  const activeIndex = allLessons.findIndex(
    ({ lesson }) => lesson.id === activeId,
  );

  function openLesson(id: string) {
    setActiveId(id);
    setSidebarOpen(false);
    const url = new URL(window.location.href);
    if (id === "cover") {
      url.searchParams.delete("lesson");
    } else {
      url.searchParams.set("lesson", id);
      setLastLessonId(id);
      window.localStorage.setItem(progressStorageKey, id);
    }
    window.history.pushState({}, "", url);
    document.querySelector(".course-main")?.scrollTo({ top: 0 });
  }

  return (
    <div className="course-shell">
      <aside
        className={`course-sidebar ${sidebarOpen ? "is-open" : ""}`}
        aria-label="课程目录"
      >
        <div className="sidebar-brand">
          <span aria-hidden="true">{"{ }"}</span>
          <div>
            <strong>贝琪的代码实验室</strong>
            <small>Python 学习课件</small>
          </div>
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="关闭课程目录"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="course-progress">
          <div>
            <span>内容状态</span>
            <strong>
              {allLessons.filter(({ lesson }) => lesson.status === "ready").length} /{" "}
              {allLessons.length} 可学习
            </strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <i
              style={{
                width: `${
                  (allLessons.filter(({ lesson }) => lesson.status === "ready")
                    .length /
                    allLessons.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <nav className="course-tree">
          <button
            className={`cover-nav-link ${activeId === "cover" ? "active" : ""}`}
            aria-current={activeId === "cover" ? "page" : undefined}
            onClick={() => openLesson("cover")}
            type="button"
          >
            <span aria-hidden="true">⌂</span>
            <span>
              <small>课程首页</small>
              <strong>Luna Learns Python</strong>
            </span>
          </button>
          {chapters.map((chapter) => (
            <section className="chapter-group" key={chapter.number}>
              <header>
                <span>{chapter.number}</span>
                <h2>{chapter.title}</h2>
                <p>{chapter.description}</p>
              </header>
              <div className="lesson-links">
                {chapter.lessons.map((lesson) => {
                  const isActive = lesson.id === activeId;
                  return (
                    <button
                      className={isActive ? "active" : ""}
                      aria-current={isActive ? "page" : undefined}
                      key={lesson.id}
                      onClick={() => openLesson(lesson.id)}
                      type="button"
                    >
                      <span>{lesson.number.replace("第 ", "").replace(" 课", "")}</span>
                      <span className="lesson-link-copy">
                        <small>{lesson.number}</small>
                        <strong>{lesson.title}</strong>
                      </span>
                      <i
                        className={`lesson-state ${lesson.status}`}
                        aria-label={lesson.status === "ready" ? "可以学习" : "待制作"}
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        <footer className="sidebar-footer">
          <span>{active ? "当前课程" : "当前页面"}</span>
          <strong>{active?.lesson.title ?? "课程封面"}</strong>
        </footer>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-scrim"
          onClick={() => setSidebarOpen(false)}
          aria-label="关闭课程目录"
          type="button"
        />
      )}

      <main className="course-main">
        <header className="course-toolbar">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
            type="button"
          >
            <span aria-hidden="true">☰</span>
            课程目录
          </button>
          <div className="toolbar-path">
            {active ? (
              <>
                <span>{active.chapter.number}</span>
                <i aria-hidden="true">/</i>
                <strong>{active.lesson.number}</strong>
                <i aria-hidden="true">/</i>
                <span>{active.lesson.title}</span>
              </>
            ) : (
              <>
                <span>Luna Learns Python</span>
                <i aria-hidden="true">/</i>
                <strong>课程封面</strong>
              </>
            )}
          </div>
          <div className="toolbar-arrows">
            <button
              disabled={!active || activeIndex <= 0}
              onClick={() =>
                active && openLesson(allLessons[activeIndex - 1].lesson.id)
              }
              aria-label="上一课"
              type="button"
            >
              ←
            </button>
            <button
              disabled={active ? activeIndex >= allLessons.length - 1 : false}
              onClick={() =>
                openLesson(
                  active
                    ? allLessons[activeIndex + 1].lesson.id
                    : allLessons[0].lesson.id,
                )
              }
              aria-label="下一课"
              type="button"
            >
              →
            </button>
          </div>
        </header>

        <div className="course-content" key={active?.lesson.id ?? "cover"}>
          {ActiveLesson ? (
            <ActiveLesson />
          ) : (
            <CourseCover
              chapters={chapters.map(({ number, title, description }) => ({
                number,
                title,
                description,
              }))}
              onStart={() => openLesson(allLessons[0].lesson.id)}
              onContinue={
                lastLessonId ? () => openLesson(lastLessonId) : undefined
              }
              continueTitle={
                lastLessonId
                  ? allLessons.find(({ lesson }) => lesson.id === lastLessonId)
                      ?.lesson.title
                  : undefined
              }
              onOpenCatalog={() => setSidebarOpen(true)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
