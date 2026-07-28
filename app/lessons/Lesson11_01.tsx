"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const values = [
  { code: "8", type: "int", meaning: "整数" },
  { code: "3.5", type: "float", meaning: "小数" },
  { code: '"月兔"', type: "str", meaning: "文字" },
  { code: "True", type: "bool", meaning: "真假" },
];

export default function Lesson11_01() {
  const [selected, setSelected] = useState(0);
  const value = values[selected];
  return (
    <LessonFrame chapter="高阶 第 11 章 · 通往完整 Python" lesson="01" title="数据也有不同种类"
      lead="数字、文字和真假看起来不同，Python 也会给它们分配不同的数据类型。"
      goal="int、float、str 和 bool 是四种常见的数据类型。"
      closing="数据类型告诉 Python：这个值是什么，以及它能参加什么操作。">
      <section className="activity-card">
        <div className="activity-heading"><span>类型标签机</span><div><h2>给数据贴上正确标签</h2><p>点击一个值，查看 type() 检查出的类型。</p></div></div>
        <div className="advanced-lab">
          <div className="advanced-choices">{values.map((item, index) => <button className={selected === index ? "active" : ""} type="button" onClick={() => setSelected(index)} key={item.code}><code>{item.code}</code><small>{item.meaning}</small></button>)}</div>
          <div className="type-scanner"><span>{value.code}</span><i>type()</i><strong>{value.type}</strong><small>{value.meaning}</small></div>
        </div>
      </section>
      <PythonPlayground key={value.code} initialCode={`value = ${value.code}\n\nprint(value)\nprint(type(value))`} title="让 Python 检查数据类型" prompt="分别试试整数、小数、文字和 True。" />
    </LessonFrame>
  );
}
