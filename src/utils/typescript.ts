export type PageProps = {
  searchParams: Promise<Record<string, string>>;
  params: Promise<Record<string, string>>;
};

export type QueryParams = Record<string, string | number>;
