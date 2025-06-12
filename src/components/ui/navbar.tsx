import Link from "next/link";
import Profile from "./profile";

export default function Navbar() {
  return (
    <main className={`flex flex-row h-full items-center`}>
      <Link href={"/"} className={`flex px-5`}>
        {process.env.NEXT_PUBLIC_SITE_NAME}
      </Link>
      |
      <div className="flex grow px-5">
       
      </div>
      
      <div className="flex px-5">
     <Profile/>
      </div>
    </main>
  );
}
