"use client";

import { socket } from "@/utils/socket";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

export default function NewTask({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmitTask() {
    if(!data.title || !data.description) return alert("Please fill all details")
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URl}/api/task`,
        data
      );
      if (response.status == 201) {
        onClose();
        setLoading(false);
        socket.send(JSON.stringify({event:"task:new",id:response?.data?.id}))
        return alert("Task Created Successfully");
      }
      throw new Error("Task not Created");
    } catch (error) {
      setLoading(false);
      console.log("Error on posting request: ", error);
      return alert("Error while creating task");
    }
  }

  return (
    <section className="w-full h-full absolute bg-black/90 z-40 flex items-center justify-center">
      <div className="relative bg-black rounded-sm text-white flex flex-col p-5 gap-3 w-full md:w-5/12 mx-5">
        <span className="flex justify-end">
          <button onClick={() => onClose()}>
            <IoClose />
          </button>
        </span>
        <span className="flex justify-center">
          <h1 className="font-semibold text-xl">Add New Task </h1>
        </span>
        <span className="flex flex-col text-lg gap-2">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            id="title"
            className="bg-transparent outline-none border border-white/40 focus:border-white rounded-sm px-2 py-1 w-full"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            onChange={(e) => setData({ ...data, description: e.target.value })}
            rows={10}
            className="bg-transparent outline-none border border-white/40 focus:border-white rounded-sm px-2 py-1 w-full resize-none"
          ></textarea>
        </span>
        <span className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmitTask}
            className="py-1 px-3 bg-white text-black block"
            disabled={loading}
          >
            {loading ? <AiOutlineLoading className="animate-spin" /> : "Submit"}
          </button>
        </span>
      </div>
    </section>
  );
}
