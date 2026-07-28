"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const bugs = ["print 拼错了", "if 后面少冒号", "变量名不一致"];

export default function Lesson09_06() {
  const [fixed, setFixed] = useState<string[]>([]);
  const complete = fixed.length === bugs.length;
  return (
    <LessonFrame chapter="第 9 章 · 成为代码侦探" lesson="06" title="修复坏掉的小游戏"
      lead="最后一宗案件同时藏着三个小问题。按照“运行、读线索、只改一处、再运行”的顺序解决。"
      goal="调试不是猜答案，而是一次只验证一个线索。"
      closing="我能读错误、找位置、做小修改，再运行确认。">
      <section className="activity-card">
        <div className="activity-heading"><span>本章挑战</span><div><h2>修复宝箱小游戏</h2><p>逐个处理三条线索，修好以后宝箱才会打开。</p></div></div>
        <div className="repair-game-lab">
          <div className="bug-list">{bugs.map((bug, i) => <button className={fixed.includes(bug) ? "fixed" : ""} type="button" onClick={() => setFixed((items) => items.includes(bug) ? items : [...items, bug])} key={bug}><span>{fixed.includes(bug) ? "✓" : i + 1}</span><strong>{bug}</strong><small>{fixed.includes(bug) ? "已修复" : "点击修复"}</small></button>)}</div>
          <div className={`repair-chest ${complete ? "open" : ""}`}><span>{complete ? "🎁" : "🔒"}</span><strong>{complete ? "三处问题全部解决！" : `还有 ${bugs.length - fixed.length} 处问题`}</strong><button type="button" onClick={() => setFixed([])}>重新挑战</button></div>
        </div>
      </section>
      <PythonPlayground initialCode={`secret = "星光"\nanswer = "星光"\n\nif answer == secret:\n    print("宝箱打开！")\nelse:\n    print("暗号不对")`} title="运行修好的宝箱游戏" prompt="故意制造一个拼写或标点错误，再自己把它找回来。" />
    </LessonFrame>
  );
}
