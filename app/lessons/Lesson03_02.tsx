"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson03_02() {
  const [round, setRound] = useState(0);

  return (
    <LessonFrame
      chapter="第 3 章 · 让程序重复工作"
      lesson="02"
      title="用 for 自动重复"
      lead="for 像一位循环指挥官：它会让缩进里的指令执行指定的次数。"
      goal="for 管理重复次数，缩进的代码是每一轮都要做的事。"
      closing="for 每开始一轮，就会再执行一次缩进里的代码。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>循环慢镜头</span>
          <div>
            <h2>观察三轮循环</h2>
            <p>一次只走一轮，看看同一行代码怎样被反复执行。</p>
          </div>
        </div>
        <div className="for-step-lab">
          <div className="for-code-card">
            <code className={round < 3 ? "running" : ""}>
              for turn in range(3):
            </code>
            <code className={round > 0 ? "running indented" : "indented"}>
              print(&quot;跳！&quot;)
            </code>
            <div className="for-actions">
              <button
                type="button"
                disabled={round === 3}
                onClick={() => setRound((value) => Math.min(3, value + 1))}
              >
                {round === 3 ? "循环完成" : "执行第 " + (round + 1) + " 轮"}
              </button>
              <button type="button" onClick={() => setRound(0)}>
                重来
              </button>
            </div>
          </div>
          <div className="for-stage" aria-live="polite">
            <div className="jumping-character">{round === 3 ? "🏁" : "🐰"}</div>
            <div className="round-dots">
              {[1, 2, 3].map((item) => (
                <span className={item <= round ? "done" : ""} key={item}>
                  {item}
                </span>
              ))}
            </div>
            <strong>
              {round === 0
                ? "等待第一轮"
                : round === 3
                  ? "三轮都完成了！"
                  : "刚刚完成第 " + round + " 轮"}
            </strong>
            <div className="jump-output">
              {Array.from({ length: round }, (_, index) => (
                <span key={index}>跳！</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="notice-strip">
        <b>注意缩进</b>
        <p>
          <code>print()</code> 前面的空格表示“它属于这个循环”。删掉缩进，它就不会每轮都执行。
        </p>
      </section>

      <PythonPlayground
        initialCode={`for turn in range(3):\n    print("跳！")\n\nprint("循环结束")`}
        title="让 Python 自动完成三轮"
        prompt="把 3 改成 5，再把“跳”换成另一个动作。"
      />
    </LessonFrame>
  );
}
