"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const entries = [["名字", "露娜"], ["等级", "3"], ["技能", "星光术"], ["宠物", "月兔"]];

export default function Lesson08_04() {
  const [step, setStep] = useState(0);
  return (
    <LessonFrame chapter="第 8 章 · 给数据贴上名字" lesson="04" title="查看所有资料"
      lead="items() 会把字典中的键和值一对一对交给循环，让程序逐项查看整张资料卡。"
      goal="for key, value in 字典.items() 可以同时得到键和值。"
      closing="items() 把字典变成一对一对的资料，交给循环处理。">
      <section className="activity-card">
        <div className="activity-heading"><span>逐项检查</span><div><h2>一次读一行资料</h2><p>点击下一项，看 key 和 value 分别装进什么。</p></div></div>
        <div className="dict-traverse-lab">
          <div className="dict-pair-box"><div><small>key</small><strong>{step ? entries[step - 1][0] : "空"}</strong></div><div><small>value</small><strong>{step ? entries[step - 1][1] : "空"}</strong></div><button type="button" disabled={step === entries.length} onClick={() => setStep((v) => v + 1)}>{step === entries.length ? "检查完毕" : `读取第 ${step + 1} 项`}</button><button className="quiet-button" type="button" onClick={() => setStep(0)}>重来</button></div>
          <div className="dict-output">{entries.map(([key, value], i) => <p className={i < step ? "visible" : ""} key={key}>{i < step ? `${key}：${value}` : "等待读取"}</p>)}</div>
        </div>
      </section>
      <PythonPlayground initialCode={`hero = {"名字": "露娜", "等级": 3, "技能": "星光术", "宠物": "月兔"}\n\nfor key, value in hero.items():\n    print(key, "：", value)`} title="让 Python 读取整张字典" prompt="增加一个新标签，循环不需要修改也能显示它。" />
    </LessonFrame>
  );
}
