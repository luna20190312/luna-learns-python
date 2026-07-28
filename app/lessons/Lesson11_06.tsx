"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson11_06() {
  const [answer, setAnswer] = useState("十二");
  const [checked, setChecked] = useState(false);
  const valid = /^-?\d+$/.test(answer);
  return (
    <LessonFrame chapter="高阶 第 11 章 · 通往完整 Python" lesson="06" title="程序出错也能继续"
      lead="使用者可能输入意外内容。try 先尝试，except 在失败时接住错误并给出友好提示。"
      goal="try / except 可以处理预料得到的错误，让程序安全继续。"
      closing="不是隐藏所有错误，而是接住我们知道怎样处理的错误。">
      <section className="activity-card">
        <div className="activity-heading"><span>安全网实验</span><div><h2>接住不能转换的文字</h2><p>输入整数或普通文字，看看程序走向 try 还是 except。</p></div></div>
        <div className="exception-lab">
          <label>准备转换的内容<input value={answer} onChange={(e) => { setAnswer(e.target.value); setChecked(false); }} /></label>
          <button type="button" onClick={() => setChecked(true)}>尝试 int(answer)</button>
          <div className={checked ? (valid ? "try-path" : "except-path") : ""}><span>{!checked ? "?" : valid ? "try" : "except"}</span><strong>{!checked ? "等待尝试" : valid ? `转换成功：${Number(answer)}` : "转换失败：请输入整数数字"}</strong></div>
        </div>
      </section>
      <PythonPlayground key={answer} initialCode={`answer = input("请输入一个整数：")\n\ntry:\n    number = int(answer)\n    print("转换成功：", number)\nexcept ValueError:\n    print("转换失败：请输入整数数字")\n\nprint("程序安全结束")`} title="用 try / except 接住错误" prompt="分别输入 12 和 十二，观察两条不同路线。" inputDefaults={[{ label: "输入内容", value: answer }]} />
    </LessonFrame>
  );
}
