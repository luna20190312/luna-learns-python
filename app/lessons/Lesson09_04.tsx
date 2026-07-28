"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson09_04() {
  const [energy, setEnergy] = useState(3);
  const [fixed, setFixed] = useState(false);
  const [runs, setRuns] = useState(0);
  function step() {
    setRuns((v) => v + 1);
    if (fixed) setEnergy((v) => Math.max(0, v - 1));
  }
  return (
    <LessonFrame chapter="第 9 章 · 成为代码侦探" lesson="04" title="程序为什么停不下来"
      lead="while 循环要让条件慢慢变成 False。如果条件里的数字一直不变，它就会永远重复。"
      goal="检查 while 循环时，要找到哪一行会让条件发生变化。"
      closing="能结束的 while 循环，必须一步步靠近停止条件。">
      <section className="activity-card">
        <div className="activity-heading"><span>循环警报</span><div><h2>找出缺少的一行</h2><p>先执行两轮，发现能量不变，再把减少能量的代码装回去。</p></div></div>
        <div className="loop-debug-lab">
          <div className="loop-debug-code"><code>energy = 3</code><code>while energy &gt; 0:</code><code>　print(&quot;前进&quot;)</code><code className={fixed ? "fixed" : "missing"}>{fixed ? "　energy = energy - 1" : "　□ 缺少改变能量的代码"}</code><button type="button" onClick={step} disabled={energy === 0}>执行一轮</button><button type="button" onClick={() => setFixed(true)}>装回缺少的一行</button></div>
          <div className="loop-meter"><span>能量</span><strong>{energy}</strong><small>已执行 {runs} 轮</small><p>{energy === 0 ? "条件变成 False，循环结束" : fixed ? "能量正在靠近 0" : "能量没有变化，循环停不下来"}</p><button type="button" onClick={() => { setEnergy(3); setRuns(0); }}>重置</button></div>
        </div>
      </section>
      <PythonPlayground initialCode={`energy = 3\n\nwhile energy > 0:\n    print("前进，剩余能量", energy)\n    energy = energy - 1\n\nprint("安全停止")`} title="运行能够安全结束的循环" prompt="修改初始能量，观察循环会执行几轮。" />
    </LessonFrame>
  );
}
