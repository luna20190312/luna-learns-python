"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const modules = {
  random: { icon: "🎲", job: "随机选择", api: "random.choice()" },
  math: { icon: "📐", job: "数学工具", api: "math.sqrt()" },
  turtle: { icon: "🐢", job: "画图工具", api: "turtle.forward()" },
};
type ModuleName = keyof typeof modules;

export default function Lesson11_07() {
  const [moduleName, setModuleName] = useState<ModuleName>("random");
  const module = modules[moduleName];
  return (
    <LessonFrame chapter="高阶第 1 章 · 通往完整 Python" lesson="07" title="工具从哪里来"
      lead="Python 不会一开始搬来所有工具。import 像打开一个工具箱，需要什么模块就导入什么。"
      goal="import 模块名 会让程序使用这个模块提供的工具。"
      closing="模块是一组有关联的工具，import 负责把它请进程序。">
      <section className="activity-card">
        <div className="activity-heading"><span>模块仓库</span><div><h2>选择一个工具箱</h2><p>模块名写在点号前，具体工具写在点号后。</p></div></div>
        <div className="module-lab">
          <div className="module-shelf">{(Object.keys(modules) as ModuleName[]).map((name) => <button className={moduleName === name ? "active" : ""} type="button" onClick={() => setModuleName(name)} key={name}><span>{modules[name].icon}</span><strong>{name}</strong><small>{modules[name].job}</small></button>)}</div>
          <div className="module-toolbox"><span>{module.icon}</span><code>import {moduleName}</code><strong>{module.api}</strong><small>{module.job}</small></div>
        </div>
      </section>
      <PythonPlayground initialCode={`import random\n\ncolors = ["红色", "黄色", "蓝色"]\nprint(random.choice(colors))`} title="导入并使用 random 模块" prompt="模块只需 import 一次，后面可以多次使用它的工具。" />
    </LessonFrame>
  );
}
