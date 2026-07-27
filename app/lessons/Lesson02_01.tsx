"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson02_01() {
  const [name, setName] = useState("贝琪");
  const [sent, setSent] = useState(false);

  return (
    <LessonFrame
      chapter="第 2 章 · 让程序学会选择"
      lesson="01"
      title="程序也会问问题"
      lead="以前程序只顾着往下说。现在，让它停下来听一听你的回答。"
      goal="input() 会暂停程序，等待使用者输入文字。"
      closing="input() 得到的回答，可以保存进变量。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>实验 1</span>
          <div>
            <h2>和机器人交换名字</h2>
            <p>先回答问题，它才会继续说下一句话。</p>
          </div>
        </div>
        <div className="chat-lab">
          <div className="chat-robot" aria-hidden="true">
            <span>◉</span>
            <b>◡</b>
          </div>
          <div className="chat-window">
            <p className="robot-message">🤖 你叫什么名字？</p>
            <div className="chat-answer">
              <input
                aria-label="告诉机器人你的名字"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setSent(false);
                }}
              />
              <button onClick={() => setSent(true)}>告诉它</button>
            </div>
            {sent && (
              <>
                <p className="child-message">{name || "……"}</p>
                <p className="robot-message">🤖 原来你叫{name || "神秘人"}！</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="input-steps">
        <div>
          <b>1</b>
          <code>input(&quot;你叫什么名字？&quot;)</code>
          <span>程序停下来等待</span>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <b>2</b>
          <code>name = 回答</code>
          <span>回答被放进变量</span>
        </div>
        <i aria-hidden="true">→</i>
        <div>
          <b>3</b>
          <code>print(name)</code>
          <span>程序继续向下执行</span>
        </div>
      </section>

      <PythonPlayground
        initialCode={`name = input("你叫什么名字？")\nprint("原来你叫" + name + "！")`}
        title="让真正的 Python 等待回答"
        prompt="修改问题，或者换一个输入答案。"
        inputDefaults={[{ label: "你的回答", value: name }]}
      />
    </LessonFrame>
  );
}
