"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const shapeNames = { 3: "三角形", 4: "正方形", 5: "五边形", 6: "六边形" } as const;
type Sides = keyof typeof shapeNames;

export default function Lesson07_02() {
  const [sides, setSides] = useState<Sides>(4);
  const angle = 360 / sides;
  const code = useMemo(() => `from turtle import *\n\ncolor("royalblue")\nbegin_fill()\nfor side in range(${sides}):\n    forward(90)\n    left(${angle})\nend_fill()`, [angle, sides]);
  return (
    <LessonFrame chapter="第 7 章 · 用代码画出一个世界" lesson="02" title="画出彩色多边形"
      lead="画一条边，再转一点角度。重复同样的动作，小海龟就会回到起点。"
      goal="多边形每次转弯的角度是 360 ÷ 边数。"
      closing="边数决定循环次数，也决定每次转多少度。">
      <section className="activity-card">
        <div className="activity-heading"><span>形状工坊</span><div><h2>选择边数</h2><p>观察边数、循环次数和转弯角度怎样一起变化。</p></div></div>
        <div className="polygon-lab">
          <div className={`css-polygon sides-${sides}`}><span>{shapeNames[sides]}</span></div>
          <div className="polygon-controls">
            <div>{([3, 4, 5, 6] as Sides[]).map((n) => <button className={sides === n ? "active" : ""} type="button" onClick={() => setSides(n)} key={n}>{n} 条边</button>)}</div>
            <code>重复 {sides} 次</code><code>每次左转 {angle}°</code>
            <strong>{sides} × {angle}° = 360°</strong>
          </div>
        </div>
      </section>
      <PythonPlayground key={code} turtle initialCode={code} title="让 Turtle 画多边形" prompt="把边数改成 3、5 或 6，转弯角度也要一起修改。" />
    </LessonFrame>
  );
}
