"use client"

import { itask } from "@/types/task";
import { socket } from "@/utils/socket";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Task({
  id,
  title,
  status,
  description,
  createdAt,
  completedAt,
}: itask) {
  const [loading, setLoading] = useState(false);

  async function handleCompleteTask() {
    if(status=="COMPLETED") return 
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URl}/api/task/${id}`
      );
      if (response.status == 201) {
        socket.send(JSON.stringify({event:"task:completed",id}))
        return setLoading(false);
      }
      throw new Error("Task not Updated");
    } catch (error) {
      setLoading(false);
      console.log("Error on posting request: ", error);
      return alert("Error while updating task");
    }
  }

  return (
    <span
      key={id}
      className="border-2 border-black/5 rounded-sm p-3 h-60 grid grid-rows-[auto_1fr_auto] overflow-hidden gap-2"
    >
      <span>
        <h1 className="font-semibold truncate">{title}</h1>
        <p className="text-xs opacity-45">
          ~
          {new Date(createdAt).toLocaleString([], {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </span>
      <p className="relative text-sm  overflow-hidden text-ellipsis after:contents[''] after:text-center after:absolute after:bottom-0 after:right-0 after:w-10/12 after:h-5 after:bg-gradient-to-r after:from-transparent after:to-white">
        {description}
      </p>
      <button
        type="button"
        disabled={loading || status != "PENDING" }
        onClick={handleCompleteTask}
        className={`border bg-green-800 text-white py-1 rounded-md flex items-center justify-center ${
          status != "PENDING" && "opacity-50"
        }`}
      >
        {loading ? <AiOutlineLoading className="animate-spin" /> :(status == "PENDING" ? (
          "Mark as Completed"
        ) : (
          <p className="">
            Completed on{" "}
              {new Date(completedAt).toLocaleString([], {
                dateStyle: "medium",
                timeStyle: "short",
              })}
          </p>
        ))}
      </button>
    </span>
  );
}
