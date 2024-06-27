"use server";

import { getBooksStatus } from "@/actions/serverActions";
import BooksStatusTable from "@/components/book-status/book-status-table";

const BooksStatus = async () => {
  const { data } = await getBooksStatus();
  return <BooksStatusTable data={data as any[]} />;
};

export default BooksStatus;
