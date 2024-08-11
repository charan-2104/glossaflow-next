import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlossaFlow",
  description: "Glossaflow is an innovative language-learning platform designed to make mastering a new language both accessible and enjoyable. Whether you're starting from scratch or advancing your skills, Glossaflow offers comprehensive courses tailored to your needs. The platform integrates interactive lessons, real-life conversation practice, and cultural insights, ensuring that you not only learn the language but also understand its context.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}   
        </body>
      </html>
    </ClerkProvider>
  );
}
