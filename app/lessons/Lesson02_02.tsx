"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson02_02() {
  const [left, setLeft] = useState("小猫");
  const [right, setRight] = useState("小猫");
  const [operator, setOperator] = useState<"==" | "!=">("==");
  const [prediction, setPrediction] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const result = operator === "==" ? left === right : left !== right;
  const code = useMemo(
    () => `left = "${left}"\nright = "${right}"\n\nprint(left ${operator} right)`,
    [left, right, operator],
  );

  function changeValue(setter: (value: string) => void, value: string) {
    setter(value);
    setRevealed(false);
    setPrediction(null);
  }

  return (
    <LessonFrame
      chapter="第 2 章 · 让程序学会选择"
      lesson="02"
      title="这两个一样吗？"
      lead="程序可以比较两个东西。比较结束后，它只会举起 True 或 False 其中一张牌。"
      goal="== 用来比较是否相同，结果是 True 或 False。"
      closing="一个等号负责保存，两个等号负责比较。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>真假实验</span>
          <div>
            <h2>先猜，再翻牌</h2>
            <p>改变左右两边，选择比较方法。</p>
          </div>
        </div>
        <div className="comparison-lab">
          <input
            aria-label="比较左边"
            value={left}
            onChange={(event) => changeValue(setLeft, event.target.value)}
          />
          <div className="comparison-operator">
            {(["==", "!="] as const).map((item) => (
              <button
                className={operator === item ? "active" : ""}
                onClick={() => {
                  setOperator(item);
                  setPrediction(null);
                  setRevealed(false);
                }}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <input
            aria-label="比较右边"
            value={right}
            onChange={(event) => changeValue(setRight, event.target.value)}
          />
          <span>→</span>
          <button
            className={`truth-card ${revealed ? (result ? "true" : "false") : ""}`}
            onClick={() => setRevealed(true)}
          >
            {revealed ? String(result) : "翻牌"}
          </button>
        </div>
        <div className="prediction-row">
          <span>你猜结果是：</span>
          <button
            className={prediction === true ? "chosen" : ""}
            onClick={() => setPrediction(true)}
          >
            True
          </button>
          <button
            className={prediction === false ? "chosen" : ""}
            onClick={() => setPrediction(false)}
          >
            False
          </button>
          {revealed && prediction !== null && (
            <strong>{prediction === result ? "猜对了！" : "和猜想不一样，再看看两边。"}</strong>
          )}
        </div>
      </section>

      <section className="symbol-compare">
        <div>
          <code>score = 10</code>
          <strong>保存</strong>
          <p>把 10 放进 score</p>
        </div>
        <div>
          <code>score == 10</code>
          <strong>比较</strong>
          <p>score 里面是 10 吗？</p>
        </div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="让 Python 举起真假牌"
        prompt="试试把 == 改成 !=。"
      />
    </LessonFrame>
  );
}
