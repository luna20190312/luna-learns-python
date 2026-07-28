"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson09_03() {
  const [choice, setChoice] = useState("score");
  const correct = choice === "score";
  return (
    <LessonFrame chapter="第 9 章 · 成为代码侦探" lesson="03" title="变量为什么不认识我"
      lead="变量名必须前后一模一样。大小写、下划线和拼写有一点不同，Python 就会当成另一个名字。"
      goal="遇到 NameError，要把使用的名字和定义的名字逐字比较。"
      closing="score、Score 和 scores 是三个不同的变量名。">
      <section className="activity-card">
        <div className="activity-heading"><span>名字比对</span><div><h2>找到真正的分数盒子</h2><p>上面定义了 score，下面应该使用哪个名字？</p></div></div>
        <div className="variable-name-lab">
          <div className="defined-variable"><small>已经定义</small><code>score = 10</code><span>📦</span></div>
          <div className="name-choices">{["Score", "scores", "score"].map((name) => <button className={choice === name ? "chosen" : ""} type="button" onClick={() => setChoice(name)} key={name}><code>print({name})</code></button>)}</div>
          <div className={correct ? "name-result correct" : "name-result"}>{correct ? "✓ 找到了 score，输出 10" : `NameError：没有名叫 ${choice} 的盒子`}</div>
        </div>
      </section>
      <PythonPlayground initialCode={`score = 10\nscore = score + 5\nprint("现在的分数是", score)`} title="使用前后一致的变量名" prompt="故意把最后一行改成 Score，读完错误再修复。" />
    </LessonFrame>
  );
}
