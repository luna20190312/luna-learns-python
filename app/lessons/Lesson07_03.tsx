"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson07_03() {
  const [petals, setPetals] = useState(8);
  const turn = 360 / petals;
  const code = useMemo(() => `from turtle import *\n\ncolor("deeppink")\nspeed(0)\nfor petal in range(${petals}):\n    circle(55)\n    left(${turn})`, [petals, turn]);
  return (
    <LessonFrame chapter="第 7 章 · 用代码画出一个世界" lesson="03" title="制作旋转花朵"
      lead="把一个圆画很多次，每次稍微转一下，就会长出一朵代码花。"
      goal="重复图形并在每轮旋转，可以创造有规律的图案。"
      closing="循环负责重复，角度负责把每一瓣放到新位置。">
      <section className="activity-card">
        <div className="activity-heading"><span>花朵实验</span><div><h2>改变花瓣数量</h2><p>拖动滑块，看旋转角度和图案怎样变化。</p></div></div>
        <div className="flower-lab">
          <div className="code-flower">{Array.from({ length: petals }, (_, i) => <i style={{ transform: `rotate(${i * turn}deg) translateY(-58px)` }} key={i} />)}<span>●</span></div>
          <div className="flower-controls"><label>花瓣：<strong>{petals}</strong><input type="range" min="4" max="12" value={petals} onChange={(e) => setPetals(Number(e.target.value))} /></label><code>left({turn})</code><p>画一瓣 → 转 {turn}° → 再画一瓣</p></div>
        </div>
      </section>
      <PythonPlayground key={code} turtle initialCode={code} title="让 Turtle 画旋转花朵" prompt="修改花瓣数量，同时调整每次转动的角度。" />
    </LessonFrame>
  );
}
