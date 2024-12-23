"use client";

import { itask } from "@/types/task";
import { createContext, useState } from "react";

export type iTaskContext = {
  value: itask[];
  addTask: (task: itask) => void;
  setTasks: (task: itask[]) => void;
  updateCompletedTask: (id: string) => void;
};

export const TaskContext = createContext<iTaskContext | null>(null);

export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<itask[]>([]);
  

  function addTask(task: itask) {
    setTasks((prev) => [task, ...prev]);
  }
  function updateCompletedTask(id: string) {
    setTasks((prev) =>
      prev?.map((task) => {
        if (task?.id == id) {
          return {
            ...task,
            status: "COMPLETED",
            completedAt: new Date().toDateString(),
          };
        }
        return task;
      })
    );
  }
  return (
    <TaskContext.Provider
      value={{ value: tasks, addTask, updateCompletedTask, setTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}
