"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson04_04() {
  const [first, setFirst] = useState(4);
  const [second, setSecond] = useState(3);
  const [answer, setAnswer] = useState<number | null>(null);
  const code = useMemo(
    () => `def add(a, b):\n    answer = a + b\n    return answer\n\nscore = add(${first}, ${second})\nprint("得到的分数是", score)`,
    [first, second],
  );

  return (
    <LessonFrame
      chapter="第 4 章 · 把代码变成自己的指令"
      lesson="04"
      title="函数把答案带回来"
      lead="有些函数不只完成动作，还会算出一个结果。return 会把这个结果送回调用函数的地方。"
      goal="return 会结束函数，并把一个结果交还给调用者。"
      closing="print() 显示答案，return 把答案带出函数。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>返回实验</span>
          <div>
            <h2>把两个数字送进加法机</h2>
            <p>函数在里面计算，再用 return 把答案送出来。</p>
          </div>
        </div>
        <div className="return-machine">
          <div className="return-inputs">
            <label>
              数字 a
              <input
                type="number"
                value={first}
                onChange={(event) => {
                  setFirst(Number(event.target.value));
                  setAnswer(null);
                }}
              />
            </label>
            <span>+</span>
            <label>
              数字 b
              <input
                type="number"
                value={second}
                onChange={(event) => {
                  setSecond(Number(event.target.value));
                  setAnswer(null);
                }}
              />
            </label>
          </div>
          <div className={`return-box ${answer !== null ? "working" : ""}`}>
            <code>def add(a, b):</code>
            <div><span>{first}</span><b>+</b><span>{second}</span></div>
            <code>return a + b</code>
            <button type="button" onClick={() => setAnswer(first + second)}>
              调用 add({first}, {second})
            </button>
          </div>
          <div className={`returned-value ${answer !== null ? "arrived" : ""}`}>
            <small>返回值</small>
            <strong>{answer === null ? "?" : answer}</strong>
            <code>score = {answer === null ? "等待" : answer}</code>
          </div>
        </div>
      </section>

      <section className="print-return-compare">
        <div><code>print(answer)</code><strong>把答案显示在屏幕上</strong><span>其他代码不一定能使用它</span></div>
        <div><code>return answer</code><strong>把答案交给函数外面</strong><span>可以保存、计算或继续传递</span></div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="接住函数返回的答案"
        prompt="修改两个数字，或者把加法改成乘法。"
      />
    </LessonFrame>
  );
}
