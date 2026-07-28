"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson06_04() {
  const [sentence, setSentence] = useState("小猫 在 月亮上 跳舞");
  const [split, setSplit] = useState(false);
  const words = sentence.trim() ? sentence.trim().split(/\s+/) : [];
  const code = useMemo(
    () => `sentence = "${sentence.replaceAll('"', "")}"\nwords = sentence.split()\n\nprint(words)`,
    [sentence],
  );

  return (
    <LessonFrame
      chapter="第 6 章 · 文字的秘密"
      lesson="04"
      title="拆开一句话"
      lead="一句话里如果用空格隔开词语，split() 就能沿着空格把它剪成一个列表。"
      goal="split() 会把一段文字拆成许多小段，并把它们装进列表。"
      closing="split() 的结果不是一段文字，而是一个列表。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>剪一剪</span>
          <div>
            <h2>沿着空格剪开句子</h2>
            <p>这节课特意在词语之间留了空格，剪刀会从这些位置下手。</p>
          </div>
        </div>
        <div className="split-lab">
          <label>
            修改句子，词语之间要留空格
            <input
              value={sentence}
              maxLength={28}
              onChange={(event) => {
                setSentence(event.target.value);
                setSplit(false);
              }}
            />
          </label>
          <div className={`sentence-strip ${split ? "split" : ""}`}>
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                <strong>{word}</strong>
                {index < words.length - 1 && <i aria-hidden="true">✂</i>}
              </span>
            ))}
          </div>
          <button type="button" onClick={() => setSplit(true)}>运行 split()</button>
          <div className="split-result">
            {!split ? (
              <p>拆开的词语会装进这里</p>
            ) : (
              words.map((word, index) => <span key={`${word}-${index}`}>{index}: {word}</span>)
            )}
          </div>
        </div>
      </section>

      <section className="split-flow">
        <div><strong>一段字符串</strong><code>&quot;小猫 在 跳舞&quot;</code></div>
        <i>→ split() →</i>
        <div><strong>一个列表</strong><code>[&quot;小猫&quot;, &quot;在&quot;, &quot;跳舞&quot;]</code></div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="让 Python 把句子拆成列表"
        prompt="在句子中增加一个带空格的新词语，再运行看看。"
      />
    </LessonFrame>
  );
}
