import localFont from "next/font/local";

import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/site_settings`);
  const json = await res.json();
  const data: SiteSettingsType = json.message[0];

  return (
    <html lang="en">
      <head>
        <title>{data.name}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background `}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {data.maintenance == true ? (
              <p
                className="flex justify-center items-center w-full bg-s"
                style={{ background: `${data.color}` }}
              >
                {data.maintenanceMessage}
              </p>
            ) : null}
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
