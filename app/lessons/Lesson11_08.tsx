"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const checklist = ["我会新建 .py 文件", "我会保存并再次打开", "我会运行并阅读输出", "我知道浏览器版不是完整 Python"];

export default function Lesson11_08() {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <LessonFrame chapter="高阶第 1 章 · 通往完整 Python" lesson="08" title="浏览器 Python 与完整 Python"
      lead="网页实验台适合学习基础，但完整 Python 还能保存文件、安装第三方库和制作更大的项目。"
      goal="知道当前环境的边界，并准备把已经学会的语法带到桌面 Python。"
      closing="运行环境会改变，但 Python 的核心语法仍然是同一种语言。">
      <section className="activity-card">
        <div className="activity-heading"><span>过渡地图</span><div><h2>从网页实验台走向 .py 文件</h2><p>完成四项认识，就拿到进入下一阶段的通行证。</p></div></div>
        <div className="environment-lab">
          <div className="environment-compare"><div><span>🌐</span><strong>浏览器实验台</strong><small>不用安装、立即运行、功能有限</small></div><i>→</i><div><span>💻</span><strong>完整 Python</strong><small>保存文件、安装库、制作更大项目</small></div></div>
          <div className="transition-checklist">{checklist.map((item) => <button className={checked.includes(item) ? "checked" : ""} type="button" onClick={() => setChecked((items) => items.includes(item) ? items.filter((x) => x !== item) : [...items, item])} key={item}><span>{checked.includes(item) ? "✓" : "○"}</span>{item}</button>)}<strong>{checked.length === checklist.length ? "通行证已准备好！" : `${checked.length} / 4 已确认`}</strong></div>
        </div>
      </section>
      <PythonPlayground initialCode={`skills = ["变量", "条件", "循环", "函数", "列表", "字典"]\n\nprint("我已经学会：")\nfor skill in skills:\n    print("✓", skill)\n\nprint("下一站：完整 Python")`} title="运行高阶第 1 章结业清单" prompt="在 skills 中加入一项你最喜欢的能力。" />
    </LessonFrame>
  );
}
