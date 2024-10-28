import { ReturnHomeButton } from "@/components/custom/return-home-button";
import { Skull } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-4">
      <Skull className="w-24 h-24 mb-8 text-red-600" />
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
        &quot;When you play the game of thrones, you win or you die. There is no
        middle ground.&quot; - Cersei Lannister
      </p>
      <p className="text-lg md:text-xl mb-8 text-center">
        It seems you&apos;ve lost your way in the Seven Kingdoms. This page
        doesn&apos;t exist in our realm.
      </p>

      <ReturnHomeButton />
    </div>
  );
}
