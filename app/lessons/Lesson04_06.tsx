"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

type ToolName = "充电" | "装饰" | "检查";

export default function Lesson04_06() {
  const [robotName, setRobotName] = useState("露娜号");
  const [energy, setEnergy] = useState(30);
  const [stars, setStars] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  function useTool(tool: ToolName) {
    if (tool === "充电") {
      const next = Math.min(100, energy + 20);
      setEnergy(next);
      setLogs((items) => [...items, `charge() → 能量变成 ${next}`]);
    } else if (tool === "装饰") {
      const next = stars + 1;
      setStars(next);
      setLogs((items) => [...items, `add_star() → 得到第 ${next} 颗星`]);
    } else {
      setLogs((items) => [...items, `show_status() → ${robotName}：能量 ${energy}，星星 ${stars}`]);
    }
  }

  function reset() {
    setEnergy(30);
    setStars(0);
    setLogs([]);
  }

  return (
    <LessonFrame
      chapter="第 4 章 · 把代码变成自己的指令"
      lesson="06"
      title="建造小小工具箱"
      lead="真正的程序通常不只有一个函数。把不同任务分别做成函数，就能像使用工具一样组合它们。"
      goal="每个函数只负责一件清楚的小事，组合起来就能完成大任务。"
      closing="好用的函数名字清楚、任务单一，还可以和其他函数一起工作。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>本章任务</span>
          <div>
            <h2>修复并装饰探险机器人</h2>
            <p>从工具箱中调用函数，完成充电、装饰和状态检查。</p>
          </div>
        </div>
        <div className="toolbox-lab">
          <div className="toolbox-panel">
            <label>
              机器人名字
              <input value={robotName} onChange={(event) => setRobotName(event.target.value)} />
            </label>
            <div className="function-tools">
              <button type="button" onClick={() => useTool("充电")}>
                <span>🔋</span><strong>charge()</strong><small>能量增加 20</small>
              </button>
              <button type="button" onClick={() => useTool("装饰")}>
                <span>⭐</span><strong>add_star()</strong><small>增加一颗星</small>
              </button>
              <button type="button" onClick={() => useTool("检查")}>
                <span>🔍</span><strong>show_status()</strong><small>显示现在的状态</small>
              </button>
            </div>
            <button className="toolbox-reset" type="button" onClick={reset}>全部重置</button>
          </div>
          <div className="robot-workbench">
            <div className="workbench-status">
              <span>能量 <strong>{energy}</strong></span>
              <span>星星 <strong>{stars}</strong></span>
            </div>
            <div className="workbench-robot">
              <span className="robot-stars" aria-hidden="true">
                {Array.from({ length: Math.min(stars, 6) }, () => "★").join("")}
              </span>
              <div aria-hidden="true">🤖</div>
              <strong>{robotName || "未命名机器人"}</strong>
            </div>
            <div className="tool-log" aria-live="polite">
              {logs.length === 0 ? (
                <p>调用记录会出现在这里</p>
              ) : (
                logs.slice(-5).map((log, index) => <code key={`${log}-${index}`}>{log}</code>)
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="toolbox-recipe">
        <div><span>1</span><strong>把任务拆小</strong><small>充电、装饰、检查</small></div>
        <i>→</i>
        <div><span>2</span><strong>每件事写成函数</strong><small>函数只负责一个任务</small></div>
        <i>→</i>
        <div><span>3</span><strong>按需要组合调用</strong><small>完成一个完整作品</small></div>
      </section>

      <PythonPlayground
        initialCode={`def charge(energy):\n    energy = energy + 20\n    return energy\n\ndef add_star(stars):\n    stars = stars + 1\n    return stars\n\ndef show_status(name, energy, stars):\n    print(name, "能量：", energy, "星星：", stars)\n\nname = "露娜号"\nenergy = 30\nstars = 0\n\nenergy = charge(energy)\nstars = add_star(stars)\nstars = add_star(stars)\nshow_status(name, energy, stars)`}
        title="运行完整的函数工具箱"
        prompt="调整函数调用顺序，或者多调用几次 charge() 和 add_star()。"
      />
    </LessonFrame>
  );
}
