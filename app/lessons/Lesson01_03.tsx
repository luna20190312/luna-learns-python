"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson01_03() {
  const [left, setLeft] = useState(7);
  const [right, setRight] = useState(3);
  const [operator, setOperator] = useState("+");
  const [revealed, setRevealed] = useState(false);
  const expression = `${left} ${operator} ${right}`;
  const result =
    operator === "+"
      ? left + right
      : operator === "-"
        ? left - right
        : left * right;

  function changeNumber(side: "left" | "right", value: number) {
    side === "left" ? setLeft(value) : setRight(value);
    setRevealed(false);
  }

  return (
    <LessonFrame
      lesson="03"
      title="造一台数字机器"
      lead="把两个数字和一个运算符放进去，Python 会算出一个新的数字。"
      goal="没有引号的数字可以参加计算。"
      closing='print(3 + 5) 会计算，print("3 + 5") 只会显示文字。'
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>实验 1</span>
          <div>
            <h2>设置数字机器</h2>
            <p>选数字、选运算，再猜一猜答案。</p>
          </div>
        </div>
        <div className="number-machine">
          <input
            type="number"
            min="0"
            max="20"
            value={left}
            onChange={(event) => changeNumber("left", Number(event.target.value))}
            aria-label="第一个数字"
          />
          <div className="operator-picker">
            {["+", "-", "*"].map((item) => (
              <button
                className={operator === item ? "active" : ""}
                onClick={() => {
                  setOperator(item);
                  setRevealed(false);
                }}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <input
            type="number"
            min="0"
            max="20"
            value={right}
            onChange={(event) => changeNumber("right", Number(event.target.value))}
            aria-label="第二个数字"
          />
          <span>=</span>
          <button className="number-answer" onClick={() => setRevealed(true)}>
            {revealed ? result : "?"}
          </button>
        </div>
        <p className="machine-code">
          Python 看到的是：<code>print({expression})</code>
        </p>
      </section>

      <section className="compare-box">
        <div>
          <code>print(3 + 5)</code>
          <strong>8</strong>
          <span>数字：先计算</span>
        </div>
        <div>
          <code>print(&quot;3 + 5&quot;)</code>
          <strong>3 + 5</strong>
          <span>文字：原样显示</span>
        </div>
      </section>

      <PythonPlayground
        key={expression}
        initialCode={`print(${expression})\nprint((${expression}) * 2)`}
        title="把算式交给 Python"
        prompt="可以添加括号，看看计算顺序会不会变化。"
      />
    </LessonFrame>
  );
}
