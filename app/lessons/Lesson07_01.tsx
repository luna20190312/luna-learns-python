"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson07_01() {
  const [x, setX] = useState(40);
  const [y, setY] = useState(30);
  const code = useMemo(
    () => `from turtle import *\n\nshape("turtle")\ngoto(${x}, ${y})\ndot(12, "coral")`,
    [x, y],
  );
  return (
    <LessonFrame chapter="第 7 章 · 用代码画出一个世界" lesson="01" title="认识画布和坐标"
      lead="Turtle 的画布像一张方格地图。中间是 (0, 0)，左右改变 x，上下改变 y。"
      goal="goto(x, y) 会把小海龟移动到画布上的一个位置。"
      closing="x 决定左右，y 决定上下，(0, 0) 是画布中心。">
      <section className="activity-card">
        <div className="activity-heading"><span>坐标地图</span><div><h2>移动小海龟</h2><p>拖动两个滑块，观察位置和坐标一起变化。</p></div></div>
        <div className="coordinate-lab">
          <div className="coordinate-board">
            <i className="axis-x" /><i className="axis-y" />
            <span className="origin">0, 0</span>
            <div className="turtle-marker" style={{ left: `${50 + x / 4}%`, top: `${50 - y / 3}%` }}>🐢</div>
          </div>
          <div className="coordinate-controls">
            <label>x：<strong>{x}</strong><input type="range" min="-180" max="180" step="10" value={x} onChange={(e) => setX(Number(e.target.value))} /></label>
            <label>y：<strong>{y}</strong><input type="range" min="-120" max="120" step="10" value={y} onChange={(e) => setY(Number(e.target.value))} /></label>
            <code>goto({x}, {y})</code>
            <button type="button" onClick={() => { setX(0); setY(0); }}>回到中心</button>
          </div>
        </div>
      </section>
      <section className="coordinate-directions"><span>← x 变小</span><strong>(0, 0)</strong><span>x 变大 →</span><span>↓ y 变小</span><span>y 变大 ↑</span></section>
      <PythonPlayground key={code} turtle initialCode={code} title="让真正的 Turtle 移动" prompt="修改 goto() 里的两个数字，画出新的位置。" />
    </LessonFrame>
  );
}
