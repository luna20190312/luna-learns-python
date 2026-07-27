"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const originalLines = [
  { id: "wake", code: 'print("小猫醒了")', output: "小猫醒了" },
  { id: "door", code: 'print("小猫打开门")', output: "小猫打开门" },
  { id: "box", code: 'print("小猫发现宝箱")', output: "小猫发现宝箱" },
];

export default function Lesson01_01() {
  const [lines, setLines] = useState(originalLines);
  const [step, setStep] = useState(0);
  const code = useMemo(() => lines.map((line) => line.code).join("\n"), [lines]);

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= lines.length) return;
    const next = [...lines];
    [next[index], next[target]] = [next[target], next[index]];
    setLines(next);
    setStep(0);
  }

  return (
    <LessonFrame
      lesson="01"
      title="哪一行先发生？"
      lead="计算机不会猜故事，它只会从第一行开始，一行接一行地往下走。"
      goal="代码的位置变了，发生事情的顺序也会变。"
      closing="Python 通常从上往下，一行一行执行代码。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>实验 1</span>
          <div>
            <h2>给故事换一个顺序</h2>
            <p>用箭头移动代码，然后点“执行下一行”。</p>
          </div>
        </div>

        <div className="order-lab">
          <div className="order-code">
            {lines.map((line, index) => (
              <div
                className={`order-line ${step === index + 1 ? "executing" : ""}`}
                key={line.id}
              >
                <b>{index + 1}</b>
                <code>{line.code}</code>
                <span>
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={`把第${index + 1}行上移`}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === lines.length - 1}
                    aria-label={`把第${index + 1}行下移`}
                  >
                    ↓
                  </button>
                </span>
              </div>
            ))}
            <div className="step-actions">
              <button
                onClick={() => setStep((current) => Math.min(3, current + 1))}
                disabled={step === 3}
              >
                执行下一行 →
              </button>
              <button onClick={() => setStep(0)}>重新开始</button>
            </div>
          </div>

          <div className="story-screen">
            <small>屏幕上依次出现</small>
            {step === 0 && <p className="screen-empty">还没有执行代码</p>}
            {lines.slice(0, step).map((line) => (
              <p key={line.id}>{line.output}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="notice-strip">
        <b>发现了吗？</b>
        <p>计算机不认识“合理的故事顺序”，它只认识第 1 行、第 2 行、第 3 行。</p>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="现在让真正的 Python 运行"
        prompt="调换任意两行，再比较结果。"
      />
    </LessonFrame>
  );
}
