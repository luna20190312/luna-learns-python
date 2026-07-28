"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const treasures = [
  { name: "地图", icon: "🗺️" },
  { name: "钥匙", icon: "🗝️" },
  { name: "药水", icon: "🧪" },
  { name: "宝石", icon: "💎" },
];

export default function Lesson05_01() {
  const [packed, setPacked] = useState<string[]>([]);
  const code = useMemo(
    () =>
      `backpack = [${packed.map((name) => `"${name}"`).join(", ")}]\n\nprint(backpack)\nprint("背包里有", len(backpack), "件宝物")`,
    [packed],
  );

  function toggle(name: string) {
    setPacked((items) =>
      items.includes(name)
        ? items.filter((item) => item !== name)
        : [...items, name],
    );
  }

  return (
    <LessonFrame
      chapter="第 5 章 · 一次记住很多东西"
      lesson="01"
      title="装着宝物的背包"
      lead="一个变量只能记住一个值吗？列表像一只背包，可以按顺序装下很多件东西。"
      goal="方括号创建列表，列表中的每一项用逗号隔开。"
      closing="列表会把很多项按顺序装进同一个变量。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>背包实验</span>
          <div>
            <h2>点击宝物，把它装进列表</h2>
            <p>再次点击可以拿出来，观察列表代码怎样改变。</p>
          </div>
        </div>
        <div className="backpack-lab">
          <div className="treasure-shelf">
            {treasures.map((treasure) => (
              <button
                className={packed.includes(treasure.name) ? "packed" : ""}
                type="button"
                onClick={() => toggle(treasure.name)}
                key={treasure.name}
              >
                <span>{treasure.icon}</span>
                <strong>{treasure.name}</strong>
                <small>{packed.includes(treasure.name) ? "已装入" : "点击装入"}</small>
              </button>
            ))}
          </div>
          <div className="backpack">
            <div className="backpack-pocket">
              {packed.length === 0 ? (
                <p>背包还是空的</p>
              ) : (
                packed.map((name) => (
                  <span key={name}>
                    {treasures.find((item) => item.name === name)?.icon}
                  </span>
                ))
              )}
            </div>
            <strong>backpack</strong>
            <code>[{packed.map((name) => `"${name}"`).join(", ")}]</code>
            <small>{packed.length} 件宝物</small>
          </div>
        </div>
      </section>

      <section className="list-anatomy">
        <div><code>[　]</code><strong>方括号</strong><span>告诉 Python 这是一个列表</span></div>
        <div><code>&quot;地图&quot;</code><strong>列表项</strong><span>背包里的每一件东西</span></div>
        <div><code>,</code><strong>逗号</strong><span>把相邻的列表项分开</span></div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="运行自己刚刚装好的背包"
        prompt="在列表里手动增加一种新宝物，注意引号和逗号。"
      />
    </LessonFrame>
  );
}
