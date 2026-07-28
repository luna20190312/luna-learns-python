"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const friends = ["贝琪", "小雨", "安安"];

export default function Lesson04_03() {
  const [name, setName] = useState("贝琪");
  const [message, setMessage] = useState("");
  const code = useMemo(
    () => `def greet(name):\n    print("你好，" + name + "！")\n\ngreet("${name || "神秘朋友"}")`,
    [name],
  );

  return (
    <LessonFrame
      chapter="第 4 章 · 把代码变成自己的指令"
      lesson="03"
      title="给函数送一份礼物"
      lead="如果函数每次都只能说同一句话，就不够灵活。参数可以把不同的信息送进函数。"
      goal="参数是函数收到的数据，调用时要把具体内容放进括号。"
      closing="name 是参数，调用函数时送进去的名字叫参数值。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>参数快递</span>
          <div>
            <h2>把朋友的名字送进函数</h2>
            <p>换一个名字，同一个 greet() 函数就会说出不同的话。</p>
          </div>
        </div>
        <div className="parameter-lab">
          <div className="parameter-sender">
            <label>
              写一个名字
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setMessage("");
                }}
              />
            </label>
            <div className="friend-picks">
              {friends.map((friend) => (
                <button
                  className={name === friend ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setName(friend);
                    setMessage("");
                  }}
                  key={friend}
                >
                  {friend}
                </button>
              ))}
            </div>
            <div className="parameter-package">
              <span>参数包裹</span>
              <strong>{name || "空"}</strong>
            </div>
            <button
              className="send-parameter"
              type="button"
              onClick={() => setMessage(`你好，${name || "神秘朋友"}！`)}
            >
              送进 greet()
            </button>
          </div>
          <div className={`parameter-function ${message ? "received" : ""}`}>
            <code>def greet(name):</code>
            <code>　print(&quot;你好，&quot; + name + &quot;！&quot;)</code>
            <div className="function-mail-slot">
              <small>name 收到</small>
              <strong>{message ? name || "神秘朋友" : "等待参数"}</strong>
            </div>
            <p aria-live="polite">{message || "函数还没有收到名字"}</p>
          </div>
        </div>
      </section>

      <section className="parameter-route">
        <code>greet(&quot;{name || "贝琪"}&quot;)</code>
        <i>→</i>
        <code>name = &quot;{name || "贝琪"}&quot;</code>
        <i>→</i>
        <strong>你好，{name || "贝琪"}！</strong>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="让一个函数问候不同的人"
        prompt="再增加两次 greet() 调用，每次送入不同的名字。"
      />
    </LessonFrame>
  );
}
