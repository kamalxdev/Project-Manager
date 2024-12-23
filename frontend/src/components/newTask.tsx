"use client";

import { IoClose } from "react-icons/io5";

export default function NewTask({ onClose }: { onClose: () => void }) {
  return (
    <section className="w-full h-full absolute bg-black/90 z-40 flex items-center justify-center">
      <div
        className="relative bg-black rounded-sm text-white flex flex-col p-5 gap-3 w-full md:w-5/12 mx-5"
      >
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
            id="title"
            className="bg-transparent outline-none border border-white/40 focus:border-white rounded-sm px-2 py-1 w-full"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows={10}
            className="bg-transparent outline-none border border-white/40 focus:border-white rounded-sm px-2 py-1 w-full resize-none"
          ></textarea>
        </span>
        <span className="flex justify-center">
          <button type="button" className="py-1 px-3 bg-white text-black block">
            Submit
          </button>
        </span>
      </div>
    </section>
  );
}
