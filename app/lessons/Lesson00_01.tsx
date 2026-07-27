"use client";

import { useEffect, useMemo, useState } from "react";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

declare global {
  interface Window {
    Sk: any;
  }
}

type Example = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  hint: string;
  code: string;
  kind: "text" | "turtle";
  accent: "coral" | "lime" | "blue" | "violet" | "yellow" | "pink";
};

const examples: Example[] = [
  {
    id: "power",
    eyebrow: "01 · 每次都不一样",
    title: "抽一张超能力卡",
    description: "Python 会从盒子里随机挑出一种能力。",
    hint: "试着在 powers 里面加上你发明的超能力。",
    kind: "text",
    accent: "yellow",
    code: `import random

powers = [
    "听懂小猫说话",
    "让时间暂停十秒",
    "飞到云朵上",
    "把石头变成蛋糕",
    "一秒收拾好房间"
]

print("你抽到的能力是：")
print(random.choice(powers))`,
  },
  {
    id: "spell",
    eyebrow: "02 · 改一个数字",
    title: "制造回声咒语",
    description: "一句话，可以让 Python 重复很多次。",
    hint: "把数字 4 改成 10，或者把“喵”换成别的声音。",
    kind: "text",
    accent: "coral",
    code: `sound = "喵！"
times = 4

print(sound * times)`,
  },
  {
    id: "mood",
    eyebrow: "03 · 做一个选择",
    title: "机器人心情翻译器",
    description: "机器人会根据今天的心情说不同的话。",
    hint: '把 mood 改成 "curious" 或 "sleepy"。',
    kind: "text",
    accent: "blue",
    code: `mood = "excited"

if mood == "excited":
    print("🤖：我的灯都亮起来啦！")
elif mood == "curious":
    print("🤖：这个按钮是做什么的？")
else:
    print("🤖：电量有一点点低……")`,
  },
  {
    id: "star",
    eyebrow: "04 · 画笔开始移动",
    title: "一颗薄荷色星星",
    description: "五次前进和转弯，最后会遇见什么？",
    hint: "把 144 改成 145，看看星星还能不能合拢。",
    kind: "turtle",
    accent: "lime",
    code: `from turtle import *

screen = Screen()
screen.bgcolor("#102a43")
color("#b8f24b")
pensize(6)
speed(6)

for i in range(5):
    forward(150)
    right(144)`,
  },
  {
    id: "spiral",
    eyebrow: "05 · 数字改变图案",
    title: "不断长大的螺旋",
    description: "每走一步都比上一步更远一点。",
    hint: "把 right(91) 改成 right(89)，会出现新的图案。",
    kind: "turtle",
    accent: "violet",
    code: `from turtle import *

screen = Screen()
screen.bgcolor("#fff8ed")
colors = ["#ff6b4a", "#7559e8", "#168aad", "#ef476f"]
speed(0)
pensize(3)

for i in range(70):
    color(colors[i % 4])
    forward(i * 2)
    right(91)`,
  },
  {
    id: "flower",
    eyebrow: "06 · 让图形生长",
    title: "旋转的几何花",
    description: "一个正方形转很多次，就会长成一朵花。",
    hint: "把 range(18) 改成 range(9)，比较两朵花。",
    kind: "turtle",
    accent: "pink",
    code: `from turtle import *

screen = Screen()
screen.bgcolor("#24133d")
color("#ff79b0")
speed(0)
pensize(2)

for flower in range(18):
    for side in range(4):
        forward(90)
        right(90)
    right(20)`,
  },
];

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`无法加载 ${src}`));
    document.body.appendChild(script);
  });
}

function PythonCard({
  example,
  runtimeReady,
}: {
  example: Example;
  runtimeReady: boolean;
}) {
  const [code, setCode] = useState(example.code);
  const [hasRun, setHasRun] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const outputId = `output-${example.id}`;

  async function runCode() {
    if (!runtimeReady || running) return;
    setRunning(true);
    setHasRun(true);
    setError("");

    const output = document.getElementById(outputId);
    if (output) output.innerHTML = "";

    const Sk = window.Sk;
    let textOutput = "";

    try {
      Sk.configure({
        output: (value: string) => {
          textOutput += value;
          if (output) output.textContent = textOutput;
        },
        read: (path: string) => {
          const files = Sk.builtinFiles?.files;
          if (!files || files[path] === undefined) {
            throw new Error(`找不到 ${path}`);
          }
          return files[path];
        },
        __future__: Sk.python3,
      });

      if (example.kind === "turtle") {
        Sk.TurtleGraphics = {
          target: outputId,
          width: 520,
          height: 330,
        };
      }

      await Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody("<stdin>", false, code, true),
      );
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : String(caught);
      setError(message);
    } finally {
      setRunning(false);
    }
  }

  function resetCode() {
    setCode(example.code);
    setHasRun(false);
    setError("");
    const output = document.getElementById(outputId);
    if (output) output.innerHTML = "";
  }

  return (
    <article className={`experiment accent-${example.accent}`}>
      <header className="experiment-copy">
        <p className="eyebrow">{example.eyebrow}</p>
        <h2>{example.title}</h2>
        <p>{example.description}</p>
      </header>

      <div className="lab-grid">
        <div className="code-panel">
          <div className="panel-bar">
            <span>Python</span>
            <button className="text-button" onClick={resetCode} type="button">
              恢复原样
            </button>
          </div>
          <textarea
            aria-label={`${example.title}的 Python 代码`}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck={false}
          />
          <button
            className="run-button"
            disabled={!runtimeReady || running}
            onClick={runCode}
            type="button"
          >
            <span aria-hidden="true">{running ? "···" : "▶"}</span>
            {running
              ? "正在发生"
              : runtimeReady
                ? "运行这段代码"
                : "正在准备"}
          </button>
        </div>

        <div className={`result-panel ${hasRun ? "is-awake" : ""}`}>
          <div className="panel-bar">
            <span>效果</span>
            <span className="status-dot" aria-hidden="true" />
          </div>
          {!hasRun && (
            <button className="curtain" onClick={runCode} type="button">
              <span className="curtain-icon">?</span>
              <strong>这里会发生什么？</strong>
              <small>点一下揭晓</small>
            </button>
          )}
          <div
            id={outputId}
            className={`python-output ${example.kind}`}
            aria-live="polite"
          />
          {error && (
            <div className="friendly-error">
              <strong>代码停在这里了</strong>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      <div className="try-this">
        <span>试一试</span>
        <p>{example.hint}</p>
      </div>
    </article>
  );
}

export default function Lesson00_01() {
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [identity, setIdentity] = useState("");
  const identities = useMemo(
    () => [
      "图案发明家",
      "机器人翻译员",
      "数字魔法师",
      "错误侦探",
      "小游戏设计师",
    ],
    [],
  );

  useEffect(() => {
    let active = true;
    loadScript(`${publicBasePath}/runtime/skulpt.min.js`)
      .then(() =>
        loadScript(`${publicBasePath}/runtime/skulpt-stdlib.js`),
      )
      .then(() => {
        if (active) setRuntimeReady(true);
      })
      .catch(() => {
        if (active) setRuntimeReady(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function chooseIdentity() {
    const next =
      identities[Math.floor(Math.random() * identities.length)];
    setIdentity(next);
  }

  return (
    <div className="lesson-page">
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">今天先不背知识点</p>
          <h1>
            按下按钮，
            <br />
            看看代码会做什么。
          </h1>
          <p className="hero-intro">
            下面有六个装着 Python 的小实验。可以运行、乱改，也可以把它弄坏——再按“恢复原样”就好。
          </p>
          <div className="identity-row">
            <button className="identity-button" onClick={chooseIdentity}>
              抽取今天的编程身份
            </button>
            <div className={`identity-card ${identity ? "revealed" : ""}`}>
              {identity || "？"}
            </div>
            {identity && <strong className="identity-name">{identity}</strong>}
          </div>
        </div>

        <div className="hero-machine" aria-hidden="true">
          <div className="machine-lights">
            <i />
            <i />
            <i />
          </div>
          <div className="machine-screen">
            <span>PY</span>
            <b>THON</b>
            <small>实验正在待命</small>
          </div>
          <div className="machine-keys">
            {["+", "=", ":", "()", "→", "*"].map((key) => (
              <kbd key={key}>{key}</kbd>
            ))}
          </div>
        </div>
      </section>

      <section className="instructions" aria-label="使用方法">
        <span>怎么玩</span>
        <ol>
          <li>
            <b>1</b> 点运行
          </li>
          <li>
            <b>2</b> 看效果
          </li>
          <li>
            <b>3</b> 改一点
          </li>
          <li>
            <b>4</b> 再运行
          </li>
        </ol>
      </section>

      <section className="experiments">
        {examples.map((example) => (
          <PythonCard
            example={example}
            key={example.id}
            runtimeReady={runtimeReady}
          />
        ))}
      </section>

      <section className="ending">
        <p className="eyebrow">今天不考试</p>
        <h2>你最想自己做出哪一种效果？</h2>
        <div className="ending-options">
          <button>会动的画</button>
          <button>可以玩的游戏</button>
          <button>每次不同的故事</button>
          <button>我有自己的主意</button>
        </div>
        <p className="ending-note">
          下一课，我们再去看看这些代码为什么会动。
        </p>
      </section>
    </div>
  );
}
