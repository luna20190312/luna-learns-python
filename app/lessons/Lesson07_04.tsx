"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const shapes = { 正方形: { sides: 4, angle: 90 }, 三角形: { sides: 3, angle: 120 }, 六边形: { sides: 6, angle: 60 } } as const;
type ShapeName = keyof typeof shapes;

export default function Lesson07_04() {
  const [shape, setShape] = useState<ShapeName>("正方形");
  const current = shapes[shape];
  const code = useMemo(() => `from turtle import *\n\ndef draw_shape(size):\n    for side in range(${current.sides}):\n        forward(size)\n        left(${current.angle})\n\ndraw_shape(80)\npenup()\ngoto(-140, -80)\npendown()\ndraw_shape(40)`, [current]);
  return (
    <LessonFrame chapter="第 7 章 · 用代码画出一个世界" lesson="04" title="画笔也能听指令"
      lead="把绘图步骤放进函数，就得到一条自己的画笔指令。调用时只需要告诉它大小。"
      goal="绘图函数可以把重复使用的画法收起来。"
      closing="定义画法一次，就能在不同位置、用不同大小反复调用。">
      <section className="activity-card">
        <div className="activity-heading"><span>画笔指令</span><div><h2>选择要教给画笔的形状</h2><p>同一个 draw_shape(size) 可以被调用很多次。</p></div></div>
        <div className="drawing-function-lab">
          <div className="shape-preview"><div className={`css-polygon sides-${current.sides}`} /><div className={`css-polygon small sides-${current.sides}`} /></div>
          <div className="drawing-function-controls">{(Object.keys(shapes) as ShapeName[]).map((name) => <button className={shape === name ? "active" : ""} type="button" onClick={() => setShape(name)} key={name}>{name}</button>)}<code>def draw_shape(size):</code><code>draw_shape(80)</code><code>draw_shape(40)</code></div>
        </div>
      </section>
      <PythonPlayground key={code} turtle initialCode={code} title="调用自己的绘图函数" prompt="增加第三次 draw_shape()，给它一个新的大小。" />
    </LessonFrame>
  );
}
