"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const secret = 7;

export default function Lesson03_06() {
  const [guess, setGuess] = useState("5");
  const [history, setHistory] = useState<Array<{ number: number; text: string }>>([]);
  const solved = history.some((item) => item.number === secret);

  function submitGuess() {
    const number = Number(guess);
    if (!Number.isInteger(number) || number < 1 || number > 10 || solved) return;
    const text =
      number === secret ? "猜对了！" : number < secret ? "太小了" : "太大了";
    setHistory((current) => [...current, { number, text }]);
  }

  return (
    <LessonFrame
      chapter="第 3 章 · 让程序重复工作"
      lesson="06"
      title="猜数字小游戏"
      lead="把输入、判断和 while 循环组合起来：只要还没猜中，游戏就继续询问。"
      goal="循环负责继续游戏，条件判断负责给出不同提示。"
      closing="一个小游戏，可以由输入、选择和循环一起组成。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>本章挑战</span>
          <div>
            <h2>猜出 1～10 的秘密数字</h2>
            <p>每次会得到“太大”或“太小”的提示，直到猜中为止。</p>
          </div>
        </div>
        <div className="guess-game">
          <div className={`secret-vault ${solved ? "open" : ""}`}>
            <span>{solved ? secret : "?"}</span>
            <strong>{solved ? "秘密数字找到了" : "秘密数字藏在这里"}</strong>
            <small>已经猜了 {history.length} 次</small>
          </div>
          <div className="guess-console">
            <label>
              输入你的猜测
              <input
                type="number"
                min="1"
                max="10"
                value={guess}
                disabled={solved}
                onChange={(event) => setGuess(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitGuess();
                }}
              />
            </label>
            <button type="button" disabled={solved} onClick={submitGuess}>
              检查答案
            </button>
            <button
              className="quiet-button"
              type="button"
              onClick={() => {
                setHistory([]);
                setGuess("5");
              }}
            >
              重新开始
            </button>
            <div className="guess-history" aria-live="polite">
              {history.length === 0 ? (
                <p>提示会出现在这里</p>
              ) : (
                history.map((item, index) => (
                  <div className={item.number === secret ? "correct" : ""} key={index}>
                    <span>第 {index + 1} 次</span>
                    <strong>{item.number}</strong>
                    <b>{item.text}</b>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="loop-recipe">
        <div><span>1</span><strong>输入猜测</strong></div>
        <i>→</i>
        <div><span>2</span><strong>判断大小</strong></div>
        <i>→</i>
        <div><span>3</span><strong>没猜中就回到开头</strong></div>
      </section>

      <PythonPlayground
        initialCode={`secret = 7\nguess = 0\n\nwhile guess != secret:\n    guess = int(input("猜一个 1 到 10 的数字："))\n    if guess < secret:\n        print("太小了")\n    elif guess > secret:\n        print("太大了")\n    else:\n        print("猜对了！")`}
        title="运行完整的猜数字程序"
        prompt="下面准备了三次输入。改变它们，设计一条新的猜测路线。"
        inputDefaults={[
          { label: "第一次", value: "3" },
          { label: "第二次", value: "9" },
          { label: "第三次", value: "7" },
        ]}
      />
    </LessonFrame>
  );
}
