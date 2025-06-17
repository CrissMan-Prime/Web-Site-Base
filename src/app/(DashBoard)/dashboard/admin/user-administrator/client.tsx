"use client";

import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Role_Form from "./role_form";
import Permission_Form from "./permission_form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import User_Form from "./user_form";
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
      <main className="size-full">
        <div className="flex size-full justify-center items-center">
          <AiOutlineLoading className="flex animate-spin" size={50} />
        </div>
      </main>
    );
  }

  return (
    <Tabs
      defaultValue="user"
      className="flex flex-col size-full px-20 pt-10"
    >
      <TabsList className="gap-1 flex justify-start  ">
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="role">Role</TabsTrigger>
        <TabsTrigger value="permission">Permission</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <p className="text-xl font-bold">User Administrator</p>
        <p className="pb-2">
          Manage all user accounts with admin-level control. Create, update, or
          remove users and modify their data as needed.
        </p>
        <User_Form />
      </TabsContent>
      <TabsContent value="role">
        <p className="text-xl font-bold">Role Administrator</p>
        <p className="pb-2">
          Manage all roles with admin-level permissions. Create, edit, and
          assign access levels based on responsibilities.
        </p>
        <hr />
          <Role_Form />
      </TabsContent>
       <TabsContent value="permission">
        <p className="text-xl font-bold">Permission Administrator</p>
        <p className="pb-2">
          Manage all permission with admin-level. Create, edit, and
          assign access levels based on responsibilities.
        </p>
        <hr />
          <Permission_Form />
      </TabsContent>
    </Tabs>

  );
}