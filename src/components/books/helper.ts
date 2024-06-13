import { bookGenres } from "@/constants";

export const genreOptions = () =>
  bookGenres.map((genre) => ({
    label: genre,
    value: genre,
  }));

export const authorsOptions = (authors: Record<string, string>[]) => {
  if (!authors.length) return [];

  return authors.map((author) => ({
    label: author?.name ?? "label",
    value: String(author?.id ?? 0),
  }));
};
