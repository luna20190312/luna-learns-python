"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson03_01() {
  const [manualCount, setManualCount] = useState(0);
  const finished = manualCount === 3;

  return (
    <LessonFrame
      chapter="第 3 章 · 让程序重复工作"
      lesson="01"
      title="重复说三遍"
      lead="计算机不会嫌同一件事做太多次。先亲手重复，再看看怎样把重复的工作交给它。"
      goal="一模一样的代码写了很多遍，通常说明它可以变成循环。"
      closing="发现重复，是想到循环的第一步。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>热身挑战</span>
          <div>
            <h2>请亲手喊三次“出发！”</h2>
            <p>每点一次，才会多出现一句。感受一下重复工作的麻烦。</p>
          </div>
        </div>
        <div className="manual-repeat-lab">
          <div className="repeat-worker">
            <span aria-hidden="true">{finished ? "😅" : "👆"}</span>
            <strong>{manualCount} / 3</strong>
            <button
              type="button"
              disabled={finished}
              onClick={() => setManualCount((value) => Math.min(3, value + 1))}
            >
              {finished ? "终于完成了" : "亲手喊一次"}
            </button>
            <button
              className="quiet-button"
              type="button"
              onClick={() => setManualCount(0)}
            >
              重新体验
            </button>
          </div>
          <div className="repeat-speech" aria-live="polite">
            {Array.from({ length: 3 }, (_, index) => (
              <p className={index < manualCount ? "visible" : ""} key={index}>
                {index < manualCount ? "出发！" : "等待第 " + (index + 1) + " 次"}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="loop-before-after">
        <div>
          <span>重复写三行</span>
          <code>print(&quot;出发！&quot;)</code>
          <code>print(&quot;出发！&quot;)</code>
          <code>print(&quot;出发！&quot;)</code>
        </div>
        <strong aria-hidden="true">→</strong>
        <div className="better">
          <span>把重复交给循环</span>
          <code>for turn in range(3):</code>
          <code className="indented">print(&quot;出发！&quot;)</code>
        </div>
      </section>

      <PythonPlayground
        initialCode={`print("出发！")\nprint("出发！")\nprint("出发！")`}
        title="先运行三行重复的代码"
        prompt="试着把“出发”换成自己的口号。下一课会把三行变成循环。"
      />
    </LessonFrame>
  );
}
