"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson05_03() {
  const [items, setItems] = useState(["地图", "钥匙"]);
  const [newItem, setNewItem] = useState("饼干");

  function appendItem() {
    const clean = newItem.trim();
    if (!clean || items.length >= 6) return;
    setItems((current) => [...current, clean]);
    setNewItem("");
  }

  const code = useMemo(
    () =>
      `backpack = ["地图", "钥匙"]\nbackpack.append("饼干")\n\nprint(backpack)`,
    [],
  );

  return (
    <LessonFrame
      chapter="第 5 章 · 一次记住很多东西"
      lesson="03"
      title="把新宝物放进去"
      lead="列表创建以后还可以继续变长。append() 会把一项新内容放到列表的最后面。"
      goal="列表名.append(新内容) 会在列表末尾增加一项。"
      closing="append() 每调用一次，就在列表最后增加一项。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>追加实验</span>
          <div>
            <h2>给背包增加新物品</h2>
            <p>写下物品名再点击 append()，注意它总是出现在最后。</p>
          </div>
        </div>
        <div className="append-lab">
          <div className="append-control">
            <label>
              要增加什么？
              <input
                value={newItem}
                maxLength={8}
                onChange={(event) => setNewItem(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") appendItem();
                }}
              />
            </label>
            <code>backpack.append(&quot;{newItem || "新物品"}&quot;)</code>
            <button type="button" disabled={!newItem.trim() || items.length >= 6} onClick={appendItem}>
              执行 append()
            </button>
            <button
              className="list-reset"
              type="button"
              onClick={() => {
                setItems(["地图", "钥匙"]);
                setNewItem("饼干");
              }}
            >
              恢复背包
            </button>
          </div>
          <div className="append-result">
            <div className="list-train">
              {items.map((item, index) => (
                <div className={index === items.length - 1 && index > 1 ? "new" : ""} key={`${item}-${index}`}>
                  <small>{index}</small>
                  <strong>{item}</strong>
                </div>
              ))}
              {items.length < 6 && <span>新的项会来到这里</span>}
            </div>
            <code>[{items.map((item) => `"${item}"`).join(", ")}]</code>
            <strong>列表长度：{items.length}</strong>
          </div>
        </div>
      </section>

      <section className="notice-strip">
        <b>append 是动作</b>
        <p>
          点号表示“让这个列表做一件事”。<code>backpack.append()</code> 就是让 backpack 把新内容装进去。
        </p>
      </section>

      <PythonPlayground
        initialCode={code}
        title="让 Python 追加一件宝物"
        prompt="再写两行 append()，看看列表会按什么顺序变长。"
      />
    </LessonFrame>
  );
}
