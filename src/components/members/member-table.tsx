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
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone No.",
        accessorKey: "phone_no",
      },
      {
        header: "On Loan",
        accessorKey: "on_loan",
      },
      {
        header: "Action",
        cell: (prop: any) => {
          const { id, name, email, phone_no } = prop?.row?.original;
          return (
            <div className="flex items-center gap-5">
              <MembersModal
                TriggerButton={<FilePenLine className="cursor-pointer" />}
                isUpdate={true}
                itemId={id}
                formValues={{ name, email, phone_no }}
              />

              <DeleteModal
                title="Member"
                id={id}
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
