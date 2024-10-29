import type { Metadata } from "next";
import "./globals.css";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "An Interface of Ice and Fire",
  description:
    "A challenge generated with NextJS v15 and Tailwind with Shadcn UI",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark grid grid-cols-1 grid-rows-[auto,1fr,auto] justify-center gap-2 bg-background !px-4 font-sans antialiased md:gap-4 ">
        {modal}
        {children}
        <footer className="flex min-h-16 items-center justify-center text-balance text-center text-sm text-muted-foreground gap-1">
          <p className="text-xs text-muted-foreground">
            Made with 🖤 by Ricardo Maldonado
          </p>

          <a
            className="hover:underline"
            href="https://github.com/RicardoMaldonado93/A-Song-of-Ice-and-Fire"
          >
            <GitHubLogoIcon />
          </a>
        </footer>
      </body>
    </html>
  );
}
