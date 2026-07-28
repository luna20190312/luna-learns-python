"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const skills = {
  星光弹: { icon: "✨", cost: 12, color: "star" },
  火焰球: { icon: "🔥", cost: 18, color: "fire" },
  冰冻术: { icon: "❄️", cost: 15, color: "ice" },
} as const;

type SkillName = keyof typeof skills;

export default function Lesson04_05() {
  const [skill, setSkill] = useState<SkillName>("星光弹");
  const [power, setPower] = useState(2);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [energy, setEnergy] = useState(60);
  const [message, setMessage] = useState("选择技能，准备释放");
  const selected = skills[skill];
  const damage = selected.cost * power;
  const code = useMemo(
    () => `def cast_skill(name, power):\n    damage = ${selected.cost} * power\n    print(name + "造成伤害：", damage)\n    return damage\n\nmonster_health = 100\nmonster_health = monster_health - cast_skill("${skill}", ${power})\nprint("怪物剩余生命：", monster_health)`,
    [power, selected.cost, skill],
  );

  function cast() {
    if (energy < selected.cost) {
      setMessage("能量不足，换一个技能吧");
      return;
    }
    setEnergy((value) => value - selected.cost);
    setMonsterHealth((value) => Math.max(0, value - damage));
    setMessage(`${skill}造成了 ${damage} 点伤害`);
  }

  function reset() {
    setMonsterHealth(100);
    setEnergy(60);
    setMessage("选择技能，准备释放");
  }

  return (
    <LessonFrame
      chapter="第 4 章 · 把代码变成自己的指令"
      lesson="05"
      title="制作角色技能"
      lead="函数可以代表一个完整动作。再配上参数和返回值，同一个技能就能拥有不同威力。"
      goal="函数把动作包装起来，参数改变动作，返回值报告动作结果。"
      closing="设计函数时，要想清楚它收到什么，又会送回什么。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>技能工坊</span>
          <div>
            <h2>调用 cast_skill()</h2>
            <p>选择技能和威力，观察参数怎样改变返回的伤害。</p>
          </div>
        </div>
        <div className="skill-lab">
          <div className="skill-controls">
            <div className="skill-picker">
              {(Object.keys(skills) as SkillName[]).map((name) => (
                <button
                  className={skill === name ? "active" : ""}
                  type="button"
                  onClick={() => setSkill(name)}
                  key={name}
                >
                  <span>{skills[name].icon}</span>
                  <strong>{name}</strong>
                  <small>消耗 {skills[name].cost}</small>
                </button>
              ))}
            </div>
            <label>
              威力参数：<strong>{power}</strong>
              <input
                type="range"
                min="1"
                max="3"
                value={power}
                onChange={(event) => setPower(Number(event.target.value))}
              />
            </label>
            <code>cast_skill(&quot;{skill}&quot;, {power})</code>
            <button className="cast-button" type="button" onClick={cast}>
              释放技能
            </button>
            <button className="skill-reset" type="button" onClick={reset}>恢复战斗</button>
          </div>
          <div className={`battle-stage ${selected.color}`}>
            <div className="battle-status">
              <span>角色能量 <strong>{energy}</strong></span>
              <span>怪物生命 <strong>{monsterHealth}</strong></span>
            </div>
            <div className="battle-actors">
              <span aria-hidden="true">🧙‍♀️</span>
              <i>{selected.icon}</i>
              <span aria-hidden="true">{monsterHealth === 0 ? "💫" : "👾"}</span>
            </div>
            <strong className="battle-message" aria-live="polite">{message}</strong>
            <div className="health-track"><i style={{ width: `${monsterHealth}%` }} /></div>
          </div>
        </div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="运行真正的角色技能函数"
        prompt="修改基础伤害、威力参数或技能名称。"
      />
    </LessonFrame>
  );
}
