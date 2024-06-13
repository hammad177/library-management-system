"use server";

import { getAuthorsList } from "@/actions/serverActions";
import AuthorsTable from "@/components/authors/author-table";

const Authors = async () => {
  const { data } = await getAuthorsList();

  return <AuthorsTable data={data as any[]} />;
};

export default Authors;
