"use client";

import { createContext, type ReactNode, useContext } from "react";

const LessonSessionContext = createContext("unknown-lesson");

export function LessonSessionProvider({
  lessonId,
  children,
}: {
  lessonId: string;
  children: ReactNode;
}) {
  return (
    <LessonSessionContext.Provider value={lessonId}>
      {children}
    </LessonSessionContext.Provider>
  );
}

export function useLessonSessionId() {
  return useContext(LessonSessionContext);
}
