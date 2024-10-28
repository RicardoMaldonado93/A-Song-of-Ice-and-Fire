import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CharacterDetail as CharacterDetailProps } from "@/models/Character";
import {
  AwardIcon,
  BadgeHelpIcon,
  BookIcon,
  SwordIcon,
  UserIcon,
} from "lucide-react";

function CharacterDetail({
  spouse,
  father,
  mother,
  allegiances,
  books,
  titles,
  aliases,
  ...character
}: CharacterDetailProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">{character.name}</CardTitle>
        <CardDescription className="text-lg">
          {character.culture} • {character.gender}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <UserIcon className="mr-2 h-5 w-5" /> Personal Information
            </h3>
            <ul className="grid grid-rows-2 gap-2">
              <li>
                <span className="font-medium">Born:</span>{" "}
                {character.born || "Unknown"}
              </li>
              <li>
                <span className="font-medium">Died:</span>{" "}
                {character.died || "Unknown"}
              </li>
              <li className={cn({ hidden: spouse === null })}>
                <span className="font-medium">Spouse:</span>{" "}
                {spouse === "unknown" ? "-" : spouse?.name}
              </li>
              <li className={cn({ hidden: father === null })}>
                <span className="font-medium">Father:</span>{" "}
                {father === "unknown" ? "-" : father?.name}
              </li>
              <li className={cn({ hidden: mother === null })}>
                <span className="font-medium">Mother:</span>{" "}
                {mother === "unknown" ? "-" : mother?.name}
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <AwardIcon className="mr-2 h-5 w-5" /> Titles
            </h3>
            {titles.map((title, index) => (
              <Badge key={index} variant="secondary" className="mr-2 mb-2">
                {title}
              </Badge>
            ))}

            {titles.length === 0 && (
              <span className="text-muted-foreground">No titles</span>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <BadgeHelpIcon className="mr-2 h-5 w-5" /> Aliases
            </h3>
            {aliases.map((alias, index) => (
              <Badge key={index} variant="secondary" className="mr-2 mb-2">
                {alias}
              </Badge>
            ))}
            {aliases.length === 0 && (
              <span className="text-muted-foreground">No aliases</span>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <SwordIcon className="mr-2 h-5 w-5" /> Allegiances
            </h3>
            <div className="flex flex-wrap gap-2">
              {allegiances.map((allegiance) => (
                <Badge key={allegiance?.name} variant="destructive">
                  {allegiance?.name}
                </Badge>
              ))}
              {allegiances.length === 0 && (
                <span className="text-muted-foreground">
                  No known allegiances
                </span>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <BookIcon className="mr-2 h-5 w-5" /> Book Appearances
            </h3>
            <div className="flex flex-wrap gap-2">
              {books.map((book) => (
                <Badge key={book?.name} variant="secondary">
                  {book?.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
export default CharacterDetail;
