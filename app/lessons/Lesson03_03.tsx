"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson03_03() {
  const [stop, setStop] = useState(6);
  const [revealed, setRevealed] = useState(false);
  const numbers = useMemo(
    () => Array.from({ length: Math.max(0, stop - 1) }, (_, index) => index + 1),
    [stop],
  );
  const code = `for number in range(1, ${stop}):\n    print(number)`;

  return (
    <LessonFrame
      chapter="第 3 章 · 让程序重复工作"
      lesson="03"
      title="range() 数字制造机"
      lead="循环需要知道每一轮轮到谁。range() 会按顺序制造一串数字，交给循环使用。"
      goal="range(1, 6) 会制造 1、2、3、4、5，但不会包含终点 6。"
      closing="range 的起点会出现，终点不会出现。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>数字实验</span>
          <div>
            <h2>终点到底会不会出现？</h2>
            <p>先选择终点，再打开机器检查你的猜想。</p>
          </div>
        </div>
        <div className="range-machine">
          <div className="range-control">
            <label>
              选择终点：<strong>{stop}</strong>
              <input
                type="range"
                min="3"
                max="10"
                value={stop}
                onChange={(event) => {
                  setStop(Number(event.target.value));
                  setRevealed(false);
                }}
              />
            </label>
            <code>range(1, {stop})</code>
            <button type="button" onClick={() => setRevealed(true)}>
              打开数字制造机
            </button>
          </div>
          <div className="range-output" aria-live="polite">
            {!revealed ? (
              <p>先猜一猜：最后一个数字是几？</p>
            ) : (
              <>
                <div>
                  {numbers.map((number) => (
                    <span key={number}>{number}</span>
                  ))}
                  <span className="excluded">{stop}</span>
                </div>
                <strong>
                  {stop} 是终点，所以停在 {stop - 1}
                </strong>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="range-anatomy">
        <div>
          <span>起点</span>
          <strong>1</strong>
          <small>包含它</small>
        </div>
        <code>range(1, {stop})</code>
        <div className="stop">
          <span>终点</span>
          <strong>{stop}</strong>
          <small>到它之前停下</small>
        </div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="打印 range 制造的数字"
        prompt="改变起点和终点，运行后检查最后一个数字。"
      />
    </LessonFrame>
  );
}
