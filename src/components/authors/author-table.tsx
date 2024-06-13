"use client";

import React, { useMemo } from "react";
import FilteredTable from "@/components/ui/filtered-table";
import { Card } from "@/components/ui/card";
import AuthorsModal from "./author-modal";

type PropsAuthorsTable = {
  data: any[];
  error: string | null;
};

const AuthorsTable = ({ data }: PropsAuthorsTable) => {
  const column = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "# Books",
        accessorKey: "total_books",
      },
    ],
    []
  );

  return (
    <Card>
      <FilteredTable
        title="Authors"
        data={data ?? []}
        columns={column}
        ButtonCmp={AuthorsModal}
        isLoading={false}
      />
    </Card>
  );
};

export default AuthorsTable;
