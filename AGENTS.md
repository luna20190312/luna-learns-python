# Project Instructions

- 每次新增、删除、重命名或明显修改课程，都必须在同一次改动中同步维护 `README.md`。
- `README.md` 中的章节、课程清单、课程总数和完成状态必须与 `app/components/CourseShell.tsx` 一致。
- 每节课程使用独立的 `app/lessons/LessonXX_YY.tsx` 文件，并在 `CourseShell.tsx` 中登记。
- 面向孩子的课程应包含明确目标、可操作的互动、可运行的 Python 示例和简短总结。
- 完成改动后运行 `npm run build`；涉及交互运行逻辑时也应运行相关测试。
