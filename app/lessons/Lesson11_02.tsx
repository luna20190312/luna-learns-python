"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson11_02() {
  const [textNumber, setTextNumber] = useState("12");
  const [converted, setConverted] = useState(false);
  const valid = /^-?\d+$/.test(textNumber);
  return (
    <LessonFrame chapter="高阶第 1 章 · 通往完整 Python" lesson="02" title="数据变身术"
      lead="input() 得到的总是文字。想参加数字计算，要先用 int() 或 float() 把它转换。"
      goal="int() 变成整数，float() 变成小数，str() 变成文字。"
      closing="转换不是改变外表，而是让 Python 用另一种类型理解数据。">
      <section className="activity-card">
        <div className="activity-heading"><span>变身实验</span><div><h2>让文字数字参加计算</h2><p>先输入文字，再转换成整数加 5。</p></div></div>
        <div className="conversion-lab">
          <label>input() 得到的文字<input value={textNumber} onChange={(e) => { setTextNumber(e.target.value); setConverted(false); }} /></label>
          <div className="conversion-flow"><span>&quot;{textNumber}&quot;<small>str</small></span><i>int()</i><span>{converted && valid ? Number(textNumber) : "?"}<small>int</small></span><i>+ 5</i><strong>{converted && valid ? Number(textNumber) + 5 : "?"}</strong></div>
          <button type="button" onClick={() => setConverted(true)}>执行类型转换</button>
          {converted && !valid && <p>这段文字里不只有整数数字，所以 int() 无法转换。</p>}
        </div>
      </section>
      <PythonPlayground initialCode={`answer = input("请输入一个整数：")\nnumber = int(answer)\n\nprint(number + 5)\nprint(str(number) + " 是转换后的数字")`} title="把输入文字转换成整数" prompt="输入一个整数，观察转换前后可以进行的操作。" inputDefaults={[{ label: "输入内容", value: textNumber }]} />
    </LessonFrame>
  );
}
