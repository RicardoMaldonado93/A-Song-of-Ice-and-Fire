export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const getIdFromUrl = (url: string): number => {
  const id = url.split("/").at(-1);

  if (!id) return 0;

  return Number(id);
};
