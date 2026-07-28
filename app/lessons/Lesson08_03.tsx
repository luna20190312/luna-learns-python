"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson08_03() {
  const [level, setLevel] = useState(3);
  const [pet, setPet] = useState("月兔");
  return (
    <LessonFrame chapter="第 8 章 · 给数据贴上名字" lesson="03" title="修改角色的状态"
      lead="给已有标签一个新值，资料就会更新；使用新标签，还能增加一份新资料。"
      goal="字典[键] = 值 可以修改旧资料，也可以增加新资料。"
      closing="键已经存在就修改，键从没出现过就新增。">
      <section className="activity-card">
        <div className="activity-heading"><span>升级面板</span><div><h2>升级角色并更换宠物</h2><p>每次操作都对应一条字典赋值语句。</p></div></div>
        <div className="dict-update-lab">
          <div className="update-controls"><label>等级：<strong>{level}</strong><input type="range" min="1" max="10" value={level} onChange={(e) => setLevel(Number(e.target.value))} /></label><label>宠物<input value={pet} onChange={(e) => setPet(e.target.value)} /></label><code>hero[&quot;等级&quot;] = {level}</code><code>hero[&quot;宠物&quot;] = &quot;{pet}&quot;</code></div>
          <div className="updated-profile"><span>🧙‍♀️</span><h3>露娜</h3><dl><div><dt>等级</dt><dd>{level}</dd></div><div><dt>宠物</dt><dd>{pet || "没有宠物"}</dd></div></dl></div>
        </div>
      </section>
      <PythonPlayground key={`${level}-${pet}`} initialCode={`hero = {"名字": "露娜", "等级": 3}\n\nhero["等级"] = ${level}\nhero["宠物"] = "${pet}"\n\nprint(hero)`} title="修改并增加字典资料" prompt="再增加一个“金币”标签。" />
    </LessonFrame>
  );
}
