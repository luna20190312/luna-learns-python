"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const starPoints = Array.from({ length: 28 }, (_, i) => ({ left: (i * 37 + 11) % 94, top: (i * 53 + 7) % 88, size: 12 + (i % 4) * 5 }));

export default function Lesson07_06() {
  const [count, setCount] = useState(14);
  const [moon, setMoon] = useState(true);
  const code = useMemo(() => `from turtle import *\nimport random\n\nbgcolor("midnightblue")\nspeed(0)\nhideturtle()\n\nfor star in range(${count}):\n    x = random.randint(-230, 230)\n    y = random.randint(-140, 140)\n    penup()\n    goto(x, y)\n    pendown()\n    dot(6, "gold")`, [count]);
  return (
    <LessonFrame chapter="第 7 章 · 用代码画出一个世界" lesson="06" title="设计自己的星空"
      lead="把位置、循环、函数和随机数组合起来，完成一幅每次都不完全相同的程序画。"
      goal="大作品也是许多小指令按顺序组合起来的。"
      closing="我能用已经学过的语法，设计一幅自己的代码作品。">
      <section className="activity-card">
        <div className="activity-heading"><span>本章作品</span><div><h2>布置自己的夜空</h2><p>调整星星数量，也可以决定月亮是否出现。</p></div></div>
        <div className="starry-lab">
          <div className="starry-sky">{moon && <span className="moon">☾</span>}{starPoints.slice(0, count).map((p, i) => <i style={{ left: `${p.left}%`, top: `${p.top}%`, fontSize: p.size }} key={i}>✦</i>)}</div>
          <div className="starry-controls"><label>星星：<strong>{count}</strong><input type="range" min="5" max="28" value={count} onChange={(e) => setCount(Number(e.target.value))} /></label><button type="button" onClick={() => setMoon((v) => !v)}>{moon ? "藏起月亮" : "放回月亮"}</button><code>for star in range({count})</code></div>
        </div>
      </section>
      <PythonPlayground key={code} turtle initialCode={code} title="运行自己的随机星空" prompt="改变星星数量、颜色和大小，创作独一无二的夜空。" />
    </LessonFrame>
  );
}
