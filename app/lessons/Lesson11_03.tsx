"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson11_03() {
  const [key, setKey] = useState(true);
  const [energy, setEnergy] = useState(60);
  const canOpen = key && energy >= 50;
  return (
    <LessonFrame chapter="高阶 第 11 章 · 通往完整 Python" lesson="03" title="同时检查多个条件"
      lead="有些任务需要两条规则同时成立，或者只要其中一条成立。and、or、not 可以组合条件。"
      goal="and 要求都成立，or 只需一个成立，not 会把真假反过来。"
      closing="先分别读懂每个小条件，再看连接它们的是 and 还是 or。">
      <section className="activity-card">
        <div className="activity-heading"><span>双重门锁</span><div><h2>钥匙和能量都够吗？</h2><p>魔法门要求“有钥匙 AND 能量至少 50”。</p></div></div>
        <div className="logic-lab">
          <button className={key ? "active" : ""} type="button" onClick={() => setKey((v) => !v)}>{key ? "🗝️ 有钥匙" : "没有钥匙"}</button>
          <label>能量：<strong>{energy}</strong><input type="range" min="0" max="100" step="10" value={energy} onChange={(e) => setEnergy(Number(e.target.value))} /></label>
          <code>has_key and energy &gt;= 50</code>
          <div className={canOpen ? "logic-result true" : "logic-result false"}>{canOpen ? "True · 门打开" : "False · 门锁着"}</div>
        </div>
      </section>
      <PythonPlayground key={`${key}-${energy}`} initialCode={`has_key = ${key ? "True" : "False"}\nenergy = ${energy}\n\nif has_key and energy >= 50:\n    print("魔法门打开")\nelse:\n    print("还缺少条件")\n\nprint("没有钥匙吗？", not has_key)`} title="组合多个条件" prompt="把 and 改成 or，比较开门规则怎样变化。" />
    </LessonFrame>
  );
}
