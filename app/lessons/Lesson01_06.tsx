"use client";

import { useMemo, useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson01_06() {
  const [name, setName] = useState("露娜");
  const [animal, setAnimal] = useState("小狐狸");
  const [power, setPower] = useState("和星星说话");
  const [energy, setEnergy] = useState(80);
  const [cardReady, setCardReady] = useState(false);

  const code = useMemo(
    () => `name = "${name}"\nanimal = "${animal}"\npower = "${power}"\nenergy = ${energy}\n\nprint("角色：" + name)\nprint("伙伴：" + animal)\nprint("能力：" + power)\nprint("能量：", energy)`,
    [name, animal, power, energy],
  );

  return (
    <LessonFrame
      lesson="06"
      title="制作角色状态卡"
      lead="把文字、数字、变量和输出组合起来，完成第一个真正属于自己的程序。"
      goal="一个作品，是很多条简单指令组合在一起。"
      closing="我能用变量保存角色资料，再用 print 把它们显示出来。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>最终任务</span>
          <div>
            <h2>设计你的角色</h2>
            <p>填好资料，再让 Python 生成角色卡。</p>
          </div>
        </div>
        <div className="character-builder">
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              角色叫什么？
              <input value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <label>
              她的伙伴是谁？
              <input value={animal} onChange={(event) => setAnimal(event.target.value)} />
            </label>
            <label>
              她有什么能力？
              <input value={power} onChange={(event) => setPower(event.target.value)} />
            </label>
            <label>
              现在有多少能量？ <strong>{energy}</strong>
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={energy}
                onChange={(event) => setEnergy(Number(event.target.value))}
              />
            </label>
            <button onClick={() => setCardReady(true)} type="button">
              生成角色卡
            </button>
          </form>

          <div className={`character-card ${cardReady ? "ready" : ""}`}>
            {!cardReady ? (
              <div className="character-covered">
                <span>?</span>
                <p>资料填好以后再揭晓</p>
              </div>
            ) : (
              <>
                <small>PYTHON 角色档案</small>
                <div className="character-avatar">{name.slice(0, 1) || "?"}</div>
                <h3>{name || "无名角色"}</h3>
                <dl>
                  <div>
                    <dt>伙伴</dt>
                    <dd>{animal}</dd>
                  </div>
                  <div>
                    <dt>能力</dt>
                    <dd>{power}</dd>
                  </div>
                  <div>
                    <dt>能量</dt>
                    <dd>{energy} / 100</dd>
                  </div>
                </dl>
              </>
            )}
          </div>
        </div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="这就是角色卡背后的程序"
        prompt="运行后比较：网页角色卡和 Python 输出保存的是不是同一组资料？"
      />
    </LessonFrame>
  );
}
