import { Paginator } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { HouseWithMembers } from "@/models/House";

import Link from "next/link";

type Props = {
  houses: HouseWithMembers[];
  page: number;
};

function HouseTable({ houses = [], page = 1 }: Props) {
  const maxPageCounter = Math.floor((45 * 10) / 10); // due to the total of items is not returned by the API

  return (
    <div className="border rounded-lg justify-between flex flex-col">
      <Table className="border-b">
        <TableHeader>
          <TableRow className="bg-primary/10 hover:bg-primary/20">
            <TableHead className="w-[200px] font-bold">House</TableHead>
            <TableHead className="w-[200px] font-bold hidden sm:table-cell">
              Region
            </TableHead>
            <TableHead className="font-bold">Sworn Members</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {houses.map((house, index) => (
            <TableRow
              key={house.name}
              className={
                index % 2 === 0
                  ? "bg-background hover:bg-accent/50"
                  : "bg-muted/50 hover:bg-accent/50"
              }
            >
              <TableCell className="font-medium">{house.name}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {house.region}
              </TableCell>
              <TableCell className="h-[60px]">
                <ScrollArea className="h-[50px]">
                  <div className="inline-flex gap-1 flex-wrap text-pretty">
                    {house.swornMembers.length > 0 ? (
                      house.swornMembers.map((member) => (
                        <Link key={member.id} href={`/character/${member.id}`}>
                          {member.isDead ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="hover:underline cursor-pointer">
                                  {member.name}
                                  <sup className="text-red-500 text-xs">*</sup>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>dead {member.deadAt}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <span className="hover:underline cursor-pointer">
                              {member.name}
                            </span>
                          )}
                        </Link>
                      ))
                    ) : (
                      <i className="text-neutral-400">
                        This house has no sworn members
                      </i>
                    )}
                  </div>
                </ScrollArea>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <small className="text-left text-muted-foreground ml-2">
          <span className="text-red-500">*</span> characters with dead status
        </small>

        <Paginator currentPage={page} pageCount={maxPageCounter} />
      </div>
    </div>
  );
}
export default HouseTable;
