"use client";

import { useEffect, useState } from "react";

export default function HamburgerMenu() {
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
    return null;
  }
  return <main className="lg:hidden xs:block">test</main>;
}
