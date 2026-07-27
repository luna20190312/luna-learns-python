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
  assert.equal(lessonFiles.length, 13);

  for (const file of lessonFiles) {
    const component = file.replace(".tsx", "");
    assert.match(courseShell, new RegExp(`import ${component} from`));
    assert.match(courseShell, new RegExp(`component: ${component}`));
  }

  assert.equal((courseShell.match(/status: "ready",/g) ?? []).length, 13);
  assert.match(courseShell, /luna-learns-python:last-lesson/);
  assert.match(courseShell, /window\.localStorage\.setItem/);
  assert.match(playground, /\/runtime\/skulpt\.min\.js/);
  assert.match(playground, /\/runtime\/skulpt-stdlib\.js/);
  assert.match(playground, /Sk\.importMainWithBody/);
  assert.match(playground, /inputfunTakesPrompt:\s*true/);
});
