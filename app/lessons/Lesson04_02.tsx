"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const calls = [
  { name: "jump()", action: "跳起来", icon: "⬆️" },
  { name: "jump()", action: "再跳一次", icon: "⬆️" },
  { name: "jump()", action: "第三次跳跃", icon: "🏁" },
];

export default function Lesson04_02() {
  const [step, setStep] = useState(0);

  return (
    <LessonFrame
      chapter="第 4 章 · 把代码变成自己的指令"
      lesson="02"
      title="呼叫自己的指令"
      lead="函数定义一次以后，可以调用很多次。每写一次函数名和括号，就执行一次函数里的代码。"
      goal="函数只有被调用时才工作，而且可以被反复调用。"
      closing="定义写一次，调用可以写很多次。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>调用实验</span>
          <div>
            <h2>让小兔连续跳三次</h2>
            <p>点击下一条调用，观察程序怎样进入函数再回来。</p>
          </div>
        </div>
        <div className="call-stack-lab">
          <div className="call-list">
            <div className="function-definition-chip">
              <code>def jump():</code>
              <code>　print(&quot;跳！&quot;)</code>
            </div>
            {calls.map((call, index) => (
              <button
                className={index < step ? "done" : index === step ? "next" : ""}
                type="button"
                disabled={index !== step}
                onClick={() => setStep((value) => Math.min(calls.length, value + 1))}
                key={index}
              >
                <span>{index + 1}</span>
                <code>{call.name}</code>
                <small>{index < step ? "已执行" : index === step ? "下一条" : "等待"}</small>
              </button>
            ))}
            <button className="call-reset" type="button" onClick={() => setStep(0)}>
              从头再来
            </button>
          </div>
          <div className="call-stage">
            <span className={step > 0 && step < 3 ? "bouncing" : ""} aria-hidden="true">
              🐰
            </span>
            <strong>
              {step === 0 ? "等待第一条调用" : step === 3 ? "三次调用完成！" : calls[step - 1].action}
            </strong>
            <div className="call-route">
              <span>调用处</span><i>→</i><span>进入 jump</span><i>→</i><span>回到下一行</span>
            </div>
            <div className="call-output">
              {Array.from({ length: step }, (_, index) => (
                <code key={index}>跳！</code>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="notice-strip">
        <b>括号是呼叫铃</b>
        <p>
          只写 <code>jump</code> 是函数的名字；写 <code>jump()</code> 才是在呼叫它工作。
        </p>
      </section>

      <PythonPlayground
        initialCode={`def jump():\n    print("跳！")\n\njump()\njump()\njump()`}
        title="让同一个函数工作三次"
        prompt="增加第四次调用，或者把函数里的动作换掉。"
      />
    </LessonFrame>
  );
}
