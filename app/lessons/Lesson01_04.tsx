"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

export default function Lesson01_04() {
  const [first, setFirst] = useState("超级");
  const [second, setSecond] = useState("小猫");
  const [times, setTimes] = useState(3);
  const code = `first = "${first}"\nsecond = "${second}"\n\nprint(first + second)\nprint((first + second + "！") * ${times})`;

  return (
    <LessonFrame
      lesson="04"
      title="拼出新的文字"
      lead="文字也能相加和重复，只是它得到的不是数字，而是新的句子。"
      goal="引号把文字包起来，+ 负责连接，* 负责重复。"
      closing="字符串就是用引号包起来的文字。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>实验 1</span>
          <div>
            <h2>制作角色名字</h2>
            <p>把两块文字拼在一起。</p>
          </div>
        </div>
        <div className="word-builder">
          <label>
            第一块文字
            <input value={first} onChange={(event) => setFirst(event.target.value)} />
          </label>
          <span>+</span>
          <label>
            第二块文字
            <input value={second} onChange={(event) => setSecond(event.target.value)} />
          </label>
          <span>=</span>
          <strong>{first + second}</strong>
        </div>
      </section>

      <section className="activity-card">
        <div className="activity-heading">
          <span>实验 2</span>
          <div>
            <h2>启动扩音器</h2>
            <p>选择一句话重复几次。</p>
          </div>
        </div>
        <div className="repeat-lab">
          <div>
            <button
              onClick={() => setTimes((value) => Math.max(1, value - 1))}
              disabled={times === 1}
            >
              −
            </button>
            <strong>{times} 次</strong>
            <button
              onClick={() => setTimes((value) => Math.min(8, value + 1))}
              disabled={times === 8}
            >
              +
            </button>
          </div>
          <p>{(first + second + "！").repeat(times)}</p>
        </div>
      </section>

      <PythonPlayground
        key={code}
        initialCode={code}
        title="看看 Python 怎样拼文字"
        prompt="在引号里改字，不要删掉引号。"
      />
    </LessonFrame>
  );
}
