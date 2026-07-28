"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const team = [{ name: "露娜", job: "法师", icon: "🧙‍♀️" }, { name: "小雨", job: "弓箭手", icon: "🏹" }, { name: "安安", job: "治疗师", icon: "🧚" }];

export default function Lesson08_05() {
  const [selected, setSelected] = useState(0);
  return (
    <LessonFrame chapter="第 8 章 · 给数据贴上名字" lesson="05" title="一支冒险小队"
      lead="一张角色卡是字典，很多张角色卡可以装进列表。这样就能保存一整支队伍。"
      goal="列表可以装字典，字典也可以装列表。"
      closing="外面的列表保存角色顺序，里面的字典保存每个角色的资料。">
      <section className="activity-card">
        <div className="activity-heading"><span>组队实验</span><div><h2>查看小队成员</h2><p>点击角色，就像先用列表下标，再用字典键。</p></div></div>
        <div className="team-lab">
          <div className="team-picker">{team.map((member, i) => <button className={selected === i ? "active" : ""} type="button" onClick={() => setSelected(i)} key={member.name}><span>{member.icon}</span><strong>{member.name}</strong><small>下标 {i}</small></button>)}</div>
          <div className="team-member-card"><span>{team[selected].icon}</span><h3>{team[selected].name}</h3><strong>{team[selected].job}</strong><code>team[{selected}][&quot;职业&quot;]</code></div>
        </div>
      </section>
      <PythonPlayground key={selected} initialCode={`team = [\n    {"名字": "露娜", "职业": "法师"},\n    {"名字": "小雨", "职业": "弓箭手"},\n    {"名字": "安安", "职业": "治疗师"}\n]\n\nprint(team[${selected}]["名字"])\nprint(team[${selected}]["职业"])`} title="从列表里的字典取资料" prompt="更换列表下标，查看另一位队员。" />
    </LessonFrame>
  );
}
