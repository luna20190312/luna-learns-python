import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Luna Learns Python course home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<title>Luna Learns Python｜贝琪的代码实验室<\/title>/);
  assert.match(html, /贝琪的代码实验室/);
  assert.match(html, /为 Luna 设计的代码实验室/);
  assert.match(html, /开始学习/);
  assert.match(html, /Python 3\.7-ish/);
  assert.match(html, /Joenix/);
  assert.match(html, /持续更新/);
  assert.match(html, /先看看能做什么/);
  assert.match(html, /给计算机准确的指令/);
  assert.match(html, /让程序学会选择/);
  assert.match(html, /让程序重复工作/);
  assert.match(html, /把代码变成自己的指令/);
  assert.match(html, /一次记住很多东西/);
  assert.match(html, /文字的秘密/);
  assert.match(html, /用代码画出一个世界/);
  assert.match(html, /给数据贴上名字/);
  assert.match(html, /成为代码侦探/);
  assert.match(html, /Python 小小创作家/);
  assert.match(html, /通往完整 Python/);
  assert.doesNotMatch(html, /class="course-shell"/);
  assert.doesNotMatch(html, /aria-label="课程目录"/);
});

test("registers every lesson and bundles the browser Python runtime", async () => {
  const lessonsRoot = new URL("../app/lessons/", import.meta.url);
  const [files, courseShell, playground] = await Promise.all([
    readdir(lessonsRoot),
    readFile(new URL("../app/components/CourseShell.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../app/components/PythonPlayground.tsx", import.meta.url),
      "utf8",
    ),
    access(new URL("../public/runtime/skulpt.min.js", import.meta.url)),
    access(new URL("../public/runtime/skulpt-stdlib.js", import.meta.url)),
  ]);

  const lessonFiles = files.filter((file) => /^Lesson\d{2}_\d{2}\.tsx$/.test(file));
  assert.equal(lessonFiles.length, 69);

  for (const file of lessonFiles) {
    const component = file.replace(".tsx", "");
    assert.match(courseShell, new RegExp(`import ${component} from`));
    assert.match(courseShell, new RegExp(`component: ${component}`));
  }

  assert.equal(
    (courseShell.match(/status: "ready"(?=,|\s*})/g) ?? []).length,
    69,
  );
  assert.match(courseShell, /luna-learns-python:last-lesson/);
  assert.match(courseShell, /window\.localStorage\.setItem/);
  assert.match(courseShell, /completed-lessons/);
  assert.match(courseShell, /CourseLessonFooter/);
  assert.match(courseShell, /aria-label="返回课程封面"/);
  assert.doesNotMatch(courseShell, /cover-nav-link/);
  assert.match(playground, /\/runtime\/skulpt\.min\.js/);
  assert.match(playground, /\/runtime\/skulpt-stdlib\.js/);
  assert.match(playground, /Sk\.importMainWithBody/);
  assert.match(playground, /inputfunTakesPrompt:\s*true/);
  assert.match(playground, /Sk\.TurtleGraphics/);
  assert.match(playground, /luna-learns-python:code/);
});
