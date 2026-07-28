"use client";

import { useEffect, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson03_04() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (count === null || count === 0) return;
    const timer = window.setTimeout(() => {
      setCount((value) => (value === null ? null : value - 1));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [count]);

  const launched = count === 0;

  return (
    <LessonFrame
      chapter="第 3 章 · 让程序重复工作"
      lesson="04"
      title="倒计时开始"
      lead="range() 不只能向前走。给它一个负数步长，数字就会一步一步往回走。"
      goal="range(5, 0, -1) 从 5 开始，每次减 1，在到达 0 之前停下。"
      closing="range 的第三个数字决定每一步怎样变化。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>发射任务</span>
          <div>
            <h2>启动火箭倒计时</h2>
            <p>点击按钮，观察数字每一轮减少 1。</p>
          </div>
        </div>
        <div className={`countdown-lab ${launched ? "launched" : ""}`}>
          <div className="countdown-sky">
            <span className="countdown-number">
              {count === null ? "?" : launched ? "🚀" : count}
            </span>
            <div className="rocket" aria-hidden="true">🚀</div>
            <strong>
              {count === null
                ? "等待发射"
                : launched
                  ? "发射成功！"
                  : "还有 " + count + " 秒"}
            </strong>
          </div>
          <div className="countdown-control">
            <code>range(5, 0, -1)</code>
            <div className="countdown-track">
              {[5, 4, 3, 2, 1].map((number) => (
                <span
                  className={
                    count !== null && (launched || number >= count) ? "passed" : ""
                  }
                  key={number}
                >
                  {number}
                </span>
              ))}
            </div>
            <button type="button" onClick={() => setCount(5)}>
              {count === null ? "开始倒计时" : "重新发射"}
            </button>
          </div>
        </div>
      </section>

      <section className="range-parts">
        <div><strong>5</strong><span>从哪里开始</span></div>
        <div><strong>0</strong><span>到哪里之前停</span></div>
        <div><strong>-1</strong><span>每轮减少多少</span></div>
      </section>

      <PythonPlayground
        initialCode={`for second in range(5, 0, -1):\n    print(second)\n\nprint("发射！")`}
        title="运行真正的火箭倒计时"
        prompt="试着从 10 开始，或者改成每次减少 2。"
      />
    </LessonFrame>
  );
}
