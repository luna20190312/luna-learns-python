"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const text = "PYTHON";

export default function Lesson11_05() {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);
  const code = useMemo(() => `word = "PYTHON"\n\nprint(word[${start}:${end}])`, [end, start]);
  return (
    <LessonFrame chapter="高阶第 1 章 · 通往完整 Python" lesson="05" title="一次取出一段内容"
      lead="下标一次取一项，切片可以从起点开始，一直取到终点之前。"
      goal="内容[start:end] 会取出一段，包含 start，不包含 end。"
      closing="切片和 range() 一样：起点出现，终点不出现。">
      <section className="activity-card">
        <div className="activity-heading"><span>切片实验</span><div><h2>框选一段文字</h2><p>调整起点和终点，黄色字符就是切片结果。</p></div></div>
        <div className="slice-lab">
          <div className="slice-letters">{Array.from(text).map((letter, index) => <span className={index >= start && index < end ? "selected" : ""} key={letter}><small>{index}</small><strong>{letter}</strong></span>)}</div>
          <div className="slice-controls"><label>起点 {start}<input type="range" min="0" max="5" value={start} onChange={(e) => setStart(Math.min(Number(e.target.value), end - 1))} /></label><label>终点 {end}<input type="range" min="1" max="6" value={end} onChange={(e) => setEnd(Math.max(Number(e.target.value), start + 1))} /></label><code>word[{start}:{end}]</code><strong>{text.slice(start, end)}</strong></div>
        </div>
      </section>
      <PythonPlayground key={code} initialCode={code} title="用切片取出一段文字" prompt="试试 word[0:3] 和 word[3:6]。" />
    </LessonFrame>
  );
}
