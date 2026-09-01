import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JanCensus AI - Census of India 2027 Intelligent Platform",
  description: "Official digital self-enumeration, scheduling, and AI assistance platform for the Census of India 2027. Powered by Gemini 2.5 Flash and Census Act 1948 statutory protections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#F8FAFC]">
      <body className="min-h-full flex flex-col antialiased text-slate-900 bg-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
