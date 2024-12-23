"use client";

import NewTask from "@/components/newTask";
import Task from "@/components/task";
import useTask from "@/hooks/task";
import listemMessages from "@/utils/listenMessages";
import { socket } from "@/utils/socket";
import { useEffect, useMemo, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";

type iNav = "All" | "Pending" | "Completed";

export default function Home() {
  const [nav, setNav] = useState<iNav>("All");
  const [toggleNewTask, setToggleNewTask] = useState(false);
  const task = useTask();

  useEffect(() => {
    socket.onmessage = (message) => {
      try {
        listemMessages(JSON.parse(message.data), task);
      } catch (error) {
        console.log("error on listening events", error);
      }
    };
  }, []);

  const filterTask = useMemo(() => {
    const reversedTask = [...task?.value].reverse();
    if (nav == "All") return reversedTask;
    return reversedTask.filter((task) => task.status == nav.toUpperCase());
  }, [nav, task?.value]);

  return (
    <>
      {toggleNewTask && <NewTask onClose={() => setToggleNewTask(false)} />}
      <section
        className={`px-10 w-full h-dvh ${toggleNewTask && "overflow-hidden"}`}
      >
        <header className="relative flex items-center justify-between py-1 pt-2">
          <h1 className="font-semibold text-lg">Task Manager</h1>
          <button className="flex justify-center items-center border border-gray-500 px-3 py-1 rounded-sm gap-2">
            <FaRegUser />
            <p>Kamal Singh</p>
          </button>
        </header>
        <main className="">
          <nav className=" mt-2 flex justify-between flex-wrap gap-2">
            <span className="flex gap-3">
              {["All", "Pending", "Completed"].map((title) => (
                <button
                  type="button"
                  className={`transition-all py-1 px-4 border rounded-sm ${
                    nav == title
                      ? "bg-black text-white"
                      : "hover:bg-slate-950 hover:text-white"
                  }`}
                  key={title}
                  onClick={() => setNav(title as iNav)}
                >
                  {title}
                </button>
              ))}
            </span>
            <button
              className="py-1 px-3 bg-black text-white rounded-md flex items-center gap-1"
              onClick={() => setToggleNewTask(true)}
            >
              {" "}
              <RiAddLargeFill />
              New Task
            </button>
          </nav>
          {filterTask?.length > 0 ? (
            <section className=" mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-5 ">
              {filterTask?.map(
                ({
                  id,
                  title,
                  description,
                  status,
                  completedAt,
                  createdAt,
                }) => (
                  <Task
                    id={id}
                    key={id}
                    title={title}
                    description={description}
                    status={status}
                    completedAt={completedAt}
                    createdAt={createdAt}
                  />
                )
              )}
            </section>
          ) : (
            <div className="flex justify-center text-lg font-semibold mt-5">
              No task found
            </div>
          )}
        </main>
      </section>
    </>
  );
}
