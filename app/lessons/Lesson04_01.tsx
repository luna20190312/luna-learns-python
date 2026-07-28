"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson04_01() {
  const [defined, setDefined] = useState(false);
  const [callCount, setCallCount] = useState(0);

  function reset() {
    setDefined(false);
    setCallCount(0);
  }

  return (
    <LessonFrame
      chapter="第 4 章 · 把代码变成自己的指令"
      lesson="01"
      title="给一段代码起名字"
      lead="Python 已经认识 print()。现在，用 def 创造一条属于自己的新指令。"
      goal="def 会把一组代码收进函数，并给它起一个名字。"
      closing="定义函数是在教会计算机一条新指令，还不是执行它。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>函数诞生</span>
          <div>
            <h2>教机器人学会打招呼</h2>
            <p>先定义，再调用。注意：只定义时，机器人不会开口。</p>
          </div>
        </div>
        <div className="function-birth-lab">
          <div className="function-code">
            <code className={defined ? "learned" : ""}>def say_hello():</code>
            <code className={`indented ${defined ? "learned" : ""}`}>
              print(&quot;你好，贝琪！&quot;)
            </code>
            <code className={callCount > 0 ? "calling" : ""}>say_hello()</code>
            <div className="function-actions">
              <button
                type="button"
                disabled={defined}
                onClick={() => setDefined(true)}
              >
                {defined ? "已经学会" : "① 定义函数"}
              </button>
              <button
                type="button"
                disabled={!defined}
                onClick={() => setCallCount((value) => value + 1)}
              >
                ② 调用函数
              </button>
              <button className="quiet-button" type="button" onClick={reset}>
                重来
              </button>
            </div>
          </div>
          <div className={`hello-robot ${defined ? "ready" : ""}`}>
            <div className="robot-face" aria-hidden="true">
              <i />
              <i />
              <span>▿</span>
            </div>
            <strong>
              {!defined
                ? "还不认识 say_hello"
                : callCount === 0
                  ? "已经学会，等待调用"
                  : "你好，贝琪！"}
            </strong>
            <small>
              {callCount === 0
                ? "输出区还是空的"
                : `say_hello() 已调用 ${callCount} 次`}
            </small>
            <div className="hello-output" aria-live="polite">
              {Array.from({ length: callCount }, (_, index) => (
                <span key={index}>你好，贝琪！</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="definition-map">
        <div><code>def</code><span>我要定义一条新指令</span></div>
        <div><code>say_hello</code><span>新指令的名字</span></div>
        <div><code>() :</code><span>括号和冒号不能漏</span></div>
      </section>

      <PythonPlayground
        initialCode={`def say_hello():\n    print("你好，贝琪！")\n\nsay_hello()`}
        title="定义并调用第一条新指令"
        prompt="先删掉最后一行运行，再加回来，比较两次结果。"
      />
    </LessonFrame>
  );
}
