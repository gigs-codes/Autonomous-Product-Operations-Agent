import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProductOps AI — Autonomous Product Operations Platform",
  description: "AI-powered platform for autonomous product operations, sprint planning, Jira automation, and team coordination.",
  keywords: ["product management", "AI", "sprint planning", "Jira", "agile"],
  authors: [{ name: "ProductOps AI" }],
  openGraph: {
    title: "ProductOps AI",
    description: "AI-powered autonomous product operations platform",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <QueryProvider>
            {children}
            <Toaster position="bottom-right" richColors theme="system" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
