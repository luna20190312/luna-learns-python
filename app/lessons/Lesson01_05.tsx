"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const scoreSteps = [
  { code: "score = 0", value: 0, text: "先把 0 放进 score 盒子" },
  { code: "score = score + 10", value: 10, text: "拿出旧分数，加 10，再放回去" },
  { code: "score = score + 5", value: 15, text: "再拿出来，加 5，再放回去" },
  { code: "print(score)", value: 15, text: "显示盒子里现在的数字" },
];

export default function Lesson01_05() {
  const [step, setStep] = useState(0);
  const visibleStep = Math.max(0, step - 1);

  return (
    <LessonFrame
      lesson="05"
      title="给数据一个名字"
      lead="变量像一个贴着名字的盒子。盒子里的东西可以取出来，也可以换成新的。"
      goal="等号会把右边的结果，放进左边名字对应的盒子。"
      closing="score = 10 是把数字 10 保存到名字 score 里。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>实验 1</span>
          <div>
            <h2>一步一步改变分数</h2>
            <p>每点一次，只执行一行代码。</p>
          </div>
        </div>
        <div className="variable-lab">
          <div className="variable-code">
            {scoreSteps.map((item, index) => (
              <div
                className={step === index + 1 ? "active" : step > index + 1 ? "done" : ""}
                key={item.code}
              >
                <b>{index + 1}</b>
                <code>{item.code}</code>
              </div>
            ))}
            <div className="step-actions">
              <button
                onClick={() => setStep((value) => Math.min(4, value + 1))}
                disabled={step === 4}
              >
                执行第 {Math.min(step + 1, 4)} 行
              </button>
              <button onClick={() => setStep(0)}>清空重来</button>
            </div>
          </div>
          <div className="variable-box">
            <span>盒子的名字</span>
            <strong>score</strong>
            <div>{step === 0 ? "空" : scoreSteps[visibleStep].value}</div>
            <p>{step === 0 ? "还没有执行代码" : scoreSteps[visibleStep].text}</p>
          </div>
        </div>
      </section>

      <section className="notice-strip warning">
        <b>等号不是提问</b>
        <p>
          <code>score = score + 10</code> 的意思不是左右相等，而是“算出右边，再存回左边”。
        </p>
      </section>

      <PythonPlayground
        initialCode={`score = 0\nscore = score + 10\nscore = score + 5\n\nprint("最后的分数是：")\nprint(score)`}
        title="自己改变得分规则"
        prompt="把 10 和 5 换成别的数字。"
      />
    </LessonFrame>
  );
}
