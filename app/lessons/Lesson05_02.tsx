"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const backpack = [
  { name: "地图", icon: "🗺️" },
  { name: "钥匙", icon: "🗝️" },
  { name: "药水", icon: "🧪" },
  { name: "宝石", icon: "💎" },
];

export default function Lesson05_02() {
  const [index, setIndex] = useState<number | null>(null);
  const code = useMemo(
    () =>
      `backpack = ["地图", "钥匙", "药水", "宝石"]\n\nprint(backpack[${index ?? 0}])`,
    [index],
  );

  return (
    <LessonFrame
      chapter="第 5 章 · 一次记住很多东西"
      lesson="02"
      title="找到第几个宝物"
      lead="列表里的每个位置都有编号。Python 从 0 开始数，所以第一件宝物的下标是 0。"
      goal="列表下标写在方括号里，而且第一个位置是 0。"
      closing="backpack[0] 是第一项，backpack[1] 才是第二项。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>下标实验</span>
          <div>
            <h2>按编号取出宝物</h2>
            <p>点击 0、1、2、3，看看 Python 找到哪一项。</p>
          </div>
        </div>
        <div className="index-lab">
          <div className="indexed-list">
            {backpack.map((item, itemIndex) => (
              <button
                className={index === itemIndex ? "selected" : ""}
                type="button"
                onClick={() => setIndex(itemIndex)}
                key={item.name}
              >
                <small>下标 {itemIndex}</small>
                <span>{item.icon}</span>
                <strong>{item.name}</strong>
              </button>
            ))}
          </div>
          <div className="index-reader">
            <code>backpack[<strong>{index === null ? "?" : index}</strong>]</code>
            <i aria-hidden="true">↓</i>
            <div className={index !== null ? "found" : ""}>
              <span>{index === null ? "?" : backpack[index].icon}</span>
              <strong>{index === null ? "等待选择下标" : backpack[index].name}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="zero-warning">
        <strong>为什么从 0 开始？</strong>
        <div>
          <span><b>0</b> 第一格</span>
          <span><b>1</b> 向后走一格</span>
          <span><b>2</b> 向后走两格</span>
        </div>
        <p>把下标想成“从第一格向后走了几步”，0 就是一步也没有走。</p>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="让 Python 按下标取宝物"
        prompt="试试 0 到 3。再故意输入 4，看看错误信息告诉了你什么。"
      />
    </LessonFrame>
  );
}
