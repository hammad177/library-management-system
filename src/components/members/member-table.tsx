"use client";

import React, { useMemo } from "react";
import FilteredTable from "@/components/ui/filtered-table";
import { Card } from "@/components/ui/card";
import MembersModal from "./member-modal";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/delete-modal";
import { deleteFromDB } from "@/actions/serverActions";
import { FilePenLine } from "lucide-react";

const MembersTable = () => {
  const column = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "title",
      },
      {
        header: "Email",
        accessorKey: "edition",
      },
      {
        header: "Phone No.",
        accessorKey: "author_name",
      },
      {
        header: "On Loan",
        accessorKey: "genre",
      },
      {
        header: "Action",
        cell: (prop: any) => {
          const values = prop?.row?.original;
          return (
            <div className="flex items-center gap-5">
              <MembersModal
                TriggerButton={<FilePenLine className="cursor-pointer" />}
                isUpdate={true}
                formValues={{ name: values?.name || "" }}
                itemId={values?.id ?? ""}
              />

              <DeleteModal
                title="Member"
                id={values?.id}
                tableName="members"
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
        title="Members"
        data={[]}
        columns={column}
        ButtonCmp={() => (
          <MembersModal
            TriggerButton={<Button variant="default">Add Author</Button>}
          />
        )}
        isLoading={false}
      />
    </Card>
  );
};

export default MembersTable;
