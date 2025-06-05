import Navbar from "@/components/ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-screen max-w-screen h-screen overflow-x-hidden">
      <div className="absolute w-full text-2xl h-[8%]">
        <Navbar />
      </div>

      <div className="max-w-full">{children}</div>
      <div className="flex items-end w-full max-h-[6%] h-10">

      </div>
    </main>
  );
}
