"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const parts = {
  name: {
    label: "print",
    title: "指令的名字",
    text: "告诉 Python：请把内容显示在屏幕上。",
  },
  brackets: {
    label: "( )",
    title: "一对括号",
    text: "括号像一个小盒子，里面装着要交给指令的东西。",
  },
  message: {
    label: '"你好"',
    title: "交给指令的文字",
    text: "引号告诉 Python：这里面是一段文字。",
  },
};

type PartKey = keyof typeof parts;

export default function Lesson01_02() {
  const [selected, setSelected] = useState<PartKey>("name");
  const [answer, setAnswer] = useState("");

  return (
    <LessonFrame
      lesson="02"
      title="拆开一条指令"
      lead="一条看起来很短的代码，也有名字、盒子和放进盒子里的内容。"
      goal="括号、引号少一个，计算机都可能看不懂。"
      closing="print 是名字，括号里放参数，引号里是文字。"
    >
      <section className="activity-card">
        <div className="activity-heading">
          <span>实验 1</span>
          <div>
            <h2>点击代码的三个部分</h2>
            <p>看看每一部分负责什么。</p>
          </div>
        </div>
        <div className="anatomy-lab">
          <div className="anatomy-code" aria-label='代码 print("你好")'>
            <button
              className={selected === "name" ? "selected" : ""}
              onClick={() => setSelected("name")}
            >
              print
            </button>
            <button
              className={selected === "brackets" ? "selected bracket-left" : "bracket-left"}
              onClick={() => setSelected("brackets")}
              aria-label="左括号和右括号"
            >
              (
            </button>
            <button
              className={selected === "message" ? "selected" : ""}
              onClick={() => setSelected("message")}
            >
              &quot;你好&quot;
            </button>
            <button
              className={selected === "brackets" ? "selected bracket-right" : "bracket-right"}
              onClick={() => setSelected("brackets")}
              aria-label="左括号和右括号"
            >
              )
            </button>
          </div>
          <div className="part-explanation">
            <span>{parts[selected].label}</span>
            <h3>{parts[selected].title}</h3>
            <p>{parts[selected].text}</p>
          </div>
        </div>
      </section>

      <section className="activity-card">
        <div className="activity-heading">
          <span>实验 2</span>
          <div>
            <h2>错误侦探</h2>
            <p>下面哪一条把文字的引号弄丢了？</p>
          </div>
        </div>
        <div className="choice-grid">
          {['print("小猫")', "print(小猫)", 'print("小狗")'].map((choice) => (
            <button
              className={answer === choice ? "chosen" : ""}
              onClick={() => setAnswer(choice)}
              key={choice}
            >
              <code>{choice}</code>
            </button>
          ))}
        </div>
        {answer && (
          <div className={`answer-note ${answer === "print(小猫)" ? "correct" : ""}`}>
            {answer === "print(小猫)"
              ? "找到了！小猫没有放在引号里，Python 会把它误认为一个名字。"
              : "这一条有成对的括号和引号，可以正常运行。再看看另外两条。"}
          </div>
        )}
      </section>

      <PythonPlayground
        initialCode={`print("你好，小小程序员！")`}
        title="改掉引号里的文字"
        prompt="只改文字，保留 print、括号和引号。"
        compact
      />
    </LessonFrame>
  );
}
