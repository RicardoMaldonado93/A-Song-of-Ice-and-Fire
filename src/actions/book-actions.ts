"use server";

import type { Book } from "@/models/Book";
import { API_URL } from "@/utils/global-variables";
import { QueryParams } from "@/utils/typescript";

const pageSize = 10;
const page = 1;

export async function getAllBooks(
  params: QueryParams = { page, pageSize }
): Promise<Book[]> {
  const queryString = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString();

  const response = await fetch(`${API_URL}/books?${queryString}`);

  if (!response.ok) throw new Error("Failed to fetch books");

  const data = await response.json();

  return data;
}

export async function getBookByID(id: number): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`);

  if (!response.ok) throw new Error("Failed to fetch books");

  const data = await response.json();

  return data;
}
