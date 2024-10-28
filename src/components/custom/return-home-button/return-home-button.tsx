import { Button } from "@/components/ui/button";
import Link from "next/link";

const ReturnHomeButton = () => {
  return (
    <Link href="/" passHref>
      <Button
        variant="outline"
        size="lg"
        className="text-white border-white hover:bg-white hover:text-gray-900"
      >
        Return to the Iron Throne
      </Button>
    </Link>
  );
};

export default ReturnHomeButton;
