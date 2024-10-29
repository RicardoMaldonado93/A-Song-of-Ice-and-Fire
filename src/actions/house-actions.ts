"use server";

import type { House, HouseWithMembers } from "@/models/House";
import { API_URL } from "@/utils/global-variables";
import { QueryParams } from "@/utils/typescript";
import { getCharacterByID } from "./character-actions";

const pageSize = 10;
const page = 1;

export async function getAllHouses(
  params: QueryParams = { page, pageSize }
): Promise<House[]> {
  const queryString = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString();

  const response = await fetch(`${API_URL}/houses?${queryString}`);

  if (!response.ok) throw new Error("Failed to fetch houses");

  const data = await response.json();

  return data as House[];
}

export async function getHouseByID(id: number): Promise<House> {
  const response = await fetch(`${API_URL}/houses/${id}`);

  if (!response.ok) throw new Error("Failed to fetch houses");

  const data = await response.json();

  return data;
}

export async function getHousesWithSwornMembers(
  page: number
): Promise<HouseWithMembers[]> {
  const houses = await getAllHouses({ page });

  const housesWithMembers = await Promise.all(
    houses.map(async (house) => {
      const swornMembers = await Promise.all(
        house.swornMembers.map(async (memberURL) => {
          const id = memberURL.split("/").at(-1);

          if (!id) return null;

          try {
            const character = await getCharacterByID(Number(id));

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
}
