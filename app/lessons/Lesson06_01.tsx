"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson06_01() {
  const [text, setText] = useState("月亮小猫");
  const [counted, setCounted] = useState(false);
  const characters = Array.from(text);
  const code = useMemo(
    () => `message = "${text.replaceAll('"', "")}"\n\nprint(len(message))`,
    [text],
  );

  return (
    <LessonFrame
      chapter="第 6 章 · 文字的秘密"
      lesson="01"
      title="文字也有长度"
      lead="一段文字像一列小火车，每个字符都是一节车厢。len() 可以数出一共有几节。"
      goal="len(文字) 会告诉我们这段文字包含多少个字符。"
      closing="空格、数字和标点，也会各占一个字符的位置。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>数一数</span>
          <div>
            <h2>字符小火车有多长？</h2>
            <p>输入一小段文字，先自己数，再让 len() 公布答案。</p>
          </div>
        </div>
        <div className="length-lab">
          <div className="length-control">
            <label>
              写一段短文字
              <input
                value={text}
                maxLength={10}
                onChange={(event) => {
                  setText(event.target.value);
                  setCounted(false);
                }}
              />
            </label>
            <code>len(&quot;{text}&quot;)</code>
            <button type="button" onClick={() => setCounted(true)}>让 len() 数一数</button>
          </div>
          <div className="character-train">
            <div>
              {characters.length === 0 ? (
                <p>还没有车厢</p>
              ) : (
                characters.map((character, index) => (
                  <span className={counted ? "counted" : ""} key={`${character}-${index}`}>
                    <small>{counted ? index + 1 : "?"}</small>
                    <strong>{character === " " ? "空格" : character}</strong>
                  </span>
                ))
              )}
            </div>
            <strong className={counted ? "revealed" : ""}>
              {counted ? `长度是 ${characters.length}` : "答案先藏起来"}
            </strong>
          </div>
        </div>
      </section>

      <section className="notice-strip">
        <b>字符是什么？</b>
        <p>一个汉字、一个英文字母、一个数字、一个空格，都可以算作一个字符。</p>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="让 Python 测量文字长度"
        prompt="加入一个空格或感叹号，再运行一次看看长度怎样变化。"
      />
    </LessonFrame>
  );
}
