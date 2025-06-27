"use client";

import { useEffect, useState } from "react";
import User_Form from "./user_form";
import Image_Form from "./profile_form";
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
    <main className="flex flex-col size-full lg:px-20 px-6 lg:pt-10">
      <p className="text-xl font-bold">Profile</p>
      <p className="pb-2">
        Welcome to your profile page. Here, you can view and update your account
        information.
      </p>
      <hr />
      <Image_Form />
      <User_Form />
    </main>
  );
}
