"use client";
import { useEffect, useState } from "react";
import TestForm from "./siteSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/ui/loading";

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
    return <Loading />;
  }

  return (
    <div>
      <Tabs
        defaultValue="siteSettings"
        className="flex flex-col size-full lg:px-20 px-6  lg:pt-10"
      >
        <TabsList className="gap-1 flex justify-start  ">
          <TabsTrigger value="siteSettings">Site Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="siteSettings">
          <p className="text-xl font-bold">Site Administrator</p>
          <p className="pb-2">
            Manage all user accounts with admin-level control. Create, update,
            or remove users and modify their data as needed.
          </p>
          <TestForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
