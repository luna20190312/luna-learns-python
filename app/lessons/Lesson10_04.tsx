"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson10_04() {
  const [pet, setPet] = useState({ hunger: 60, happy: 50, energy: 40 });
  function act(kind: "feed" | "play" | "sleep") {
    setPet((p) => kind === "feed" ? { ...p, hunger: Math.max(0, p.hunger - 25) } : kind === "play" ? { ...p, happy: Math.min(100, p.happy + 20), energy: Math.max(0, p.energy - 10) } : { ...p, energy: Math.min(100, p.energy + 30) });
  }
  return (
    <LessonFrame chapter="第 10 章 · Python 小小创作家" lesson="04" title="宠物养成日记"
      lead="用字典保存宠物的状态，再用函数完成喂食、玩耍和睡觉。"
      goal="程序状态会随着每一次操作发生变化。"
      closing="字典保存现在，函数负责改变现在。">
      <section className="activity-card">
        <div className="activity-heading"><span>作品 4</span><div><h2>照顾你的月兔</h2><p>点击动作，观察三项状态怎样改变。</p></div></div>
        <div className="pet-project">
          <div className="pet-stage"><span>🐇</span><strong>{pet.energy < 30 ? "月兔有点困" : pet.hunger > 70 ? "月兔饿了" : "月兔很开心"}</strong></div>
          <div className="pet-dashboard"><div><span>饥饿</span><i><b style={{ width: `${pet.hunger}%` }} /></i><strong>{pet.hunger}</strong></div><div><span>快乐</span><i><b style={{ width: `${pet.happy}%` }} /></i><strong>{pet.happy}</strong></div><div><span>能量</span><i><b style={{ width: `${pet.energy}%` }} /></i><strong>{pet.energy}</strong></div><section><button type="button" onClick={() => act("feed")}>🥕 喂食</button><button type="button" onClick={() => act("play")}>🎾 玩耍</button><button type="button" onClick={() => act("sleep")}>🌙 睡觉</button></section></div>
        </div>
      </section>
      <PythonPlayground initialCode={`pet = {"名字": "月兔", "饥饿": 60, "快乐": 50, "能量": 40}\n\ndef feed(pet):\n    pet["饥饿"] = pet["饥饿"] - 25\n\ndef play(pet):\n    pet["快乐"] = pet["快乐"] + 20\n    pet["能量"] = pet["能量"] - 10\n\ndef show_status(pet):\n    print(pet)\n\nfeed(pet)\nplay(pet)\nshow_status(pet)`} title="用函数照顾字典里的宠物" prompt="增加一个 sleep() 函数，让能量增加 30。" />
    </LessonFrame>
  );
}
