import HamburgerMenu from "@/components/ui/hamburger";
import Navbar from "@/components/ui/navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-screen max-w-screen h-screen overflow-x-hidden">
      <div className="w-full text-2xl h-[10%] p-2">
        <Navbar />
        <HamburgerMenu />
      </div>
      <div className="max-w-full h-full">{children}</div>
      <div className="flex items-end w-full max-h-[6%] h-10"></div>
    </main>
  );
}
