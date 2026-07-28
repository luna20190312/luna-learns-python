"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const trace = [{ line: "coins = 2", value: 2 }, { line: "coins = coins + 3", value: 5 }, { line: "coins = coins * 2", value: 10 }];

export default function Lesson09_05() {
  const [step, setStep] = useState(0);
  return (
    <LessonFrame chapter="第 9 章 · 成为代码侦探" lesson="05" title="用 print() 寻找线索"
      lead="程序最后的答案不对时，可以在中间放几个 print()，看看数值从哪一步开始跑偏。"
      goal="调试输出能显示程序走到哪里、变量现在是多少。"
      closing="print() 不只用来展示作品，也可以做代码侦探的手电筒。">
      <section className="activity-card">
        <div className="activity-heading"><span>手电筒实验</span><div><h2>照亮每一步的金币</h2><p>逐行执行，查看每次计算后的变量值。</p></div></div>
        <div className="trace-lab">
          <div className="trace-code">{trace.map((item, i) => <div className={i < step ? "done" : i === step ? "next" : ""} key={item.line}><code>{item.line}</code><small>print(&quot;线索&quot;, coins)</small></div>)}<button type="button" disabled={step === trace.length} onClick={() => setStep((v) => v + 1)}>执行下一行</button></div>
          <div className="trace-output">{trace.slice(0, step).map((item, i) => <p key={item.line}>线索 {i + 1}：coins = <strong>{item.value}</strong></p>)}{step === 0 && <span>手电筒还没有打开</span>}</div>
        </div>
      </section>
      <PythonPlayground initialCode={`coins = 2\nprint("线索 1：", coins)\n\ncoins = coins + 3\nprint("线索 2：", coins)\n\ncoins = coins * 2\nprint("线索 3：", coins)`} title="在程序中间放入调试输出" prompt="把其中一个计算改错，看看从哪条线索开始不对。" />
    </LessonFrame>
  );
}
