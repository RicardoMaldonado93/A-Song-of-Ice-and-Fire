import type { Book } from "./Book";
import type { ApiResourceBook, ApiResourceCharacter } from "./Global";
import type { House } from "./House";
import CharacterDetail from "../app/character/[id]/_components/character-detail";

/* prettier-ignore */
export interface Character {
    url:         ApiResourceCharacter;
    name:        string;
    gender:      string;
    culture:     string;
    born:        string;
    died:        string;
    titles:      string[];
    aliases:     string[];
    father:      ApiResourceCharacter;
    mother:      ApiResourceCharacter;
    spouse:      ApiResourceCharacter;
    allegiances: string[];
    books:       ApiResourceBook[];
    povBooks:    string[];
    tvSeries:    string[];
    playedBy:    string[];
}

export interface CharacterDetail
  extends Omit<
    Character,
    | "spouse"
    | "father"
    | "mother"
    | "allegiances"
    | "books"
    | "titles"
    | "aliases"
  > {
  spouse: Character | "unknown";
  father: Character | "unknown";
  mother: Character | "unknown";
  allegiances: House[];
  books: Book[];
  titles: string[];
  aliases: string[];
}
