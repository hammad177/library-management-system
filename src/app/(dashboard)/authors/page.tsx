"use server";

import { getAuthorsList } from "@/actions/serverAction";
import AuthorsTable from "@/components/authors/author-table";

const Authors = async () => {
  const { data, error } = await getAuthorsList();

  return <AuthorsTable data={data as any[]} error={error} />;
};

export default Authors;
