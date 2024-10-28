import { ReturnHomeButton } from "@/components/custom/return-home-button";
import { Card, CardContent } from "@/components/ui/card";
import { InboxIcon } from "lucide-react";

function NoRecordsAdvice() {
  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        <InboxIcon className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-2xl font-semibold mb-2">
          There are no records available
        </h3>
        <p className="text-muted-foreground mb-4">
          It seems that there are no records available yet. The records will
          appear here once they are available.
        </p>

        <ReturnHomeButton />
      </CardContent>
    </Card>
  );
}
export default NoRecordsAdvice;
