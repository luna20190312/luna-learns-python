"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const targetHeight = 4;

export default function Lesson03_05() {
  const [height, setHeight] = useState(0);
  const grown = height >= targetHeight;

  return (
    <LessonFrame
      chapter="第 3 章 · 让程序重复工作"
      lesson="05"
      title="不知道次数怎么办"
      lead="有时我们不知道一件事要做几次，只知道什么时候应该停。while 正适合这样的任务。"
      goal="只要 while 后面的条件还是 True，缩进里的代码就会继续重复。"
      closing="for 常用在知道次数时，while 常用在知道停止条件时。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>生长实验</span>
          <div>
            <h2>浇水，直到花开</h2>
            <p>每次浇水后都检查一次：高度还小于 4 吗？</p>
          </div>
        </div>
        <div className="while-garden">
          <div className="garden-scene">
            <div
              className="plant"
              style={{ "--plant-height": `${42 + height * 34}px` } as CSSProperties}
            >
              <span>{grown ? "🌻" : height > 1 ? "🌿" : "🌱"}</span>
            </div>
            <div className="soil" />
            <strong>当前高度：{height}</strong>
          </div>
          <div className="while-checker">
            <code>while height &lt; 4:</code>
            <div className={grown ? "condition false" : "condition true"}>
              <span>{height} &lt; 4</span>
              <strong>{grown ? "False · 停止" : "True · 继续"}</strong>
            </div>
            <button
              type="button"
              disabled={grown}
              onClick={() => setHeight((value) => Math.min(targetHeight, value + 1))}
            >
              {grown ? "花已经开了" : "💧 浇一次水"}
            </button>
            <button className="quiet-button" type="button" onClick={() => setHeight(0)}>
              重新种一棵
            </button>
          </div>
        </div>
      </section>

      <section className="notice-strip warning">
        <b>小心无限循环</b>
        <p>
          循环里必须让条件有机会变成 <code>False</code>。如果高度永远不增加，程序就会一直浇水。
        </p>
      </section>

      <PythonPlayground
        initialCode={`height = 0\n\nwhile height < 4:\n    height = height + 1\n    print("浇水后，高度是", height)\n\nprint("花开了！")`}
        title="让 Python 自动浇水"
        prompt="把目标高度 4 改大，再看看循环会执行几次。"
      />
    </LessonFrame>
  );
}
