"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson06_02() {
  const [text, setText] = useState("贝琪学Python");
  const [index, setIndex] = useState(0);
  const characters = Array.from(text);
  const safeIndex = Math.min(index, Math.max(0, characters.length - 1));
  const code = useMemo(
    () => `message = "${text.replaceAll('"', "")}"\n\nprint(message[${safeIndex}])`,
    [safeIndex, text],
  );

  return (
    <LessonFrame
      chapter="第 6 章 · 文字的秘密"
      lesson="02"
      title="找到文字中的字符"
      lead="文字也有下标，和列表一样从 0 开始。我们可以按位置取出其中一个字符。"
      goal="文字[下标] 会取出指定位置的一个字符。"
      closing="字符串和列表一样，第一个位置的下标都是 0。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>找字符</span>
          <div>
            <h2>点击一节文字车厢</h2>
            <p>每个字符上方都有下标，点击以后把它单独取出来。</p>
          </div>
        </div>
        <div className="string-index-lab">
          <label>
            修改文字
            <input
              value={text}
              maxLength={10}
              onChange={(event) => {
                setText(event.target.value);
                setIndex(0);
              }}
            />
          </label>
          <div className="string-slots">
            {characters.map((character, itemIndex) => (
              <button
                className={safeIndex === itemIndex ? "selected" : ""}
                type="button"
                onClick={() => setIndex(itemIndex)}
                key={`${character}-${itemIndex}`}
              >
                <small>{itemIndex}</small>
                <strong>{character === " " ? "空格" : character}</strong>
              </button>
            ))}
          </div>
          <div className="string-index-result">
            <code>message[{characters.length ? safeIndex : "?"}]</code>
            <i>→</i>
            <strong>{characters[safeIndex] ?? "没有字符"}</strong>
          </div>
        </div>
      </section>

      <section className="string-list-link">
        <div><strong>列表</strong><code>backpack[0]</code><span>取出第一件物品</span></div>
        <div><strong>文字</strong><code>message[0]</code><span>取出第一个字符</span></div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="让 Python 取出一个字符"
        prompt="改变方括号里的数字，找出最后一个字符。"
      />
    </LessonFrame>
  );
}
