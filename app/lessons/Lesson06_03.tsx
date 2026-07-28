"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

type LetterMode = "original" | "upper" | "lower";

export default function Lesson06_03() {
  const [text, setText] = useState("Luna learns Python");
  const [mode, setMode] = useState<LetterMode>("original");
  const result =
    mode === "upper" ? text.toUpperCase() : mode === "lower" ? text.toLowerCase() : text;
  const method = mode === "upper" ? "upper()" : mode === "lower" ? "lower()" : "原文字";
  const code = useMemo(
    () => `message = "${text.replaceAll('"', "")}"\n\nprint(message.upper())\nprint(message.lower())`,
    [text],
  );

  return (
    <LessonFrame
      chapter="第 6 章 · 文字的秘密"
      lesson="03"
      title="大写、小写变变变"
      lead="英文字符有大写和小写。upper() 和 lower() 像两颗文字变形按钮。"
      goal="upper() 变成大写，lower() 变成小写；原来的文字不会被改坏。"
      closing="字符串动作写在点号后面，例如 message.upper()。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>变形实验</span>
          <div>
            <h2>按下文字变形按钮</h2>
            <p>这些动作会改变英文字母，汉字和空格会保持原样。</p>
          </div>
        </div>
        <div className="case-lab">
          <label>
            输入含有英文的文字
            <input value={text} maxLength={24} onChange={(event) => setText(event.target.value)} />
          </label>
          <div className="case-buttons">
            <button className={mode === "original" ? "active" : ""} type="button" onClick={() => setMode("original")}>原样</button>
            <button className={mode === "upper" ? "active" : ""} type="button" onClick={() => setMode("upper")}>upper()</button>
            <button className={mode === "lower" ? "active" : ""} type="button" onClick={() => setMode("lower")}>lower()</button>
          </div>
          <div className={`case-screen ${mode}`}>
            <small>{method}</small>
            <strong>{result || "等待文字"}</strong>
          </div>
        </div>
      </section>

      <section className="case-compare">
        <div><code>&quot;Cat&quot;.upper()</code><strong>CAT</strong></div>
        <div><code>&quot;Cat&quot;.lower()</code><strong>cat</strong></div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="让 Python 改变英文大小写"
        prompt="修改 message 里的英文，再比较两行输出。"
      />
    </LessonFrame>
  );
}
