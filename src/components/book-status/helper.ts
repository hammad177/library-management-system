export const membersOptions = (members: Record<string, string>[]) => {
  if (!members.length) return [];

  return members.map((member) => ({
    label: member?.name ?? "label",
    value: String(member?.id ?? 0),
  }));
};

export const booksOptions = (books: Record<string, string>[]) => {
  if (!books.length) return [];

  return books.map((book) => ({
    label: `${book?.title} - ${book?.edition}` ?? "label",
    value: String(book?.id ?? 0),
  }));
};
