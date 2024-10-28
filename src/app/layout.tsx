import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Song of Ice and Fire",
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
      <body className="dark grid grid-flow-dense gap-2 bg-background !px-4 font-sans antialiased md:gap-4 ">
        {modal}
        {children}
      </body>
    </html>
  );
}
