import { ApiResourceBook, ApiResourceCharacter } from "./Global";

/* prettier-ignore */
export interface Book {
    authors:       string[];
    characters:    ApiResourceCharacter[];
    country:       string;
    isbn:          string;
    mediaType:     string;
    name:          string;
    numberOfPages: number;
    povCharacters: ApiResourceCharacter[];
    publisher:     string;
    released:      Date;
    url:           ApiResourceBook;
}
