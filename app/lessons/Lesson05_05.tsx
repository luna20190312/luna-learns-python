"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const items = ["地图", "钥匙", "药水", "宝石"];

export default function Lesson05_05() {
  const [step, setStep] = useState(0);
  const currentIndex = step === 0 ? -1 : Math.min(step - 1, items.length - 1);

  return (
    <LessonFrame
      chapter="第 5 章 · 一次记住很多东西"
      lesson="05"
      title="逐个查看背包"
      lead="列表和 for 循环是很好的搭档。循环每走一轮，就从列表中拿出下一项。"
      goal="for item in backpack 会按顺序把每一项放进变量 item。"
      closing="遍历就是从头到尾，逐个处理列表里的每一项。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>遍历慢镜头</span>
          <div>
            <h2>一次检查一件宝物</h2>
            <p>点击下一轮，观察 item 变量里装的是谁。</p>
          </div>
        </div>
        <div className="traverse-lab">
          <div className="traverse-code">
            <code>for item in backpack:</code>
            <code className="indented">print(&quot;检查&quot;, item)</code>
            <div className="item-variable">
              <small>变量 item</small>
              <strong>{currentIndex < 0 ? "空" : items[currentIndex]}</strong>
            </div>
            <button
              type="button"
              disabled={step === items.length}
              onClick={() => setStep((value) => Math.min(items.length, value + 1))}
            >
              {step === items.length ? "遍历完成" : `执行第 ${step + 1} 轮`}
            </button>
            <button className="list-reset" type="button" onClick={() => setStep(0)}>
              重新遍历
            </button>
          </div>
          <div className="traverse-stage">
            <div className="traverse-items">
              {items.map((item, index) => (
                <div
                  className={
                    index === currentIndex ? "current" : index < currentIndex ? "done" : ""
                  }
                  key={item}
                >
                  <small>{index}</small>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <div className="traverse-output">
              {step === 0 ? (
                <p>还没有开始检查</p>
              ) : (
                items.slice(0, step).map((item) => <code key={item}>检查 {item}</code>)
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="traverse-route">
        {items.map((item, index) => (
          <span className={index < step ? "passed" : ""} key={item}>
            {item}{index < items.length - 1 ? " →" : ""}
          </span>
        ))}
      </section>

      <PythonPlayground
        initialCode={`backpack = ["地图", "钥匙", "药水", "宝石"]\n\nfor item in backpack:\n    print("检查", item)\n\nprint("全部检查完毕")`}
        title="让 Python 自动检查整个列表"
        prompt="在列表末尾再加一项，不需要修改循环也能处理它。"
      />
    </LessonFrame>
  );
}
