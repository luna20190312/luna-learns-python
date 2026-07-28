"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson09_01() {
  const [stage, setStage] = useState<"ready" | "error" | "fixed">("ready");
  return (
    <LessonFrame chapter="第 9 章 · 成为代码侦探" lesson="01" title="错误不是失败"
      lead="错误信息不是责备，而是计算机留下的线索。先找到出错行，再读最后一行提示。"
      goal="出错时先停下来读线索，不需要把所有代码推倒重来。"
      closing="错误信息会告诉我出错位置和错误种类。">
      <section className="activity-card">
        <div className="activity-heading"><span>第一宗案件</span><div><h2>让坏掉的问候重新工作</h2><p>先运行，再根据红色线索修好拼写。</p></div></div>
        <div className="error-detective-lab">
          <div className="broken-code"><code><span>1</span>name = &quot;贝琪&quot;</code><code className={stage === "error" ? "suspect" : ""}><span>2</span>{stage === "fixed" ? "print" : "pirnt"}(name)</code><button type="button" onClick={() => setStage("error")}>运行坏代码</button><button type="button" disabled={stage !== "error"} onClick={() => setStage("fixed")}>把 pirnt 改成 print</button></div>
          <div className={`error-clue ${stage}`}><span>{stage === "ready" ? "🔎" : stage === "error" ? "⚠️" : "✅"}</span><strong>{stage === "ready" ? "等待运行" : stage === "error" ? "NameError：不认识 pirnt，第 2 行" : "你好，贝琪！"}</strong><small>{stage === "error" ? "位置：第 2 行　种类：名字拼错" : stage === "fixed" ? "线索已经解决" : "点击以后才会出现线索"}</small></div>
        </div>
      </section>
      <section className="clue-reading"><div><span>1</span><strong>先看第几行</strong></div><i>→</i><div><span>2</span><strong>再看错误名字</strong></div><i>→</i><div><span>3</span><strong>只改一个地方</strong></div></section>
      <PythonPlayground initialCode={`name = "贝琪"\nprint("你好，" + name + "！")`} title="运行已经修好的程序" prompt="故意把 print 拼错一次，读完错误再恢复代码。" />
    </LessonFrame>
  );
}
