"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogOverlay } from "./dialog";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen no-scrollbar">
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
