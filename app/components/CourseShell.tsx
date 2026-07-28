"use client";

import { useEffect, useMemo, useState } from "react";
import CourseCover from "./CourseCover";
import CourseLessonFooter from "./CourseLessonFooter";
import { LessonSessionProvider } from "./LessonSessionContext";
import SiteSettings, {
  type SiteLanguage,
  type SiteTheme,
} from "./SiteSettings";
import Lesson00_01 from "../lessons/Lesson00_01";
import Lesson01_01 from "../lessons/Lesson01_01";
import Lesson01_02 from "../lessons/Lesson01_02";
import Lesson01_03 from "../lessons/Lesson01_03";
import Lesson01_04 from "../lessons/Lesson01_04";
import Lesson01_05 from "../lessons/Lesson01_05";
import Lesson01_06 from "../lessons/Lesson01_06";
import Lesson02_01 from "../lessons/Lesson02_01";
import Lesson02_02 from "../lessons/Lesson02_02";
import Lesson02_03 from "../lessons/Lesson02_03";
import Lesson02_04 from "../lessons/Lesson02_04";
import Lesson02_05 from "../lessons/Lesson02_05";
import Lesson02_06 from "../lessons/Lesson02_06";
import Lesson03_01 from "../lessons/Lesson03_01";
import Lesson03_02 from "../lessons/Lesson03_02";
import Lesson03_03 from "../lessons/Lesson03_03";
import Lesson03_04 from "../lessons/Lesson03_04";
import Lesson03_05 from "../lessons/Lesson03_05";
import Lesson03_06 from "../lessons/Lesson03_06";
import Lesson04_01 from "../lessons/Lesson04_01";
import Lesson04_02 from "../lessons/Lesson04_02";
import Lesson04_03 from "../lessons/Lesson04_03";
import Lesson04_04 from "../lessons/Lesson04_04";
import Lesson04_05 from "../lessons/Lesson04_05";
import Lesson04_06 from "../lessons/Lesson04_06";
import Lesson05_01 from "../lessons/Lesson05_01";
import Lesson05_02 from "../lessons/Lesson05_02";
import Lesson05_03 from "../lessons/Lesson05_03";
import Lesson05_04 from "../lessons/Lesson05_04";
import Lesson05_05 from "../lessons/Lesson05_05";
import Lesson05_06 from "../lessons/Lesson05_06";
import Lesson06_01 from "../lessons/Lesson06_01";
import Lesson06_02 from "../lessons/Lesson06_02";
import Lesson06_03 from "../lessons/Lesson06_03";
import Lesson06_04 from "../lessons/Lesson06_04";
import Lesson06_05 from "../lessons/Lesson06_05";
import Lesson06_06 from "../lessons/Lesson06_06";
import Lesson07_01 from "../lessons/Lesson07_01";
import Lesson07_02 from "../lessons/Lesson07_02";
import Lesson07_03 from "../lessons/Lesson07_03";
import Lesson07_04 from "../lessons/Lesson07_04";
import Lesson07_05 from "../lessons/Lesson07_05";
import Lesson07_06 from "../lessons/Lesson07_06";
import Lesson08_01 from "../lessons/Lesson08_01";
import Lesson08_02 from "../lessons/Lesson08_02";
import Lesson08_03 from "../lessons/Lesson08_03";
import Lesson08_04 from "../lessons/Lesson08_04";
import Lesson08_05 from "../lessons/Lesson08_05";
import Lesson08_06 from "../lessons/Lesson08_06";
import Lesson09_01 from "../lessons/Lesson09_01";
import Lesson09_02 from "../lessons/Lesson09_02";
import Lesson09_03 from "../lessons/Lesson09_03";
import Lesson09_04 from "../lessons/Lesson09_04";
import Lesson09_05 from "../lessons/Lesson09_05";
import Lesson09_06 from "../lessons/Lesson09_06";
import Lesson10_01 from "../lessons/Lesson10_01";
import Lesson10_02 from "../lessons/Lesson10_02";
import Lesson10_03 from "../lessons/Lesson10_03";
import Lesson10_04 from "../lessons/Lesson10_04";
import Lesson10_05 from "../lessons/Lesson10_05";
import Lesson10_06 from "../lessons/Lesson10_06";
import Lesson11_01 from "../lessons/Lesson11_01";
import Lesson11_02 from "../lessons/Lesson11_02";
import Lesson11_03 from "../lessons/Lesson11_03";
import Lesson11_04 from "../lessons/Lesson11_04";
import Lesson11_05 from "../lessons/Lesson11_05";
import Lesson11_06 from "../lessons/Lesson11_06";
import Lesson11_07 from "../lessons/Lesson11_07";
import Lesson11_08 from "../lessons/Lesson11_08";

type LessonEntry = {
  id: string;
  number: string;
  title: string;
  component: React.ComponentType;
  status: "ready" | "planned";
};

type ChapterEntry = {
  number: string;
  title: string;
  description: string;
  lessons: LessonEntry[];
};

const chapters: ChapterEntry[] = [
  {
    number: "第 0 章",
    title: "先看看能做什么",
    description: "不解释，先动手",
    lessons: [
      {
        id: "00-01",
        number: "第 1 课",
        title: "代码会做什么？",
        component: Lesson00_01,
        status: "ready",
      },
    ],
  },
  {
    number: "第 1 章",
    title: "给计算机准确的指令",
    description: "从最小语法开始",
    lessons: [
      {
        id: "01-01",
        number: "第 1 课",
        title: "代码是一行一行执行的",
        component: Lesson01_01,
        status: "ready",
      },
      {
        id: "01-02",
        number: "第 2 课",
        title: "一条指令由什么组成",
        component: Lesson01_02,
        status: "ready",
      },
      {
        id: "01-03",
        number: "第 3 课",
        title: "数字会计算",
        component: Lesson01_03,
        status: "ready",
      },
      {
        id: "01-04",
        number: "第 4 课",
        title: "文字也可以组合",
        component: Lesson01_04,
        status: "ready",
      },
      {
        id: "01-05",
        number: "第 5 课",
        title: "用变量记住东西",
        component: Lesson01_05,
        status: "ready",
      },
      {
        id: "01-06",
        number: "第 6 课",
        title: "制作角色状态卡",
        component: Lesson01_06,
        status: "ready",
      },
    ],
  },
  {
    number: "第 2 章",
    title: "让程序学会选择",
    description: "输入、比较与条件判断",
    lessons: [
      {
        id: "02-01",
        number: "第 1 课",
        title: "程序也会问问题",
        component: Lesson02_01,
        status: "ready",
      },
      {
        id: "02-02",
        number: "第 2 课",
        title: "这两个东西一样吗",
        component: Lesson02_02,
        status: "ready",
      },
      {
        id: "02-03",
        number: "第 3 课",
        title: "满足条件才行动",
        component: Lesson02_03,
        status: "ready",
      },
      {
        id: "02-04",
        number: "第 4 课",
        title: "两条不同的道路",
        component: Lesson02_04,
        status: "ready",
      },
      {
        id: "02-05",
        number: "第 5 课",
        title: "不止两种选择",
        component: Lesson02_05,
        status: "ready",
      },
      {
        id: "02-06",
        number: "第 6 课",
        title: "魔法门闯关",
        component: Lesson02_06,
        status: "ready",
      },
    ],
  },
  {
    number: "第 3 章",
    title: "让程序重复工作",
    description: "for、range 与 while 循环",
    lessons: [
      {
        id: "03-01",
        number: "第 1 课",
        title: "重复说三遍",
        component: Lesson03_01,
        status: "ready",
      },
      {
        id: "03-02",
        number: "第 2 课",
        title: "用 for 自动重复",
        component: Lesson03_02,
        status: "ready",
      },
      {
        id: "03-03",
        number: "第 3 课",
        title: "range() 数字制造机",
        component: Lesson03_03,
        status: "ready",
      },
      {
        id: "03-04",
        number: "第 4 课",
        title: "倒计时开始",
        component: Lesson03_04,
        status: "ready",
      },
      {
        id: "03-05",
        number: "第 5 课",
        title: "不知道次数怎么办",
        component: Lesson03_05,
        status: "ready",
      },
      {
        id: "03-06",
        number: "第 6 课",
        title: "猜数字小游戏",
        component: Lesson03_06,
        status: "ready",
      },
    ],
  },
  {
    number: "第 4 章",
    title: "把代码变成自己的指令",
    description: "函数、参数与返回值",
    lessons: [
      {
        id: "04-01",
        number: "第 1 课",
        title: "给一段代码起名字",
        component: Lesson04_01,
        status: "ready",
      },
      {
        id: "04-02",
        number: "第 2 课",
        title: "呼叫自己的指令",
        component: Lesson04_02,
        status: "ready",
      },
      {
        id: "04-03",
        number: "第 3 课",
        title: "给函数送一份礼物",
        component: Lesson04_03,
        status: "ready",
      },
      {
        id: "04-04",
        number: "第 4 课",
        title: "函数把答案带回来",
        component: Lesson04_04,
        status: "ready",
      },
      {
        id: "04-05",
        number: "第 5 课",
        title: "制作角色技能",
        component: Lesson04_05,
        status: "ready",
      },
      {
        id: "04-06",
        number: "第 6 课",
        title: "建造小小工具箱",
        component: Lesson04_06,
        status: "ready",
      },
    ],
  },
  {
    number: "第 5 章",
    title: "一次记住很多东西",
    description: "列表、下标与遍历",
    lessons: [
      {
        id: "05-01",
        number: "第 1 课",
        title: "装着宝物的背包",
        component: Lesson05_01,
        status: "ready",
      },
      {
        id: "05-02",
        number: "第 2 课",
        title: "找到第几个宝物",
        component: Lesson05_02,
        status: "ready",
      },
      {
        id: "05-03",
        number: "第 3 课",
        title: "把新宝物放进去",
        component: Lesson05_03,
        status: "ready",
      },
      {
        id: "05-04",
        number: "第 4 课",
        title: "宝物也能被拿走",
        component: Lesson05_04,
        status: "ready",
      },
      {
        id: "05-05",
        number: "第 5 课",
        title: "逐个查看背包",
        component: Lesson05_05,
        status: "ready",
      },
      {
        id: "05-06",
        number: "第 6 课",
        title: "随机抽取幸运宝物",
        component: Lesson05_06,
        status: "ready",
      },
    ],
  },
  {
    number: "第 6 章",
    title: "文字的秘密",
    description: "长度、字符与文字处理",
    lessons: [
      {
        id: "06-01",
        number: "第 1 课",
        title: "文字也有长度",
        component: Lesson06_01,
        status: "ready",
      },
      {
        id: "06-02",
        number: "第 2 课",
        title: "找到文字中的字符",
        component: Lesson06_02,
        status: "ready",
      },
      {
        id: "06-03",
        number: "第 3 课",
        title: "大写、小写变变变",
        component: Lesson06_03,
        status: "ready",
      },
      {
        id: "06-04",
        number: "第 4 课",
        title: "拆开一句话",
        component: Lesson06_04,
        status: "ready",
      },
      {
        id: "06-05",
        number: "第 5 课",
        title: "检查秘密关键词",
        component: Lesson06_05,
        status: "ready",
      },
      {
        id: "06-06",
        number: "第 6 课",
        title: "制作密码检查员",
        component: Lesson06_06,
        status: "ready",
      },
    ],
  },
  {
    number: "第 7 章",
    title: "用代码画出一个世界",
    description: "坐标、图形与 Turtle 创作",
    lessons: [
      { id: "07-01", number: "第 1 课", title: "认识画布和坐标", component: Lesson07_01, status: "ready" },
      { id: "07-02", number: "第 2 课", title: "画出彩色多边形", component: Lesson07_02, status: "ready" },
      { id: "07-03", number: "第 3 课", title: "制作旋转花朵", component: Lesson07_03, status: "ready" },
      { id: "07-04", number: "第 4 课", title: "画笔也能听指令", component: Lesson07_04, status: "ready" },
      { id: "07-05", number: "第 5 课", title: "随机漫步的小海龟", component: Lesson07_05, status: "ready" },
      { id: "07-06", number: "第 6 课", title: "设计自己的星空", component: Lesson07_06, status: "ready" },
    ],
  },
  {
    number: "第 8 章",
    title: "给数据贴上名字",
    description: "字典、键和值",
    lessons: [
      { id: "08-01", number: "第 1 课", title: "角色资料卡升级", component: Lesson08_01, status: "ready" },
      { id: "08-02", number: "第 2 课", title: "按名字找到资料", component: Lesson08_02, status: "ready" },
      { id: "08-03", number: "第 3 课", title: "修改角色的状态", component: Lesson08_03, status: "ready" },
      { id: "08-04", number: "第 4 课", title: "查看所有资料", component: Lesson08_04, status: "ready" },
      { id: "08-05", number: "第 5 课", title: "一支冒险小队", component: Lesson08_05, status: "ready" },
      { id: "08-06", number: "第 6 课", title: "制作怪物图鉴", component: Lesson08_06, status: "ready" },
    ],
  },
  {
    number: "第 9 章",
    title: "成为代码侦探",
    description: "错误信息与调试方法",
    lessons: [
      { id: "09-01", number: "第 1 课", title: "错误不是失败", component: Lesson09_01, status: "ready" },
      { id: "09-02", number: "第 2 课", title: "消失的标点符号", component: Lesson09_02, status: "ready" },
      { id: "09-03", number: "第 3 课", title: "变量为什么不认识我", component: Lesson09_03, status: "ready" },
      { id: "09-04", number: "第 4 课", title: "程序为什么停不下来", component: Lesson09_04, status: "ready" },
      { id: "09-05", number: "第 5 课", title: "用 print() 寻找线索", component: Lesson09_05, status: "ready" },
      { id: "09-06", number: "第 6 课", title: "修复坏掉的小游戏", component: Lesson09_06, status: "ready" },
    ],
  },
  {
    number: "第 10 章",
    title: "Python 小小创作家",
    description: "把语法组合成完整作品",
    lessons: [
      { id: "10-01", number: "第 1 课", title: "石头剪刀布", component: Lesson10_01, status: "ready" },
      { id: "10-02", number: "第 2 课", title: "数字猜猜看", component: Lesson10_02, status: "ready" },
      { id: "10-03", number: "第 3 课", title: "文字冒险游戏", component: Lesson10_03, status: "ready" },
      { id: "10-04", number: "第 4 课", title: "宠物养成日记", component: Lesson10_04, status: "ready" },
      { id: "10-05", number: "第 5 课", title: "随机故事生成器", component: Lesson10_05, status: "ready" },
      { id: "10-06", number: "第 6 课", title: "我的第一个独立作品", component: Lesson10_06, status: "ready" },
    ],
  },
  {
    number: "高阶 第 11 章",
    title: "通往完整 Python",
    description: "类型、逻辑、异常与模块",
    lessons: [
      { id: "11-01", number: "第 1 课", title: "数据也有不同种类", component: Lesson11_01, status: "ready" },
      { id: "11-02", number: "第 2 课", title: "数据变身术", component: Lesson11_02, status: "ready" },
      { id: "11-03", number: "第 3 课", title: "同时检查多个条件", component: Lesson11_03, status: "ready" },
      { id: "11-04", number: "第 4 课", title: "Python 的常用小工具", component: Lesson11_04, status: "ready" },
      { id: "11-05", number: "第 5 课", title: "一次取出一段内容", component: Lesson11_05, status: "ready" },
      { id: "11-06", number: "第 6 课", title: "程序出错也能继续", component: Lesson11_06, status: "ready" },
      { id: "11-07", number: "第 7 课", title: "工具从哪里来", component: Lesson11_07, status: "ready" },
      { id: "11-08", number: "第 8 课", title: "浏览器 Python 与完整 Python", component: Lesson11_08, status: "ready" },
    ],
  },
];

const allLessons = chapters.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({ chapter, lesson })),
);

const progressStorageKey = "luna-learns-python:last-lesson";
const completionStorageKey = "luna-learns-python:completed-lessons";
const settingsStorageKey = "luna-learns-python:settings";

const chapterLearningExtras: Record<
  string,
  {
    parentTip: string;
    quiz: {
      question: string;
      options: string[];
      answer: number;
      explanation: string;
    };
  }
> = {
  "第 0 章": {
    parentTip: "先让孩子自由点击和修改，不急着解释语法；能说出“代码会产生结果”就足够。",
    quiz: {
      question: "想知道一段代码会发生什么，最直接的方法是什么？",
      options: ["运行它并观察", "把它背下来", "只看代码颜色"],
      answer: 0,
      explanation: "编程学习最重要的习惯之一，就是运行、观察，再做一次小修改。",
    },
  },
  "第 1 章": {
    parentTip: "请孩子用自己的话说出每一行做什么，不要求背诵英文单词。",
    quiz: {
      question: "变量最像下面哪一种东西？",
      options: ["贴着名字的盒子", "只能按一次的按钮", "永远不变的图片"],
      answer: 0,
      explanation: "变量用名字保存数据，盒子里的内容还可以被换成新的。",
    },
  },
  "第 2 章": {
    parentTip: "用生活中的选择提问，例如“如果下雨怎么办”，帮助孩子把条件和行动联系起来。",
    quiz: {
      question: "if 后面的条件成立时，会发生什么？",
      options: ["执行缩进的代码", "关闭整个程序", "跳过所有代码"],
      answer: 0,
      explanation: "if 先检查条件，条件为 True 才执行属于它的缩进代码。",
    },
  },
  "第 3 章": {
    parentTip: "让孩子先猜循环会重复几次，再运行验证；猜错也属于实验的一部分。",
    quiz: {
      question: "什么时候最适合想到循环？",
      options: ["同一件事要重复很多次", "只需要显示一个字", "准备关闭网页"],
      answer: 0,
      explanation: "循环就是把重复工作交给计算机。",
    },
  },
  "第 4 章": {
    parentTip: "把函数叫作“自己发明的新指令”，先关注输入和结果，不必强调正式术语。",
    quiz: {
      question: "定义函数以后，怎样让它真正工作？",
      options: ["调用函数", "只写 def", "删除括号"],
      answer: 0,
      explanation: "def 是教会计算机新指令，写出函数名和括号才是调用它。",
    },
  },
  "第 5 章": {
    parentTip: "可以用真实书包和几件小物品演示列表顺序以及从 0 开始的下标。",
    quiz: {
      question: "列表中第一项的下标是多少？",
      options: ["0", "1", "-1"],
      answer: 0,
      explanation: "Python 从 0 开始计算位置，所以第一项是 0。",
    },
  },
  "第 6 章": {
    parentTip: "把一个汉字、字母、标点和空格分别写在纸片上，帮助孩子理解字符。",
    quiz: {
      question: "len() 可以告诉我们什么？",
      options: ["文字有多少个字符", "文字是什么颜色", "文字应该放在哪里"],
      answer: 0,
      explanation: "len() 用来测量字符串或列表中一共有多少项。",
    },
  },
  "第 7 章": {
    parentTip: "让孩子先用手比划海龟前进和转弯，再修改距离或角度。",
    quiz: {
      question: "在坐标中，哪个数字控制左右位置？",
      options: ["x", "y", "颜色"],
      answer: 0,
      explanation: "x 控制左右，y 控制上下。",
    },
  },
  "第 8 章": {
    parentTip: "可以拿一张人物资料卡，让孩子指出哪些是标签、哪些是标签后的内容。",
    quiz: {
      question: "字典主要用什么查找资料？",
      options: ["键", "固定数字下标", "循环次数"],
      answer: 0,
      explanation: "字典通过自己命名的键找到对应的值。",
    },
  },
  "第 9 章": {
    parentTip: "遇到错误时不要直接指出答案，先问“错误说第几行、哪个名字”。",
    quiz: {
      question: "代码出错后，最好的第一步是什么？",
      options: ["阅读错误线索", "删除全部代码", "随便改很多地方"],
      answer: 0,
      explanation: "先读错误位置和种类，再一次只修改一个地方。",
    },
  },
  "第 10 章": {
    parentTip: "作品不必一次完成；鼓励孩子先做一个能运行的小版本，再逐步加想法。",
    quiz: {
      question: "开始独立作品时，最稳妥的方法是什么？",
      options: ["先做最小可运行版本", "一次加入所有功能", "只设计不运行"],
      answer: 0,
      explanation: "先运行成功，再一次增加一个功能，更容易发现和解决问题。",
    },
  },
  "高阶 第 11 章": {
    parentTip: "这一章术语稍多，重点是能辨认和使用，不要求一次记住所有英文名称。",
    quiz: {
      question: "网页实验台和完整桌面 Python 的关系是什么？",
      options: ["核心语法相同，运行环境能力不同", "是两种完全不同的语言", "只有网页版本能运行代码"],
      answer: 0,
      explanation: "变量、条件、循环等核心语法相同；桌面 Python 还能使用文件和更多软件包。",
    },
  },
};

export default function CourseShell() {
  const [activeId, setActiveId] = useState("cover");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastLessonId, setLastLessonId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [language, setLanguage] = useState<SiteLanguage>("zh");
  const [theme, setTheme] = useState<SiteTheme>("macaron");
  const [settingsReady, setSettingsReady] = useState(false);

  useEffect(() => {
    const readLessonFromUrl = () => {
      const requested = new URLSearchParams(window.location.search).get("lesson");
      if (requested && allLessons.some(({ lesson }) => lesson.id === requested)) {
        setActiveId(requested);
        setLastLessonId(requested);
        window.localStorage.setItem(progressStorageKey, requested);
      } else {
        setActiveId("cover");
      }
    };

    const savedLesson = window.localStorage.getItem(progressStorageKey);
    if (
      savedLesson &&
      allLessons.some(({ lesson }) => lesson.id === savedLesson)
    ) {
      setLastLessonId(savedLesson);
    }
    try {
      const savedCompleted = JSON.parse(
        window.localStorage.getItem(completionStorageKey) ?? "[]",
      );
      if (Array.isArray(savedCompleted)) {
        setCompletedIds(
          savedCompleted.filter((id) =>
            allLessons.some(({ lesson }) => lesson.id === id),
          ),
        );
      }
    } catch {
      window.localStorage.removeItem(completionStorageKey);
    }
    try {
      const savedSettings = JSON.parse(
        window.localStorage.getItem(settingsStorageKey) ?? "{}",
      );
      if (savedSettings.language === "zh" || savedSettings.language === "en") {
        setLanguage(savedSettings.language);
      }
      if (
        savedSettings.theme === "macaron" ||
        savedSettings.theme === "mint" ||
        savedSettings.theme === "classic"
      ) {
        setTheme(savedSettings.theme);
      }
    } catch {
      window.localStorage.removeItem(settingsStorageKey);
    }
    setSettingsReady(true);
    readLessonFromUrl();
    window.addEventListener("popstate", readLessonFromUrl);
    return () => window.removeEventListener("popstate", readLessonFromUrl);
  }, []);

  useEffect(() => {
    if (!settingsReady) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    window.localStorage.setItem(
      settingsStorageKey,
      JSON.stringify({ language, theme }),
    );
  }, [language, settingsReady, theme]);

  const active = useMemo(
    () => allLessons.find(({ lesson }) => lesson.id === activeId),
    [activeId],
  );
  const activeIndex = allLessons.findIndex(
    ({ lesson }) => lesson.id === activeId,
  );

  function openLesson(id: string) {
    setActiveId(id);
    setSidebarOpen(false);
    const url = new URL(window.location.href);
    if (id === "cover") {
      url.searchParams.delete("lesson");
    } else {
      url.searchParams.set("lesson", id);
      setLastLessonId(id);
      window.localStorage.setItem(progressStorageKey, id);
    }
    window.history.pushState({}, "", url);
    window.scrollTo({ top: 0 });
    document.querySelector(".course-main")?.scrollTo({ top: 0 });
  }

  function toggleCompleted(id: string) {
    setCompletedIds((current) => {
      const next = current.includes(id)
        ? current.filter((lessonId) => lessonId !== id)
        : [...current, id];
      window.localStorage.setItem(completionStorageKey, JSON.stringify(next));
      return next;
    });
  }

  if (!active) {
    return (
      <>
        <CourseCover
          chapters={chapters.map(({ number, title, description }) => ({
            number,
            title,
            description,
          }))}
          onStart={() => openLesson(allLessons[0].lesson.id)}
          onContinue={
            lastLessonId ? () => openLesson(lastLessonId) : undefined
          }
          continueTitle={
            lastLessonId
              ? allLessons.find(({ lesson }) => lesson.id === lastLessonId)?.lesson
                  .title
              : undefined
          }
          language={language}
        />
        <SiteSettings
          language={language}
          theme={theme}
          onLanguageChange={setLanguage}
          onThemeChange={setTheme}
          cover
        />
      </>
    );
  }

  const en = language === "en";
  const ActiveLesson = active.lesson.component;
  const previousLesson =
    activeIndex > 0
      ? {
          ...allLessons[activeIndex - 1].lesson,
          chapter: allLessons[activeIndex - 1].chapter.number,
        }
      : undefined;
  const nextLesson =
    activeIndex < allLessons.length - 1
      ? {
          ...allLessons[activeIndex + 1].lesson,
          chapter: allLessons[activeIndex + 1].chapter.number,
        }
      : undefined;
  const chapterExtra = chapterLearningExtras[active.chapter.number];
  const isLastInChapter =
    active.chapter.lessons.at(-1)?.id === active.lesson.id;

  return (
    <div className="course-shell">
      <aside
        className={`course-sidebar ${sidebarOpen ? "is-open" : ""}`}
        aria-label={en ? "Course contents" : "课程目录"}
      >
        <div className="sidebar-brand">
          <button
            className="sidebar-home-button"
            onClick={() => openLesson("cover")}
            aria-label={en ? "Back to course cover" : "返回课程封面"}
            type="button"
          >
            <span className="sprout-logo" aria-hidden="true">
              <i className="sprout-stem" />
              <i className="sprout-leaf sprout-leaf-left" />
              <i className="sprout-leaf sprout-leaf-right" />
              <i className="sprout-soil" />
            </span>
            <span className="sidebar-brand-copy">
              <strong>贝琪的代码实验室</strong>
              <small>{en ? "Python learning course" : "Python 学习课件"}</small>
            </span>
          </button>
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label={en ? "Close course contents" : "关闭课程目录"}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="course-progress">
          <div>
            <span>{en ? "LEARNING PROGRESS" : "内容状态"}</span>
            <strong>
              {completedIds.length} / {allLessons.length}{" "}
              {en ? "completed" : "已完成"}
            </strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <i
              style={{
                width: `${
                  (completedIds.length / allLessons.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <nav className="course-tree">
          {chapters.map((chapter) => (
            <section className="chapter-group" key={chapter.number}>
              <header>
                <span>{chapter.number}</span>
                <h2>{chapter.title}</h2>
                {chapter.lessons.every((lesson) =>
                  completedIds.includes(lesson.id),
                ) && (
                  <b className="chapter-complete-badge">
                    {en ? "DONE" : "完成"}
                  </b>
                )}
                <p>{chapter.description}</p>
              </header>
              <div className="lesson-links">
                {chapter.lessons.map((lesson) => {
                  const isActive = lesson.id === activeId;
                  return (
                    <button
                      className={isActive ? "active" : ""}
                      aria-current={isActive ? "page" : undefined}
                      key={lesson.id}
                      onClick={() => openLesson(lesson.id)}
                      type="button"
                    >
                      <span>{lesson.number.replace("第 ", "").replace(" 课", "")}</span>
                      <span className="lesson-link-copy">
                        <small>{lesson.number}</small>
                        <strong>{lesson.title}</strong>
                      </span>
                      <i
                        className={`lesson-state ${
                          completedIds.includes(lesson.id)
                            ? "completed"
                            : lesson.status
                        }`}
                        aria-label={
                          completedIds.includes(lesson.id)
                            ? en
                              ? "Completed"
                              : "已经完成"
                            : lesson.status === "ready"
                              ? en
                                ? "Ready"
                                : "可以学习"
                              : en
                                ? "Planned"
                                : "待制作"
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        <footer className="sidebar-footer">
          <div>
            <span>当前课程</span>
            <strong>{active.lesson.title}</strong>
          </div>
          <SiteSettings
            language={language}
            theme={theme}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
            inline
          />
        </footer>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-scrim"
          onClick={() => setSidebarOpen(false)}
          aria-label={en ? "Close course contents" : "关闭课程目录"}
          type="button"
        />
      )}

      <main className="course-main">
        <header className="course-toolbar">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
            type="button"
          >
            <span aria-hidden="true">☰</span>
            {en ? "Contents" : "课程目录"}
          </button>
          <div className="toolbar-path">
            <span>{active.chapter.number}</span>
            <i aria-hidden="true">/</i>
            <strong>{active.lesson.number}</strong>
            <i aria-hidden="true">/</i>
            <span>{active.lesson.title}</span>
          </div>
          <div className="toolbar-arrows">
            <button
              disabled={activeIndex <= 0}
              onClick={() => openLesson(allLessons[activeIndex - 1].lesson.id)}
              aria-label={en ? "Previous lesson" : "上一课"}
              type="button"
            >
              ←
            </button>
            <button
              disabled={activeIndex >= allLessons.length - 1}
              onClick={() => openLesson(allLessons[activeIndex + 1].lesson.id)}
              aria-label={en ? "Next lesson" : "下一课"}
              type="button"
            >
              →
            </button>
          </div>
        </header>

        <div className="course-content" key={active.lesson.id}>
          <LessonSessionProvider lessonId={active.lesson.id}>
            <ActiveLesson />
          </LessonSessionProvider>
          <CourseLessonFooter
            lessonId={active.lesson.id}
            completed={completedIds.includes(active.lesson.id)}
            onToggleComplete={() => toggleCompleted(active.lesson.id)}
            previous={previousLesson}
            next={nextLesson}
            onOpenLesson={openLesson}
            parentTip={chapterExtra?.parentTip ?? "让孩子先操作、先观察，再用自己的话说出发现。"}
            quiz={isLastInChapter ? chapterExtra?.quiz : undefined}
            language={language}
          />
        </div>
      </main>
    </div>
  );
}
