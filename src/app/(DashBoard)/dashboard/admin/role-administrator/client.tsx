"use client";

import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Role_Form from "./role_form";
import Permission_Form from "./permission_form";

export default function CreateComp() {
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
        <div className="flex h-full w-full justify-center items-center">
          <AiOutlineLoading className="flex animate-spin" size={50} />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-full w-full px-20 pt-10">
      <p className="text-xl font-bold">Role Administrator</p>
      <p className="pb-2">
        Manage all roles with admin-level permissions. Create, edit, and assign
        access levels based on responsibilities.
      </p>
      <hr />
      <div className="basis-1/2">
        <Role_Form />
      </div>
      <div className="basis-1/2">
        <Permission_Form />
      </div>
    </main>
  );
}
