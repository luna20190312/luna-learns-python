"use client";

import { useEffect, useId, useState } from "react";
import { useLessonSessionId } from "./LessonSessionContext";

declare global {
  interface Window {
    Sk: any;
    __pythonRuntimePromise?: Promise<void>;
  }
}

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function appendScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    const script = existing ?? document.createElement("script");
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener("error", () => reject(new Error("运行器加载失败")), {
      once: true,
    });
    if (!existing) {
      script.src = src;
      document.body.appendChild(script);
    }
  });
}

function ensurePythonRuntime() {
  if (window.Sk?.builtinFiles) return Promise.resolve();
  if (!window.__pythonRuntimePromise) {
    window.__pythonRuntimePromise = appendScript(
      `${publicBasePath}/runtime/skulpt.min.js`,
    ).then(() =>
      appendScript(`${publicBasePath}/runtime/skulpt-stdlib.js`),
    );
  }
  return window.__pythonRuntimePromise;
}

type PythonPlaygroundProps = {
  initialCode: string;
  title?: string;
  prompt?: string;
  compact?: boolean;
  turtle?: boolean;
  inputDefaults?: Array<{
    label: string;
    value: string;
  }>;
};

export default function PythonPlayground({
  initialCode,
  title = "动手试试看",
  prompt = "先运行，再改一个地方。",
  compact = false,
  turtle = false,
  inputDefaults = [],
}: PythonPlaygroundProps) {
  const lessonId = useLessonSessionId();
  const turtleTargetId = `turtle-${useId().replaceAll(":", "")}`;
  const codeStorageKey = `luna-learns-python:code:${lessonId}`;
  const [code, setCode] = useState(initialCode);
  const [storageReady, setStorageReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [inputValues, setInputValues] = useState(
    inputDefaults.map((item) => item.value),
  );

  useEffect(() => {
    const savedCode = window.localStorage.getItem(codeStorageKey);
    setCode(savedCode ?? initialCode);
    setStorageReady(true);
  }, [codeStorageKey]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(codeStorageKey, code);
    }
  }, [code, codeStorageKey, storageReady]);

  useEffect(() => {
    let active = true;
    ensurePythonRuntime()
      .then(() => {
        if (active) setReady(true);
      })
      .catch(() => {
        if (active) setError("Python 运行器没有准备好，请刷新页面。");
      });
    return () => {
      active = false;
    };
  }, []);

  async function run() {
    if (!ready || running) return;
    setRunning(true);
    setOutput("");
    setError("");
    if (turtle) {
      document.getElementById(turtleTargetId)?.replaceChildren();
    }
    let nextOutput = "";
    let inputIndex = 0;

    try {
      const Sk = window.Sk;
      Sk.configure({
        output: (value: string) => {
          nextOutput += value;
          setOutput(nextOutput);
        },
        read: (path: string) => {
          const files = Sk.builtinFiles?.files;
          if (!files || files[path] === undefined) {
            throw new Error(`找不到 ${path}`);
          }
          return files[path];
        },
        inputfun: (promptText: string) => {
          const answer = inputValues[inputIndex] ?? "";
          inputIndex += 1;
          nextOutput += `${promptText}${answer}\n`;
          setOutput(nextOutput);
          return answer;
        },
        inputfunTakesPrompt: true,
        __future__: Sk.python3,
      });
      if (turtle) {
        Sk.TurtleGraphics = {
          target: turtleTargetId,
          width: 520,
          height: 330,
        };
      }
      await Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody("<stdin>", false, code, true),
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setRunning(false);
    }
  }

  return (
    <section className={`mini-playground ${compact ? "compact" : ""}`}>
      <header>
        <div>
          <p className="eyebrow">Python 实验台</p>
          <h2>{title}</h2>
          <span>{prompt}</span>
        </div>
        <button onClick={() => setCode(initialCode)} type="button">
          恢复代码
        </button>
      </header>
      <div className="playground-save-note">
        <span aria-hidden="true">●</span>
        修改的代码会自动保存在当前浏览器
      </div>
      {inputDefaults.length > 0 && (
        <div className="playground-inputs">
          <span>运行时将依次输入</span>
          <div>
            {inputDefaults.map((item, index) => (
              <label key={`${item.label}-${index}`}>
                {item.label}
                <input
                  value={inputValues[index] ?? ""}
                  onChange={(event) =>
                    setInputValues((current) =>
                      current.map((value, valueIndex) =>
                        valueIndex === index ? event.target.value : value,
                      ),
                    )
                  }
                />
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="mini-playground-grid">
        <div className="mini-code">
          <div className="mini-panel-label">可以修改的代码</div>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck={false}
            aria-label={`${title}的 Python 代码`}
          />
          <button
            className="mini-run"
            onClick={run}
            disabled={!ready || running}
            type="button"
          >
            {running ? "正在运行…" : ready ? "▶ 运行代码" : "正在准备…"}
          </button>
        </div>
        <div className="mini-result">
          <div className="mini-panel-label">计算机给出的结果</div>
          {!turtle && !output && !error && (
            <div className="result-waiting">
              <span>?</span>
              <p>点击运行后，这里才会出现答案</p>
            </div>
          )}
          {!turtle && output && <pre>{output}</pre>}
          {turtle && (
            <div
              id={turtleTargetId}
              className="mini-turtle-output"
              aria-label="Python Turtle 绘图结果"
            />
          )}
          {error && (
            <div className="mini-error">
              <strong>代码卡住了</strong>
              <span>{error}</span>
              <small>检查拼写、引号和括号，再试一次。</small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
