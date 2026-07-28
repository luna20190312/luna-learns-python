"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const profile = { 名字: "露娜", 等级: "3", 技能: "星光术", 宠物: "月兔" };
type ProfileKey = keyof typeof profile;

export default function Lesson08_02() {
  const [keyName, setKeyName] = useState<ProfileKey>("名字");
  return (
    <LessonFrame chapter="第 8 章 · 给数据贴上名字" lesson="02" title="按名字找到资料"
      lead="不需要记住资料排在第几格，只要告诉字典标签名称，它就会交出对应的值。"
      goal="字典[键] 会按标签找到对应的值。"
      closing="列表用数字下标查找，字典用自己起的键查找。">
      <section className="activity-card">
        <div className="activity-heading"><span>标签抽屉</span><div><h2>拉开一个资料抽屉</h2><p>点击标签，看看同一个字典会交出什么。</p></div></div>
        <div className="key-lookup-lab">
          <div className="key-drawers">{(Object.keys(profile) as ProfileKey[]).map((key) => <button className={keyName === key ? "active" : ""} type="button" onClick={() => setKeyName(key)} key={key}><span>{key}</span><small>点击查找</small></button>)}</div>
          <div className="lookup-result"><code>hero[&quot;{keyName}&quot;]</code><i>→</i><strong>{profile[keyName]}</strong></div>
        </div>
      </section>
      <PythonPlayground key={keyName} initialCode={`hero = {"名字": "露娜", "等级": 3, "技能": "星光术", "宠物": "月兔"}\n\nprint(hero["${keyName}"])`} title="按键查找一份资料" prompt="把方括号里的键换成“等级”“技能”或“宠物”。" />
    </LessonFrame>
  );
}
