"use client";

import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import User_Form from "../user-administrator/user_form";

export default function Client() {
  const [loading, setLoading] = useState(true);

  function Timeout() {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  useEffect(() => {
    Timeout();
  }, []);

  if (loading) {
    return (
      <main className="w-full h-full">
        <div className="flex size-full justify-center items-center">
          <AiOutlineLoading className="flex animate-spin" size={50} />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col size-full px-20 pt-10">
      <p className="text-xl font-bold">User Administrator</p>
      <p className="pb-2">
        Manage all user accounts with admin-level control. 
        Create, update, or remove users and modify their data as needed.
      </p>
      <hr />
      <div className="basis-1/2">
        <User_Form/>
      </div>
    </main>
  );
}
