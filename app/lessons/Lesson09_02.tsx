"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const marks = ["右括号 )", "结束引号 \"", "冒号 :"];

export default function Lesson09_02() {
  const [found, setFound] = useState<string[]>([]);
  function toggle(mark: string) { setFound((items) => items.includes(mark) ? items.filter((x) => x !== mark) : [...items, mark]); }
  return (
    <LessonFrame chapter="第 9 章 · 成为代码侦探" lesson="02" title="消失的标点符号"
      lead="括号、引号和冒号虽然很小，却像门扣一样重要。少一个，Python 就不知道句子在哪里结束。"
      goal="看到 SyntaxError，先检查这一行附近的括号、引号和冒号。"
      closing="语法错误常常只是少了一个小标点。">
      <section className="activity-card">
        <div className="activity-heading"><span>标点搜查</span><div><h2>找回三个逃跑的标点</h2><p>点击缺少的标点，把它们送回代码。</p></div></div>
        <div className="punctuation-lab">
          <div className="punctuation-code"><code>print(&quot;准备出发！&quot;{found.includes("右括号 )") ? ")" : "□"}</code><code>weather = &quot;晴天{found.includes("结束引号 \"") ? "\"" : "□"}</code><code>if weather == &quot;晴天&quot;{found.includes("冒号 :") ? ":" : "□"}</code><code>　print(&quot;戴帽子&quot;)</code></div>
          <div className="missing-marks">{marks.map((mark) => <button className={found.includes(mark) ? "found" : ""} type="button" onClick={() => toggle(mark)} key={mark}>{found.includes(mark) ? "✓ 已放回" : `找回 ${mark}`}</button>)}<strong>{found.length} / 3 已修复</strong></div>
        </div>
      </section>
      <PythonPlayground initialCode={`print("准备出发！")\nweather = "晴天"\n\nif weather == "晴天":\n    print("戴帽子")`} title="运行标点完整的代码" prompt="一次删掉一个标点，观察不同错误信息。" />
    </LessonFrame>
  );
}
