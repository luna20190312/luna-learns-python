"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson05_04() {
  const [items, setItems] = useState(["地图", "钥匙", "药水", "宝石"]);
  const [selected, setSelected] = useState(1);
  const [replacement, setReplacement] = useState("金钥匙");

  function replaceItem() {
    if (!items[selected] || !replacement.trim()) return;
    setItems((current) =>
      current.map((item, index) => (index === selected ? replacement.trim() : item)),
    );
  }

  function removeItem() {
    if (!items[selected]) return;
    setItems((current) => current.filter((_, index) => index !== selected));
    setSelected((value) => Math.max(0, Math.min(value, items.length - 2)));
  }

  return (
    <LessonFrame
      chapter="第 5 章 · 一次记住很多东西"
      lesson="04"
      title="宝物也能被拿走"
      lead="列表不只是会变长。我们可以用下标替换其中一项，也可以用 pop() 按下标拿走一项。"
      goal="列表项可以被修改；删除后，后面的项会向前移动。"
      closing="用下标找到位置，再决定替换它还是删除它。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>整理实验</span>
          <div>
            <h2>整理你的宝物栏</h2>
            <p>先选择一格，再把它升级或从列表中拿走。</p>
          </div>
        </div>
        <div className="edit-list-lab">
          <div className="editable-slots">
            {items.length === 0 ? (
              <p>背包已经空了</p>
            ) : (
              items.map((item, index) => (
                <button
                  className={selected === index ? "selected" : ""}
                  type="button"
                  onClick={() => setSelected(index)}
                  key={`${item}-${index}`}
                >
                  <small>{index}</small>
                  <strong>{item}</strong>
                </button>
              ))
            )}
          </div>
          <div className="edit-list-controls">
            <div>
              <span>当前位置</span>
              <code>backpack[{items.length ? selected : "?"}]</code>
              <strong>{items[selected] ?? "没有物品"}</strong>
            </div>
            <label>
              替换成
              <input value={replacement} onChange={(event) => setReplacement(event.target.value)} />
            </label>
            <button type="button" disabled={!items.length} onClick={replaceItem}>
              执行 backpack[{selected}] = …
            </button>
            <button className="remove-item" type="button" disabled={!items.length} onClick={removeItem}>
              执行 backpack.pop({selected})
            </button>
            <button
              className="list-reset"
              type="button"
              onClick={() => {
                setItems(["地图", "钥匙", "药水", "宝石"]);
                setSelected(1);
              }}
            >
              恢复列表
            </button>
          </div>
        </div>
      </section>

      <section className="notice-strip warning">
        <b>下标会移动</b>
        <p>删除一项以后，右边的宝物会向前补位，所以它们的下标也会跟着改变。</p>
      </section>

      <PythonPlayground
        initialCode={`backpack = ["地图", "钥匙", "药水", "宝石"]\n\nbackpack[1] = "金钥匙"\nprint("替换以后：", backpack)\n\nremoved = backpack.pop(2)\nprint("拿走了：", removed)\nprint("现在还有：", backpack)`}
        title="修改并删除列表项"
        prompt="换一个下标，观察到底是哪一项发生了变化。"
      />
    </LessonFrame>
  );
}
