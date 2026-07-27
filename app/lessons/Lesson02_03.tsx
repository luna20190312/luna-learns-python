"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson02_03() {
  const [energy, setEnergy] = useState(45);
  const [checked, setChecked] = useState(false);
  const canCast = energy >= 60;

  return (
    <LessonFrame
      chapter="第 2 章 · 让程序学会选择"
      lesson="03"
      title="满足条件才行动"
      lead="魔法不是每次都能释放。程序会先检查能量，再决定要不要执行缩进里的指令。"
      goal="if 后面的条件成立，缩进的代码才会运行。"
      closing="if 负责检查，缩进表示条件成立后要做什么。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>能量实验</span>
          <div>
            <h2>能不能释放星光？</h2>
            <p>规则：能量至少达到 60。</p>
          </div>
        </div>
        <div className="energy-lab">
          <div className={`magic-orb ${checked && canCast ? "casting" : ""}`}>
            <span>{energy}</span>
            <small>能量</small>
          </div>
          <div className="energy-controls">
            <label>
              调整能量：<strong>{energy}</strong>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={energy}
                onChange={(event) => {
                  setEnergy(Number(event.target.value));
                  setChecked(false);
                }}
              />
            </label>
            <code>energy &gt;= 60</code>
            <button onClick={() => setChecked(true)}>检查条件</button>
          </div>
          <div className={`spell-result ${checked ? "revealed" : ""}`}>
            {!checked
              ? "等待检查"
              : canCast
                ? "✨ 星光释放成功！"
                : "能量不足，什么也没有发生。"}
          </div>
        </div>
      </section>

      <section className="indent-demo">
        <div>
          <code>if energy &gt;= 60:</code>
          <code className="indented">print(&quot;释放星光&quot;)</code>
          <code>print(&quot;检查结束&quot;)</code>
        </div>
        <div>
          <p><b>缩进的一行</b>：只有条件成立才执行</p>
          <p><b>没有缩进的一行</b>：不管条件怎样都会执行</p>
        </div>
      </section>

      <PythonPlayground
        key={energy}
        initialCode={`energy = ${energy}\n\nif energy >= 60:\n    print("✨ 释放星光！")\n\nprint("检查结束")`}
        title="改变能量，再运行"
        prompt="分别试试 30、60 和 90。"
      />
    </LessonFrame>
  );
}
