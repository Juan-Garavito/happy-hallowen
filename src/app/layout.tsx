import type { Metadata } from "next";
import "./globals.css";
import ContextSession from "./home/components/ContextSession";
import { amatic_SC } from "./fonts/fonts";
import Head from "next/head";


const metadata: Metadata = {
  title: "Create you album for Halloween", 
  description: "Create you album for Halloween",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{`${metadata.title ?? "Create you album for Halloween"}`}</title>
        <meta name="description" content={metadata.description ?? "Create you album for Halloween"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body 
        className={`${amatic_SC.className} antialiased overflow-hidden bg-gray-900`}
      >
          <ContextSession>{children}</ContextSession> 
      </body>
      
    </html>
  );
}
