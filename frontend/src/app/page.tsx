"use client";

import NewTask from "@/components/newTask";
import Task from "@/components/task";
import { itask } from "@/types/task";
import { useMemo, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";

type iNav = "All" | "Pending" | "Completed";

export default function Home() {
  const [nav, setNav] = useState<iNav>("All");
  const [toggleNewTask, setToggleNewTask] = useState(false);

  const tasks: itask[] = [
    {
      id: "1",
      title: "What is Lorem Ipsum?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      status: "PENDING",
      completedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "What is Lorem Ipsum?",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
      status: "COMPLETED",
      completedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "What is Lorem Ipsum?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      status: "PENDING",
      completedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "What is Lorem Ipsum?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
      status: "PENDING",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  const filterTask = useMemo(() => {
    if (nav == "All") return tasks;
    return tasks.filter((task) => task.status == nav.toUpperCase());
  }, [nav,tasks]);

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
