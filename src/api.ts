import { Book } from "./models/Book";
import { Character, CharacterDetail } from "./models/Character";
import { House, HouseWithMembers } from "./models/House";
import { API_URL } from "./utils/global-variables";
import { getIdFromUrl } from "./utils/helpers";

const pageSize = 10;
const page = 1;

type QueryParams = Record<string, string | number>;

export const api = {
  houses: {
    getAll: async (
      params: QueryParams = { page, pageSize }
    ): Promise<House[]> => {
      const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ).toString();

      const response = await fetch(`${API_URL}/houses?${queryString}`);

      if (!response.ok) throw new Error("Failed to fetch houses");

      const data = await response.json();

      return data as House[];
    },
    getByID: async (id: number): Promise<House> => {
      const response = await fetch(`${API_URL}/houses/${id}`);

      if (!response.ok) throw new Error("Failed to fetch houses");

      const data = await response.json();

      return data;
    },
    getHousesWithSwornMembers: async (
      page: number
    ): Promise<HouseWithMembers[]> => {
      const houses = await api.houses.getAll({ page });

      const housesWithMembers = await Promise.all(
        houses.map(async (house) => {
          const swornMembers = await Promise.all(
            house.swornMembers.map(async (memberURL) => {
              const id = memberURL.split("/").at(-1);

              if (!id) return null;

              try {
                const character = await api.characters.getByID(Number(id));

                if (!character?.name) return null;

                return {
                  name: character.name,
                  id: character.url.split("/").at(-1) as string,
                  isDead: !!character.died,
                  deadAt: character.died,
                };
              } catch {
                return null;
              }
            })
          );

          return {
            ...house,
            swornMembers: swornMembers.filter((member) => !!member),
          };
        })
      );

      return housesWithMembers;
    },
  },
  characters: {
    getAll: async (
      params: QueryParams = { page, pageSize }
    ): Promise<Character[]> => {
      const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ).toString();
      const response = await fetch(`${API_URL}/characters?${queryString}`);

      if (!response.ok) throw new Error("Failed to fetch characters");

      const data = await response.json();

      return data;
    },
    getByID: async (id: number): Promise<Character> => {
      const response = await fetch(`${API_URL}/characters/${id}`);

      if (!response.ok) throw new Error("Failed to fetch characters");

      const data = await response.json();

      return data;
    },
    getDetail: async (id: number): Promise<CharacterDetail> => {
      const character = await api.characters.getByID(Number(id));

      const [spouseSettle, fatherSettle, motherSettle] =
        await Promise.allSettled([
          api.characters.getByID(getIdFromUrl(character.spouse)),
          api.characters.getByID(getIdFromUrl(character.father)),
          api.characters.getByID(getIdFromUrl(character.mother)),
        ]);

      const housesSettle = await Promise.allSettled(
        character.allegiances.map(
          async (houseUrl) => await api.houses.getByID(getIdFromUrl(houseUrl))
        )
      );

      const booksSettle = await Promise.allSettled(
        character.books.map(
          async (bookUrl) => await api.books.getByID(getIdFromUrl(bookUrl))
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
    },
  },
  books: {
    getAll: async (
      params: QueryParams = { page, pageSize }
    ): Promise<Book[]> => {
      const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ).toString();

      const response = await fetch(`${API_URL}/books?${queryString}`);

      if (!response.ok) throw new Error("Failed to fetch books");

      const data = await response.json();

      return data;
    },
    getByID: async (id: number): Promise<Book> => {
      const response = await fetch(`${API_URL}/books/${id}`);

      if (!response.ok) throw new Error("Failed to fetch books");

      const data = await response.json();

      return data;
    },
  },
};
