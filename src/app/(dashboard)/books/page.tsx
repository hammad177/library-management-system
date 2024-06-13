"use server";

import { getBooksList } from "@/actions/serverActions";
import BooksTable from "@/components/books/book-table";

const Books = async () => {
  const { data } = await getBooksList();
  return <BooksTable data={data as any[]} />;
};

export default Books;
