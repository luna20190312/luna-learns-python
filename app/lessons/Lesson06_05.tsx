"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson06_05() {
  const [message, setMessage] = useState("今晚带着星星地图去树屋");
  const [keyword, setKeyword] = useState("星星");
  const [searched, setSearched] = useState(false);
  const found = keyword.length > 0 && message.includes(keyword);
  const parts = found ? message.split(keyword) : [message];
  const code = useMemo(
    () =>
      `message = "${message.replaceAll('"', "")}"\nkeyword = "${keyword.replaceAll('"', "")}"\n\nif keyword in message:\n    print("找到了！")\nelse:\n    print("没有找到")`,
    [keyword, message],
  );

  return (
    <LessonFrame
      chapter="第 6 章 · 文字的秘密"
      lesson="05"
      title="检查秘密关键词"
      lead="in 像一只文字放大镜，可以检查一小段文字有没有藏在另一段文字里面。"
      goal="关键词 in 文字 会得到 True 或 False。"
      closing="in 负责寻找，if 可以根据寻找结果决定下一步。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>放大镜实验</span>
          <div>
            <h2>寻找秘密关键词</h2>
            <p>写下要找的词，点击以后才公布结果。</p>
          </div>
        </div>
        <div className="keyword-lab">
          <div className="keyword-controls">
            <label>整段消息<textarea value={message} onChange={(event) => { setMessage(event.target.value); setSearched(false); }} /></label>
            <label>要找的关键词<input value={keyword} onChange={(event) => { setKeyword(event.target.value); setSearched(false); }} /></label>
            <code>&quot;{keyword}&quot; in message</code>
            <button type="button" onClick={() => setSearched(true)}>🔍 开始寻找</button>
          </div>
          <div className={`keyword-result ${searched ? (found ? "found" : "missing") : ""}`}>
            <span className="magnifier" aria-hidden="true">🔍</span>
            <p>
              {searched && found ? (
                <>{parts[0]}<mark>{keyword}</mark>{parts.slice(1).join(keyword)}</>
              ) : message}
            </p>
            <strong>
              {!searched ? "等待寻找" : found ? "True · 找到了！" : "False · 没有找到"}
            </strong>
          </div>
        </div>
      </section>

      <section className="keyword-examples">
        <div><code>&quot;星&quot; in &quot;星空&quot;</code><strong>True</strong></div>
        <div><code>&quot;月&quot; in &quot;星空&quot;</code><strong>False</strong></div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="让 Python 检查关键词"
        prompt="更换 keyword，分别试出 True 和 False。"
      />
    </LessonFrame>
  );
}
