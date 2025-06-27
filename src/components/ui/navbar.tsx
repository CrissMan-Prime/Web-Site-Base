"use client";
import Link from "next/link";
import Profile from "./profile";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [siteData, setSiteData] = useState<SiteSettingsType[]>([]);
  async function fetchSiteSettings() {
    const res = await fetch("/api/site_settings");
    const data = await res.json();
    setSiteData(data.message);
  }

  const [loading, setLoading] = useState(true);

  function Timeout() {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  useEffect(() => {
    fetchSiteSettings();
    Timeout();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="lg:block sm:hidden">
      <main className={`flex flex-row size-full items-center`}>
        <Link href={"/"} className={`flex px-5`}>
          {siteData.map((data) => data.name)} |
        </Link>

        <div className="flex grow px-5"></div>
        <div className="flex px-5">
          <Profile />
        </div>
      </main>
    </div>
  );
}
