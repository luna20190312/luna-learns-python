"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const outfits = {
  晴天: { icon: "🧢", text: "戴上太阳帽", branch: 0 },
  下雨: { icon: "☂️", text: "带上雨伞", branch: 1 },
  下雪: { icon: "🧣", text: "围上厚围巾", branch: 2 },
};

type Weather = keyof typeof outfits;

export default function Lesson02_05() {
  const [weather, setWeather] = useState<Weather>("晴天");
  const outfit = outfits[weather];

  return (
    <LessonFrame
      chapter="第 2 章 · 让程序学会选择"
      lesson="05"
      title="不止两种选择"
      lead="有时世界不只有“是”和“不是”。elif 可以继续检查第三条、第四条道路。"
      goal="程序从上往下检查，找到第一条成立的分支就停下来。"
      closing="if 先检查，elif 接着检查，else 接住剩下的情况。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>天气实验</span>
          <div>
            <h2>今天应该带什么？</h2>
            <p>换一种天气，观察程序检查了哪些条件。</p>
          </div>
        </div>
        <div className="weather-lab">
          <div className="weather-picker">
            {(Object.keys(outfits) as Weather[]).map((item) => (
              <button
                className={weather === item ? "active" : ""}
                onClick={() => setWeather(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="weather-checks">
            {[
              ['if weather == "晴天"', 0],
              ['elif weather == "下雨"', 1],
              ["else", 2],
            ].map(([label, index]) => (
              <div
                className={
                  Number(index) < outfit.branch
                    ? "passed"
                    : Number(index) === outfit.branch
                      ? "matched"
                      : ""
                }
                key={String(label)}
              >
                <span>{Number(index) < outfit.branch ? "×" : Number(index) === outfit.branch ? "✓" : "·"}</span>
                <code>{label}</code>
              </div>
            ))}
          </div>
          <div className="outfit-result">
            <span>{outfit.icon}</span>
            <strong>{outfit.text}</strong>
            <small>找到第一条成立的道路后，后面不再检查</small>
          </div>
        </div>
      </section>

      <PythonPlayground
        key={weather}
        initialCode={`weather = "${weather}"\n\nif weather == "晴天":\n    print("戴上太阳帽")\nelif weather == "下雨":\n    print("带上雨伞")\nelse:\n    print("围上厚围巾")`}
        title="让 Python 挑选装备"
        prompt="可以增加一种天气和一个新的 elif。"
      />
    </LessonFrame>
  );
}
