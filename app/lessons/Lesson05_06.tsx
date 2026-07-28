"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const prizes = [
  { name: "星星徽章", icon: "🌟" },
  { name: "彩虹糖果", icon: "🍬" },
  { name: "魔法羽毛", icon: "🪶" },
  { name: "幸运宝石", icon: "💎" },
  { name: "小熊伙伴", icon: "🧸" },
];

export default function Lesson05_06() {
  const [result, setResult] = useState<(typeof prizes)[number] | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  function draw() {
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    setResult(prize);
    setHistory((items) => [prize.name, ...items].slice(0, 5));
  }

  return (
    <LessonFrame
      chapter="第 5 章 · 一次记住很多东西"
      lesson="06"
      title="随机抽取幸运宝物"
      lead="把很多奖品放进列表，再让 random.choice() 随机挑选一项，就能做出幸运宝箱。"
      goal="random.choice(列表) 会从列表中随机返回一项。"
      closing="列表负责保存选择，random.choice() 负责随机挑选。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>本章挑战</span>
          <div>
            <h2>打开幸运宝箱</h2>
            <p>每次都从同一个奖品列表里随机抽取一项。</p>
          </div>
        </div>
        <div className="lucky-chest-lab">
          <div className="prize-list">
            <code>prizes = [</code>
            {prizes.map((prize) => (
              <div key={prize.name}><span>{prize.icon}</span><strong>&quot;{prize.name}&quot;</strong></div>
            ))}
            <code>]</code>
          </div>
          <div className={`lucky-chest ${result ? "open" : ""}`}>
            <div className="chest-lid" aria-hidden="true" />
            <div className="chest-box">
              <span>{result?.icon ?? "?"}</span>
            </div>
            <strong>{result?.name ?? "宝箱正在等待"}</strong>
            <button type="button" onClick={draw}>运行 random.choice()</button>
          </div>
          <div className="draw-history">
            <strong>最近抽取</strong>
            {history.length === 0 ? (
              <p>还没有记录</p>
            ) : (
              history.map((name, index) => (
                <span key={`${name}-${index}`}>{index + 1}. {name}</span>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="list-project-recipe">
        <div><span>1</span><strong>建立奖品列表</strong></div>
        <i>→</i>
        <div><span>2</span><strong>随机选择一项</strong></div>
        <i>→</i>
        <div><span>3</span><strong>显示抽取结果</strong></div>
      </section>

      <PythonPlayground
        initialCode={`import random\n\nprizes = ["星星徽章", "彩虹糖果", "魔法羽毛", "幸运宝石", "小熊伙伴"]\n\nlucky_prize = random.choice(prizes)\nprint("你抽到了：", lucky_prize)`}
        title="运行真正的随机宝箱"
        prompt="多运行几次，再往列表里加入你自己的奖品。"
      />
    </LessonFrame>
  );
}
