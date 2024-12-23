"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    if (!data.email || !data.password) return alert("Please fill all details");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URl}/api/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        router.push("/");
        setLoading(false);
        return alert("User Loggedin Successfully");
      }
      throw new Error("Task not Created");
    } catch (error) {
      setLoading(false);
      console.log("Error on posting request: ", error);
      return alert("Error while logging user");
    }
  }
  return (
    <section className="w-full h-dvh flex items-center justify-center ">
      <div className="flex flex-col border-2 p-5 gap-5 w-full mx-2 md:w-5/12 ">
        <span>
          <h1 className="text-2xl font-semibold text-center">
            Login to your account
          </h1>
        </span>
        <span className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="bg-transparent rounded-sm outline-none border-2 focus:border-black py-1 px-3 w-full"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            id="password"
            className="bg-transparent rounded-sm outline-none border-2 focus:border-black py-1 px-3 w-full"
          />
        </span>
        <span className="flex item-center justify-center">
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="px-3 py-1 border hover:bg-black hover:text-white"
          >
            {loading ? <AiOutlineLoading className="animate-spin" /> : "Login"}
          </button>
        </span>
      </div>
    </section>
  );
}
