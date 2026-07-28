"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const choices = ["石头", "剪刀", "布"] as const;
type Choice = typeof choices[number];
const icon = { 石头: "✊", 剪刀: "✌️", 布: "✋" };

export default function Lesson10_01() {
  const [mine, setMine] = useState<Choice | null>(null);
  const [computer, setComputer] = useState<Choice | null>(null);
  const result = !mine || !computer ? "等待出拳" : mine === computer ? "平局" : (mine === "石头" && computer === "剪刀") || (mine === "剪刀" && computer === "布") || (mine === "布" && computer === "石头") ? "你赢了！" : "电脑赢了";
  function play(choice: Choice) { setMine(choice); setComputer(choices[Math.floor(Math.random() * choices.length)]); }
  return (
    <LessonFrame chapter="第 10 章 · Python 小小创作家" lesson="01" title="石头剪刀布"
      lead="第一个完整作品会用到列表、随机选择、输入和条件判断。"
      goal="先把游戏规则拆成数据、选择和结果判断。"
      closing="小游戏的规则，可以变成一组清楚的条件。">
      <section className="activity-card">
        <div className="activity-heading"><span>作品 1</span><div><h2>和电脑猜拳</h2><p>选择一种手势，电脑会从列表里随机选择。</p></div></div>
        <div className="rps-lab">
          <div className="rps-picker">{choices.map((choice) => <button type="button" onClick={() => play(choice)} key={choice}><span>{icon[choice]}</span><strong>{choice}</strong></button>)}</div>
          <div className="rps-arena"><div><small>你</small><span>{mine ? icon[mine] : "?"}</span></div><strong>VS</strong><div><small>电脑</small><span>{computer ? icon[computer] : "?"}</span></div><p>{result}</p></div>
        </div>
      </section>
      <PythonPlayground initialCode={`import random\n\nchoices = ["石头", "剪刀", "布"]\nplayer = input("请选择石头、剪刀或布：")\ncomputer = random.choice(choices)\nprint("电脑选择：", computer)\n\nif player == computer:\n    print("平局")\nelif (player == "石头" and computer == "剪刀") or (player == "剪刀" and computer == "布") or (player == "布" and computer == "石头"):\n    print("你赢了！")\nelse:\n    print("电脑赢了")`} title="运行完整的猜拳程序" prompt="先用准备好的输入运行，再修改电脑的选择列表。" inputDefaults={[{ label: "你的选择", value: "石头" }]} />
    </LessonFrame>
  );
}
