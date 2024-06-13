"use client";

import React, { useMemo } from "react";
import FilteredTable from "@/components/ui/filtered-table";
import { Card } from "@/components/ui/card";
import BooksModal from "./book-modal";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import { deleteFromDB } from "@/actions/serverActions";
import DeleteModal from "@/components/delete-modal";

type PropsBooksTable = {
  data: any[];
};

const BooksTable = ({ data }: PropsBooksTable) => {
  const column = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Edition",
        accessorKey: "edition",
      },
      {
        header: "Author Name",
        accessorKey: "author_name",
      },
      {
        header: "Genre",
        accessorKey: "genre",
      },
      {
        header: "Action",
        cell: (prop: any) => {
          const { id, title, edition, genre, author_id } = prop?.row?.original;
          return (
            <div className="flex items-center gap-5">
              <BooksModal
                TriggerButton={<FilePenLine className="cursor-pointer" />}
                isUpdate={true}
                formValues={{ title, edition, genre, author_id }}
                itemId={id}
              />

              <DeleteModal
                title="Books"
                id={id}
                tableName="books"
                deleteFn={deleteFromDB}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <Card>
      <FilteredTable
        title="Books"
        data={data}
        columns={column}
        ButtonCmp={() => (
          <BooksModal
            TriggerButton={<Button variant="default">Add Book</Button>}
          />
        )}
        isLoading={false}
      />
    </Card>
  );
};

export default BooksTable;
