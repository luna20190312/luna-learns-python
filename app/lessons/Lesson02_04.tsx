"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson02_04() {
  const [answer, setAnswer] = useState<"带了" | "没带" | null>(null);

  return (
    <LessonFrame
      chapter="第 2 章 · 让程序学会选择"
      lesson="04"
      title="两条不同的道路"
      lead="当条件不成立时，程序不必什么都不做。else 可以带它走另一条路。"
      goal="if 和 else 是二选一，只会执行其中一个分支。"
      closing="条件成立走 if，不成立就走 else。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>岔路实验</span>
          <div>
            <h2>你带钥匙了吗？</h2>
            <p>做出选择，看看角色走向哪边。</p>
          </div>
        </div>
        <div className="road-lab">
          <div className="key-choice">
            <button
              className={answer === "带了" ? "active" : ""}
              onClick={() => setAnswer("带了")}
            >
              🔑 带了钥匙
            </button>
            <button
              className={answer === "没带" ? "active" : ""}
              onClick={() => setAnswer("没带")}
            >
              🙌 没带钥匙
            </button>
          </div>
          <div className="road-map">
            <div className={answer === "带了" ? "chosen" : ""}>
              <span>🏰</span>
              <strong>if 道路</strong>
              <p>打开城堡大门</p>
            </div>
            <i aria-hidden="true">◆</i>
            <div className={answer === "没带" ? "chosen" : ""}>
              <span>🌲</span>
              <strong>else 道路</strong>
              <p>去森林寻找入口</p>
            </div>
          </div>
          <p className="road-result">
            {answer === null
              ? "请选择是否带了钥匙"
              : answer === "带了"
                ? "门打开了，只执行 if 里的代码。"
                : "门没有打开，只执行 else 里的代码。"}
          </p>
        </div>
      </section>

      <section className="branch-code">
        <code>if answer == &quot;带了&quot;:</code>
        <code className={answer === "带了" ? "running" : ""}>　print(&quot;门打开了&quot;)</code>
        <code>else:</code>
        <code className={answer === "没带" ? "running" : ""}>　print(&quot;寻找另一条路&quot;)</code>
      </section>

      <PythonPlayground
        initialCode={`answer = input("你带钥匙了吗？")\n\nif answer == "带了":\n    print("门打开了！")\nelse:\n    print("去森林寻找另一条路。")`}
        title="把答案交给 Python"
        prompt="把输入改成“带了”或“没带”，比较输出。"
        inputDefaults={[{ label: "钥匙回答", value: answer ?? "带了" }]}
      />
    </LessonFrame>
  );
}
