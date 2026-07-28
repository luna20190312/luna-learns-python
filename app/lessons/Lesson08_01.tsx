"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson08_01() {
  const [revealed, setRevealed] = useState(false);
  return (
    <LessonFrame chapter="第 8 章 · 给数据贴上名字" lesson="01" title="角色资料卡升级"
      lead="列表用位置找东西，字典用标签找东西。姓名、等级和技能都可以拥有自己的标签。"
      goal="字典用花括号包起来，每份资料由“键: 值”组成。"
      closing="键像资料标签，值是标签后面保存的内容。">
      <section className="activity-card">
        <div className="activity-heading"><span>资料卡</span><div><h2>翻开冒险者档案</h2><p>点击卡片，看看三份资料怎样装进一个字典。</p></div></div>
        <div className="dictionary-card-lab">
          <button className={`adventurer-card ${revealed ? "open" : ""}`} type="button" onClick={() => setRevealed(true)}>
            <span>🧙‍♀️</span><strong>{revealed ? "露娜" : "点击翻开"}</strong>
            {revealed && <dl><div><dt>名字</dt><dd>露娜</dd></div><div><dt>等级</dt><dd>3</dd></div><div><dt>技能</dt><dd>星光术</dd></div></dl>}
          </button>
          <div className="dictionary-code-card"><code>{"hero = {"}</code><code>　&quot;名字&quot;: &quot;露娜&quot;,</code><code>　&quot;等级&quot;: 3,</code><code>　&quot;技能&quot;: &quot;星光术&quot;</code><code>{"}"}</code></div>
        </div>
      </section>
      <section className="dict-anatomy"><div><code>&quot;名字&quot;</code><strong>键</strong><span>资料标签</span></div><i>:</i><div><code>&quot;露娜&quot;</code><strong>值</strong><span>保存的内容</span></div></section>
      <PythonPlayground initialCode={`hero = {\n    "名字": "露娜",\n    "等级": 3,\n    "技能": "星光术"\n}\n\nprint(hero)`} title="建立第一张字典资料卡" prompt="增加一个“宠物”标签，记得用冒号和逗号。" />
    </LessonFrame>
  );
}
