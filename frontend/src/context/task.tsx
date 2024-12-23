"use client";

import { itask } from "@/types/task";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

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
  useEffect(() => {
    if (tasks && tasks.length > 0) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URl}/api/task`)
      .then((res) => {
        if (res.status == 200) {
          setTasks(res.data);
        }
      })
      .catch((err) => {
        console.log("Error on fetching data: ", err);
      });
  }, []);

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
