"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const themes = { 太空: { icon: "🚀", place: "月球基地" }, 森林: { icon: "🌲", place: "精灵树屋" }, 海洋: { icon: "🐳", place: "珊瑚城" } };
type Theme = keyof typeof themes;

export default function Lesson10_06() {
  const [theme, setTheme] = useState<Theme>("太空");
  const [hero, setHero] = useState("露娜");
  const [goal, setGoal] = useState("寻找星星");
  const code = useMemo(() => `hero = "${hero}"\nplace = "${themes[theme].place}"\ngoal = "${goal}"\n\nprint(hero + "来到" + place)\nprint("今天的任务是：" + goal)\n\nchoice = input("准备好了吗？请输入是或否：")\nif choice == "是":\n    print("冒险开始！")\nelse:\n    print("先整理装备，再出发。")`, [goal, hero, theme]);
  return (
    <LessonFrame chapter="第 10 章 · Python 小小创作家" lesson="06" title="我的第一个独立作品"
      lead="最后不再照着唯一答案做。先选择主题、主角和目标，再从一段能运行的代码开始自己的创作。"
      goal="独立作品先做最小可运行版本，再一次增加一个想法。"
      closing="我可以先让作品运行，再慢慢把它变成自己的样子。">
      <section className="activity-card">
        <div className="activity-heading"><span>毕业创作</span><div><h2>设计你的作品起点</h2><p>完成三张创作卡，就会得到专属开场。</p></div></div>
        <div className="project-planner">
          <div className="project-form"><div className="theme-picker">{(Object.keys(themes) as Theme[]).map((name) => <button className={theme === name ? "active" : ""} type="button" onClick={() => setTheme(name)} key={name}>{themes[name].icon} {name}</button>)}</div><label>主角名字<input value={hero} onChange={(e) => setHero(e.target.value)} /></label><label>冒险目标<input value={goal} onChange={(e) => setGoal(e.target.value)} /></label></div>
          <div className="project-poster"><span>{themes[theme].icon}</span><small>{theme}冒险</small><h3>{hero || "神秘主角"}</h3><p>来到{themes[theme].place}</p><strong>{goal || "等待一个目标"}</strong></div>
        </div>
      </section>
      <section className="project-next-steps"><div><span>1</span><strong>先运行开场</strong></div><div><span>2</span><strong>只增加一个选择</strong></div><div><span>3</span><strong>测试两种结果</strong></div><div><span>4</span><strong>给家人试玩</strong></div></section>
      <PythonPlayground key={code} initialCode={code} title="这是你的作品起点" prompt="先运行成功，再一次只增加一个角色、选择或结局。" inputDefaults={[{ label: "是否准备好", value: "是" }]} />
    </LessonFrame>
  );
}
