"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

type Path = "森林" | "山洞" | null;

export default function Lesson10_03() {
  const [path, setPath] = useState<Path>(null);
  const [action, setAction] = useState<string | null>(null);
  const ending = path === "森林" ? (action === "跟随光点" ? "你找到了精灵村！" : "月兔带你安全回家。") : path === "山洞" ? (action === "点亮火把" ? "墙上出现一张藏宝图！" : "你听见巨龙打呼噜，悄悄离开。") : "";
  return (
    <LessonFrame chapter="第 10 章 · Python 小小创作家" lesson="03" title="文字冒险游戏"
      lead="故事每到一个路口就询问玩家，再用条件判断走向新的情节和结局。"
      goal="先画出故事分支，再把每个选择写成条件。"
      closing="文字冒险由场景、选择和不同结局组成。">
      <section className="activity-card">
        <div className="activity-heading"><span>作品 3</span><div><h2>选择你的冒险路线</h2><p>每次选择都会打开下一段故事。</p></div></div>
        <div className="adventure-lab">
          <div className="adventure-scene"><span>{path === "森林" ? "🌲" : path === "山洞" ? "🕯️" : "🗺️"}</span><strong>{!path ? "前面有森林和山洞" : !action ? `你走进了${path}` : ending}</strong></div>
          <div className="adventure-choices">{!path ? <><button type="button" onClick={() => setPath("森林")}>走进森林</button><button type="button" onClick={() => setPath("山洞")}>进入山洞</button></> : !action ? (path === "森林" ? <><button type="button" onClick={() => setAction("跟随光点")}>跟随光点</button><button type="button" onClick={() => setAction("呼叫月兔")}>呼叫月兔</button></> : <><button type="button" onClick={() => setAction("点亮火把")}>点亮火把</button><button type="button" onClick={() => setAction("仔细倾听")}>仔细倾听</button></>) : <button type="button" onClick={() => { setPath(null); setAction(null); }}>重新冒险</button>}</div>
        </div>
      </section>
      <PythonPlayground initialCode={`path = input("选择森林或山洞：")\n\nif path == "森林":\n    action = input("跟随光点，还是呼叫月兔？")\n    if action == "跟随光点":\n        print("你找到了精灵村！")\n    else:\n        print("月兔带你安全回家。")\nelse:\n    action = input("点亮火把，还是仔细倾听？")\n    if action == "点亮火把":\n        print("墙上出现一张藏宝图！")\n    else:\n        print("你听见巨龙打呼噜，悄悄离开。")`} title="运行有分支的文字冒险" prompt="修改输入，体验另一条路线。" inputDefaults={[{ label: "路线", value: "森林" }, { label: "行动", value: "跟随光点" }]} />
    </LessonFrame>
  );
}
