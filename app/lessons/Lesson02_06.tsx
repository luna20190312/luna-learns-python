"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

type DoorResult = "closed" | "wrong" | "weak" | "open";

export default function Lesson02_06() {
  const [name, setName] = useState("贝琪");
  const [password, setPassword] = useState("星光");
  const [energy, setEnergy] = useState(70);
  const [result, setResult] = useState<DoorResult>("closed");

  const code = useMemo(
    () => `name = input("你的名字是？")\npassword = input("魔法口令是？")\nenergy = ${energy}\n\nif password != "星光":\n    print("口令不正确，门没有打开。")\nelif energy < 50:\n    print("口令正确，但能量不足。")\nelse:\n    print(name + "，魔法门打开了！")`,
    [energy],
  );

  function tryDoor() {
    if (password !== "星光") setResult("wrong");
    else if (energy < 50) setResult("weak");
    else setResult("open");
  }

  const resultText = {
    closed: "门正在等待挑战",
    wrong: "口令不正确，门没有打开。",
    weak: "口令正确，但能量不足。",
    open: `${name || "冒险者"}，魔法门打开了！`,
  }[result];

  return (
    <LessonFrame
      chapter="第 2 章 · 让程序学会选择"
      lesson="06"
      title="魔法门闯关"
      lead="把输入、比较和三个分支组合起来，设计一个真的会判断通关条件的小程序。"
      goal="复杂的作品，也是由一次次输入、比较和选择组成的。"
      closing="程序先获得信息，再检查条件，最后选择一条道路。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>最终任务</span>
          <div>
            <h2>打开魔法门</h2>
            <p>正确口令是“星光”，能量至少需要 50。</p>
          </div>
        </div>
        <div className="door-challenge">
          <div className="door-form">
            <label>
              冒险者名字
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setResult("closed");
                }}
              />
            </label>
            <label>
              魔法口令
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setResult("closed");
                }}
              />
            </label>
            <label>
              能量：<strong>{energy}</strong>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={energy}
                onChange={(event) => {
                  setEnergy(Number(event.target.value));
                  setResult("closed");
                }}
              />
            </label>
            <button onClick={tryDoor}>尝试开门</button>
          </div>
          <div className={`magic-door ${result}`}>
            <div className="door-stars" aria-hidden="true">✦　·　✧</div>
            <div className="door-body">
              <span>{result === "open" ? "✦" : "?"}</span>
            </div>
            <strong>{resultText}</strong>
          </div>
        </div>
      </section>

      <section className="decision-trace">
        <div className={result === "wrong" ? "matched" : ""}>
          <span>1</span>
          <code>口令不正确？</code>
        </div>
        <i>→</i>
        <div className={result === "weak" ? "matched" : ""}>
          <span>2</span>
          <code>能量小于 50？</code>
        </div>
        <i>→</i>
        <div className={result === "open" ? "matched" : ""}>
          <span>3</span>
          <code>通过！</code>
        </div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="运行魔法门的真正程序"
        prompt="改变输入和能量，测试三种不同结果。"
        inputDefaults={[
          { label: "名字", value: name },
          { label: "口令", value: password },
        ]}
      />
    </LessonFrame>
  );
}
