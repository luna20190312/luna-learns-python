"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson10_02() {
  const [secret, setSecret] = useState(() => Math.floor(Math.random() * 20) + 1);
  const [guess, setGuess] = useState(10);
  const [tries, setTries] = useState<number[]>([]);
  const solved = tries.includes(secret);
  const last = tries[tries.length - 1];
  function submit() { if (!solved) setTries((items) => [...items, guess]); }
  function reset() { setSecret(Math.floor(Math.random() * 20) + 1); setTries([]); setGuess(10); }
  return (
    <LessonFrame chapter="第 10 章 · Python 小小创作家" lesson="02" title="数字猜猜看"
      lead="把第 3 章的猜数字升级：秘密数随机产生，还会记录一共猜了几次。"
      goal="完整游戏需要开始状态、重复过程和结束条件。"
      closing="循环让游戏继续，计数器记录玩家尝试了多少次。">
      <section className="activity-card">
        <div className="activity-heading"><span>作品 2</span><div><h2>猜 1～20 的秘密数</h2><p>根据太大、太小的提示缩小范围。</p></div></div>
        <div className="number-guess-project">
          <div className="guess-dial"><input type="range" min="1" max="20" value={guess} disabled={solved} onChange={(e) => setGuess(Number(e.target.value))} /><strong>{guess}</strong><button type="button" disabled={solved} onClick={submit}>猜这个数字</button><button className="quiet-button" type="button" onClick={reset}>换一个秘密数</button></div>
          <div className={`guess-project-result ${solved ? "solved" : ""}`}><span>{solved ? secret : "?"}</span><strong>{tries.length === 0 ? "等待第一次猜测" : solved ? `猜对了，共 ${tries.length} 次！` : last < secret ? "太小了，再大一点" : "太大了，再小一点"}</strong><div>{tries.map((n, i) => <small key={i}>{n}</small>)}</div></div>
        </div>
      </section>
      <PythonPlayground initialCode={`secret = 20\nguess = 0\ntries = 0\n\nwhile guess != secret:\n    guess = int(input("猜一个 1 到 20 的数："))\n    tries = tries + 1\n    if guess < secret:\n        print("太小了")\n    elif guess > secret:\n        print("太大了")\n\nprint("猜对了！次数：", tries)`} title="运行带计数的猜数字游戏" prompt="示例把秘密数设为 20，所以准备的最后一次输入一定能结束循环。" inputDefaults={[{ label: "第 1 次", value: "10" }, { label: "第 2 次", value: "15" }, { label: "第 3 次", value: "20" }]} />
    </LessonFrame>
  );
}
