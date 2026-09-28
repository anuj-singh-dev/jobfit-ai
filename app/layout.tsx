import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobFit AI — Find Jobs That Fit You",
  description:
    "AI-powered career intelligence that helps you understand your job fit, skill gaps and career path.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}