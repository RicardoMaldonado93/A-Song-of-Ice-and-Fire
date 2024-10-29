"use server";

import type { Book } from "@/models/Book";
import type { Character, CharacterDetail } from "@/models/Character";
import { House } from "@/models/House";
import { API_URL } from "@/utils/global-variables";
import { getIdFromUrl } from "@/utils/helpers";
import { getHouseByID } from "./house-actions";
import { getBookByID } from "./book-actions";

export async function getCharacterByID(id: number): Promise<Character> {
  const response = await fetch(`${API_URL}/characters/${id}`);

  if (!response.ok) throw new Error("Failed to fetch characters");

  const data = await response.json();

  return data;
}

export async function getCharacterDetail(id: number): Promise<CharacterDetail> {
  const character = await getCharacterByID(Number(id));

  const [spouseSettle, fatherSettle, motherSettle] = await Promise.allSettled([
    getCharacterByID(getIdFromUrl(character.spouse)),
    getCharacterByID(getIdFromUrl(character.father)),
    getCharacterByID(getIdFromUrl(character.mother)),
  ]);

  const housesSettle = await Promise.allSettled(
    character.allegiances.map(
      async (houseUrl) => await getHouseByID(getIdFromUrl(houseUrl))
    )
  );

  const booksSettle = await Promise.allSettled(
    character.books.map(
      async (bookUrl) => await getBookByID(getIdFromUrl(bookUrl))
    )
  );

  const spouse =
    spouseSettle.status === "fulfilled" ? spouseSettle.value : "unknown";
  const father =
    fatherSettle.status === "fulfilled" ? fatherSettle.value : "unknown";
  const mother =
    motherSettle.status === "fulfilled" ? motherSettle.value : "unknown";

  const houses = housesSettle
    .filter(
      (result): result is PromiseFulfilledResult<House> =>
        result.status === "fulfilled" && !!result.value.name
    )

    .map((house) => ({ ...house.value }));

  const books = booksSettle
    .filter(
      (result): result is PromiseFulfilledResult<Book> =>
        result.status === "fulfilled" && !!result.value.name
    )
    .map((book) => ({ ...book.value }));

  const allegiances = houses.filter((house) => house);
  const titles = character.titles.filter((title) => !!title);
  const aliases = character.aliases.filter((alias) => !!alias);

  return {
    ...character,
    spouse,
    father,
    mother,
    allegiances,
    books,
    titles,
    aliases,
  };
}
