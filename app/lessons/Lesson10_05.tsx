"use client";

import { useState } from "react";
import LessonFrame from "../components/LessonFrame";
import PythonPlayground from "../components/PythonPlayground";

const heroes = ["月兔", "小机器人", "会飞的猫"];
const places = ["糖果星球", "海底图书馆", "云朵城堡"];
const actions = ["找到了一把会唱歌的钥匙", "和巨龙一起烤饼干", "救回了迷路的星星"];

export default function Lesson10_05() {
  const [story, setStory] = useState("点击按钮，故事才会诞生。");
  function generate() { setStory(`${heroes[Math.floor(Math.random() * heroes.length)]}来到${places[Math.floor(Math.random() * places.length)]}，${actions[Math.floor(Math.random() * actions.length)]}。`); }
  return (
    <LessonFrame chapter="第 10 章 · Python 小小创作家" lesson="05" title="随机故事生成器"
      lead="把人物、地点和事件分别装进列表，再各自随机抽一项，就能组合出许多不同故事。"
      goal="把大作品拆成几个数据列表，再按规则组合。"
      closing="少量素材经过随机组合，也能产生很多结果。">
      <section className="activity-card">
        <div className="activity-heading"><span>作品 5</span><div><h2>按一下，生成新故事</h2><p>三个列表各贡献一块内容。</p></div></div>
        <div className="story-generator-lab">
          <div className="story-parts"><div><small>人物</small>{heroes.map((x) => <span key={x}>{x}</span>)}</div><div><small>地点</small>{places.map((x) => <span key={x}>{x}</span>)}</div><div><small>事件</small>{actions.map((x) => <span key={x}>{x}</span>)}</div></div>
          <div className="generated-story"><span>📖</span><p>{story}</p><button type="button" onClick={generate}>生成一个故事</button></div>
        </div>
      </section>
      <PythonPlayground initialCode={`import random\n\nheroes = ["月兔", "小机器人", "会飞的猫"]\nplaces = ["糖果星球", "海底图书馆", "云朵城堡"]\nactions = ["找到会唱歌的钥匙", "和巨龙烤饼干", "救回迷路的星星"]\n\nhero = random.choice(heroes)\nplace = random.choice(places)\naction = random.choice(actions)\n\nprint(hero + "来到" + place + "，" + action + "。")`} title="运行真正的随机故事机" prompt="给每个列表增加一项属于你的素材。" />
    </LessonFrame>
  );
}
