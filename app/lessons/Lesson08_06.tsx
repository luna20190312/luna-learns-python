"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const monsters = { 史莱姆: { icon: "🟢", weak: "火", level: 1 }, 石头怪: { icon: "🗿", weak: "水", level: 3 }, 暗影龙: { icon: "🐉", weak: "光", level: 8 } };
type MonsterName = keyof typeof monsters;

export default function Lesson08_06() {
  const [name, setName] = useState<MonsterName>("史莱姆");
  const monster = monsters[name];
  return (
    <LessonFrame chapter="第 8 章 · 给数据贴上名字" lesson="06" title="制作怪物图鉴"
      lead="用怪物名字做外层字典的键，每只怪物的资料又是一张字典，就得到可以查询的图鉴。"
      goal="多层字典可以把有关联的资料整理得清清楚楚。"
      closing="先找到怪物名字，再找到它的一项资料。">
      <section className="activity-card">
        <div className="activity-heading"><span>本章作品</span><div><h2>查询怪物图鉴</h2><p>选择怪物，立即找到它的等级和弱点。</p></div></div>
        <div className="monster-book-lab">
          <div className="monster-tabs">{(Object.keys(monsters) as MonsterName[]).map((item) => <button className={name === item ? "active" : ""} type="button" onClick={() => setName(item)} key={item}>{item}</button>)}</div>
          <div className="monster-page"><span>{monster.icon}</span><h3>{name}</h3><dl><div><dt>等级</dt><dd>{monster.level}</dd></div><div><dt>弱点</dt><dd>{monster.weak}</dd></div></dl><code>book[&quot;{name}&quot;][&quot;弱点&quot;]</code></div>
        </div>
      </section>
      <PythonPlayground key={name} initialCode={`book = {\n    "史莱姆": {"等级": 1, "弱点": "火"},\n    "石头怪": {"等级": 3, "弱点": "水"},\n    "暗影龙": {"等级": 8, "弱点": "光"}\n}\n\nname = "${name}"\nprint(name, "的弱点是", book[name]["弱点"])`} title="运行怪物图鉴查询器" prompt="给图鉴增加一只你设计的怪物。" />
    </LessonFrame>
  );
}
