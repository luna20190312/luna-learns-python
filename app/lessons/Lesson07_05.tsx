"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

type Point = { x: number; y: number };

export default function Lesson07_05() {
  const [points, setPoints] = useState<Point[]>([{ x: 50, y: 50 }]);
  function walk() {
    setPoints((current) => {
      const last = current[current.length - 1];
      const next = { x: Math.max(8, Math.min(92, last.x + (Math.floor(Math.random() * 3) - 1) * 14)), y: Math.max(8, Math.min(92, last.y + (Math.floor(Math.random() * 3) - 1) * 14)) };
      return [...current, next].slice(-14);
    });
  }
  return (
    <LessonFrame chapter="第 7 章 · 用代码画出一个世界" lesson="05" title="随机漫步的小海龟"
      lead="每一步都随机选择方向，小海龟就会走出一条无法提前猜到的路线。"
      goal="random.choice() 可以从几个方向中随机挑选一个。"
      closing="循环决定走几步，随机选择决定每一步往哪里走。">
      <section className="activity-card">
        <div className="activity-heading"><span>漫步实验</span><div><h2>一次走一步</h2><p>点击按钮，观察每一步都可能朝不同方向前进。</p></div></div>
        <div className="random-walk-lab">
          <div className="walk-board">{points.map((p, i) => <i className={i === points.length - 1 ? "current" : ""} style={{ left: `${p.x}%`, top: `${p.y}%` }} key={i}>{i === points.length - 1 ? "🐢" : "·"}</i>)}</div>
          <div className="walk-controls"><code>direction = random.choice([0, 90, 180, 270])</code><button type="button" onClick={walk}>随机走一步</button><button className="quiet-button" type="button" onClick={() => setPoints([{ x: 50, y: 50 }])}>回到起点</button><strong>已经走了 {points.length - 1} 步</strong></div>
        </div>
      </section>
      <PythonPlayground turtle initialCode={`from turtle import *\nimport random\n\nspeed(0)\nfor step in range(25):\n    direction = random.choice([0, 90, 180, 270])\n    setheading(direction)\n    forward(20)`} title="让 Turtle 随机漫步 25 步" prompt="修改步数和每一步的距离，看看路线会怎样变化。" />
    </LessonFrame>
  );
}
