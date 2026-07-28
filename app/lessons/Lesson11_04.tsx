"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson11_04() {
  const [numbers, setNumbers] = useState([6, 3, 9]);
  const code = useMemo(() => `scores = [${numbers.join(", ")}]\n\nprint("最小：", min(scores))\nprint("最大：", max(scores))\nprint("总和：", sum(scores))\nprint("平均：", round(sum(scores) / len(scores), 1))`, [numbers]);
  return (
    <LessonFrame chapter="高阶第 1 章 · 通往完整 Python" lesson="04" title="Python 的常用小工具"
      lead="不用自己写循环也能找最小值、最大值和总和。Python 已经准备了一些常用工具。"
      goal="min()、max()、sum() 和 round() 可以完成常见的数字任务。"
      closing="先寻找 Python 已有的工具，再决定是否需要自己造一个。">
      <section className="activity-card">
        <div className="activity-heading"><span>数字工具箱</span><div><h2>调整三次游戏得分</h2><p>四个工具会立刻重新计算。</p></div></div>
        <div className="number-tools-lab">
          <div>{numbers.map((number, index) => <label key={index}>第 {index + 1} 次：{number}<input type="range" min="0" max="10" value={number} onChange={(e) => setNumbers((items) => items.map((v, i) => i === index ? Number(e.target.value) : v))} /></label>)}</div>
          <section><div><code>min()</code><strong>{Math.min(...numbers)}</strong></div><div><code>max()</code><strong>{Math.max(...numbers)}</strong></div><div><code>sum()</code><strong>{numbers.reduce((a, b) => a + b, 0)}</strong></div><div><code>round()</code><strong>{(numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1)}</strong></div></section>
        </div>
      </section>
      <PythonPlayground key={code} initialCode={code} title="使用常用数字工具" prompt="给 scores 增加一个数字，四个答案都会更新。" />
    </LessonFrame>
  );
}
