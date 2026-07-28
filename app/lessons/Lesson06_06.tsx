"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson06_06() {
  const [password, setPassword] = useState("星光123");
  const [checked, setChecked] = useState(false);
  const rules = [
    { label: "至少 6 个字符", passed: password.length >= 6 },
    { label: "包含“星”", passed: password.includes("星") },
    { label: "不能有空格", passed: !password.includes(" ") },
  ];
  const allPassed = rules.every((rule) => rule.passed);
  const code = useMemo(
    () =>
      `password = input("请输入新的城堡暗号：")\n\nif len(password) < 6:\n    print("太短了，至少需要 6 个字符")\nelif "星" not in password:\n    print("暗号里需要有“星”")\nelif " " in password:\n    print("暗号里不能有空格")\nelse:\n    print("暗号合格，城门打开！")`,
    [],
  );

  return (
    <LessonFrame
      chapter="第 6 章 · 文字的秘密"
      lesson="06"
      title="制作密码检查员"
      lead="把 len()、in 和条件判断组合起来，让程序按照三条清楚的规则检查城堡暗号。"
      goal="复杂任务可以拆成几条简单规则，再从上到下逐条检查。"
      closing="先处理不合格的情况，最后的 else 就是全部通过。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>本章挑战</span>
          <div>
            <h2>设置新的城堡暗号</h2>
            <p>暗号必须够长、包含“星”，而且不能有空格。</p>
          </div>
        </div>
        <div className="password-lab">
          <div className="password-controls">
            <label>
              输入暗号
              <input
                value={password}
                maxLength={16}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setChecked(false);
                }}
              />
            </label>
            <button type="button" onClick={() => setChecked(true)}>检查三条规则</button>
            <div className="password-rules">
              {rules.map((rule, index) => (
                <div className={checked ? (rule.passed ? "passed" : "failed") : ""} key={rule.label}>
                  <span>{checked ? (rule.passed ? "✓" : "×") : index + 1}</span>
                  <strong>{rule.label}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className={`password-gate ${checked ? (allPassed ? "open" : "locked") : ""}`}>
            <div className="gate-lock" aria-hidden="true">{checked && allPassed ? "🔓" : "🔒"}</div>
            <strong>
              {!checked ? "等待检查暗号" : allPassed ? "暗号合格，城门打开！" : "还有规则没有通过"}
            </strong>
            <small>{checked ? `${rules.filter((rule) => rule.passed).length} / 3 条通过` : "点击按钮后才公布结果"}</small>
          </div>
        </div>
      </section>

      <section className="password-flow">
        {rules.map((rule, index) => (
          <div key={rule.label}><span>{index + 1}</span><strong>{rule.label}</strong></div>
        ))}
        <i>→</i>
        <div><span>✓</span><strong>全部通过</strong></div>
      </section>

      <PythonPlayground
        key={password}
        initialCode={code}
        title="运行真正的暗号检查员"
        prompt="准备了一个输入框，试试合格和不合格的不同暗号。"
        inputDefaults={[{ label: "城堡暗号", value: password }]}
      />
    </LessonFrame>
  );
}
