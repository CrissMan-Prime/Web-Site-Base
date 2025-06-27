"use client";

import Loading from "@/components/ui/loading";
import { useEffect, useState } from "react";

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

  return <div></div>;
}
