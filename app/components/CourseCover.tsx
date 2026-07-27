"use client";

type CoverChapter = {
  number: string;
  title: string;
  description: string;
};

type CourseCoverProps = {
  chapters: CoverChapter[];
  onStart: () => void;
  onContinue?: () => void;
  continueTitle?: string;
  onOpenCatalog: () => void;
};

const facts = [
  ["课程语言", "Python 3"],
  ["浏览器运行器", "Skulpt 1.2.0"],
  ["语法兼容", "Python 3.7-ish"],
  ["适合年龄", "建议 8 岁起"],
  ["课程状态", "持续更新"],
  ["作者", "Joenix"],
];

const learningSteps = [
  {
    number: "01",
    title: "先看见结果",
    text: "先点击、输入和运行，让好奇心走在解释前面。",
  },
  {
    number: "02",
    title: "再读懂代码",
    text: "从真正的 Python 语法出发，一次只理解一个概念。",
  },
  {
    number: "03",
    title: "最后亲手改",
    text: "改文字、数字和条件，用结果验证自己的猜想。",
  },
];

export default function CourseCover({
  chapters,
  onStart,
  onContinue,
  continueTitle,
  onOpenCatalog,
}: CourseCoverProps) {
  return (
    <article className="course-cover">
      <section className="cover-hero">
        <div className="cover-copy">
          <div className="cover-labels">
            <span>Interactive Python Course</span>
            <span>持续更新</span>
          </div>
          <p className="cover-kicker">为 Luna 设计的代码实验室</p>
          <h1>
            Luna Learns
            <strong>Python</strong>
          </h1>
          <p className="cover-lead">
            不从积木绕路，直接学习真正的 Python。
            在浏览器里观察、修改、运行，让每一条语法都变成看得见的结果。
          </p>
          <div className="cover-actions">
            <button className="cover-start" onClick={onStart} type="button">
              开始学习
              <span aria-hidden="true">→</span>
            </button>
            {onContinue && (
              <button className="cover-continue" onClick={onContinue} type="button">
                <span>继续学习</span>
                <small>{continueTitle}</small>
              </button>
            )}
            <button className="cover-catalog" onClick={onOpenCatalog} type="button">
              查看课程目录
            </button>
          </div>
          <div className="cover-byline">
            <span>Designed &amp; written by</span>
            <strong>Joenix</strong>
          </div>
        </div>

        <div className="cover-lab" aria-label="Python 代码实验示意">
          <div className="cover-window">
            <div className="cover-window-bar">
              <span>
                <i />
                <i />
                <i />
              </span>
              <small>hello_luna.py</small>
            </div>
            <pre>
              <code>
                <span>name</span> = <b>input</b>(<em>&quot;你叫什么名字？&quot;</em>)
                {"\n"}
                <b>print</b>(<em>&quot;你好，&quot;</em> + <span>name</span>)
                {"\n\n"}
                <strong>if</strong> <span>curious</span>:
                {"\n    "}
                <b>print</b>(<em>&quot;出发！&quot;</em>)
              </code>
            </pre>
            <div className="cover-output">
              <small>运行结果</small>
              <strong>你好，Luna ✦</strong>
              <span>准备好探索代码了吗？</span>
            </div>
          </div>
          <div className="cover-orbit orbit-one">print()</div>
          <div className="cover-orbit orbit-two">if</div>
          <div className="cover-orbit orbit-three">input()</div>
          <div className="cover-stamp">
            <b>PY</b>
            <span>THON</span>
          </div>
        </div>
      </section>

      <section className="cover-facts" aria-label="项目信息">
        {facts.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="cover-section cover-method">
        <div className="cover-section-heading">
          <span>HOW WE LEARN</span>
          <h2>学习不是背语法，<br />而是不断发现。</h2>
          <p>
            每节课保持短小、具体和可操作。没有长篇讲解，先让孩子做出一点改变，
            再一起说清楚刚刚发生了什么。
          </p>
        </div>
        <div className="cover-step-list">
          {learningSteps.map((step) => (
            <div key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cover-section cover-map">
        <div className="cover-section-heading">
          <span>LEARNING MAP</span>
          <h2>从第一条指令，<br />慢慢建立编程思维。</h2>
          <p>课程目录会随着学习进度持续生长，封面不绑定固定课数。</p>
        </div>
        <div className="cover-chapters">
          {chapters.map((chapter, index) => (
            <div key={chapter.number}>
              <span>{chapter.number}</span>
              <b>{String(index).padStart(2, "0")}</b>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cover-section cover-details">
        <div className="cover-detail-card">
          <span aria-hidden="true">◎</span>
          <div>
            <h3>不用安装 Python</h3>
            <p>课程和代码运行器都在网页中，打开浏览器就能开始。</p>
          </div>
        </div>
        <div className="cover-detail-card">
          <span aria-hidden="true">⌁</span>
          <div>
            <h3>代码留在设备里</h3>
            <p>练习代码和学习进度都留在当前浏览器，不会上传到课程服务器。</p>
          </div>
        </div>
        <div className="cover-detail-card">
          <span aria-hidden="true">▣</span>
          <div>
            <h3>电脑和平板均可学习</h3>
            <p>推荐使用最新版 Chrome、Edge、Safari 或 Firefox。</p>
          </div>
        </div>
      </section>

      <section className="cover-tech">
        <div>
          <span>TECHNICAL NOTE</span>
          <h2>这里运行的是什么 Python？</h2>
        </div>
        <div>
          <p>
            课程使用 <strong>Python 3</strong> 语法，通过{" "}
            <strong>Skulpt 1.2.0</strong> 在浏览器中执行，其标准库标记为{" "}
            <strong>Python 3.7-ish</strong> 兼容。
          </p>
          <p>
            它适合当前课程中的输出、输入、变量、条件、循环、随机数和 Turtle
            绘图，但不是完整的桌面 Python 环境，也不能任意安装第三方软件包。
          </p>
          <small>
            Web stack: Next.js 16.2.6 · React 19.2.6 · TypeScript 5.9.3
          </small>
        </div>
      </section>

      <section className="cover-finale">
        <p>READY WHEN YOU ARE</p>
        <h2>从“运行”开始，<br />把好奇心变成代码。</h2>
        <button onClick={onStart} type="button">
          进入第 0 章
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </article>
  );
}
