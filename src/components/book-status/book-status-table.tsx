"use client";

import React, { useMemo } from "react";
import FilteredTable from "@/components/ui/filtered-table";
import { Card } from "@/components/ui/card";
import BooksStatusModal from "./book-status-modal";
import { Undo2 } from "lucide-react";
import AppTooltip from "../tooltip";
import { updateIntoDB } from "@/actions/serverActions";

type PropsBooksStatusTable = {
  data: any[];
};

const BooksStatusTable = ({ data }: PropsBooksStatusTable) => {
  const column = useMemo(
    () => [
      {
        header: "Book Title",
        accessorKey: "title",
      },
      {
        header: "Book Edition",
        accessorKey: "edition",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Member Name",
        accessorKey: "member_name",
      },
      {
        header: "Action",
        cell: (prop: any) => {
          const { id, status } = prop?.row?.original;
          const handleReturnBook = async () => {
            await updateIntoDB("books", id, { status: "available" });
            await updateIntoDB(
              "book_loans",
              "",
              {
                return_date: new Date().toISOString(),
              },
              `book_id = ${id}`
            );

            setTimeout(() => {
              window.location.reload();
            }, 800);
          };
          return status === "issued" ? (
            <AppTooltip title="Return">
              <Undo2 onClick={handleReturnBook} />
            </AppTooltip>
          ) : null;
        },
      },
    ],
    []
  );

  return (
    <Card>
      <FilteredTable
        title="Books Status"
        data={data}
        columns={column}
        ButtonCmp={BooksStatusModal}
        isLoading={false}
      />
    </Card>
  );
};

export default BooksStatusTable;
