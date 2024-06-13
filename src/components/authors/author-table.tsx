"use client";

import React, { useMemo } from "react";
import FilteredTable from "@/components/ui/filtered-table";
import { Card } from "@/components/ui/card";
import AuthorsModal from "./author-modal";
import { FilePenLine, Trash2 } from "lucide-react";
import AppTooltip from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { deleteAuthor } from "@/actions/author";
import DeleteModal from "../delete-modal";

type PropsAuthorsTable = {
  data: any[];
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
      {
        header: "Action",
        cell: (prop: any) => {
          const values = prop?.row?.original;
          return (
            <div className="flex items-center gap-5">
              <AuthorsModal
                TriggerButton={
                  <AppTooltip title="Edit">
                    <FilePenLine className="cursor-pointer" />
                  </AppTooltip>
                }
                isUpdate={true}
                formValues={{ name: values?.name || "" }}
                itemId={values?.id ?? ""}
              />

              <DeleteModal
                title="Author"
                id={values?.id}
                deleteFn={deleteAuthor}
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
        title="Authors"
        data={data ?? []}
        columns={column}
        isLoading={false}
        ButtonCmp={() => (
          <AuthorsModal
            TriggerButton={<Button variant="default">Add Author</Button>}
          />
        )}
      />
    </Card>
  );
};

export default AuthorsTable;
