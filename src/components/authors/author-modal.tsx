"use client";
import React, { useMemo } from "react";
import FilteredTable from "@/components/ui/filtered-table";
import { Card } from "@/components/ui/card";
import AuthorsModal from "./author-table";

interface Book {
  title: string;
  edition: number;
  author_name: string;
  genre: string;
}

const bookData: Book[] = [
  {
    title: "Eos aut aut.",
    edition: 5,
    author_name: "John Doe",
    genre: "Rock",
  },
  {
    title: "Tempore qui ipsum.",
    edition: 2,
    author_name: "Jane Smith",
    genre: "Jazz",
  },
  {
    title: "Iure et non.",
    edition: 3,
    author_name: "Alice Johnson",
    genre: "Classical",
  },
  {
    title: "Nostrum sunt ad.",
    edition: 7,
    author_name: "Chris Lee",
    genre: "Pop",
  },
  {
    title: "Quisquam est rerum.",
    edition: 1,
    author_name: "Patricia Brown",
    genre: "Hip-Hop",
  },
  {
    title: "Et distinctio aut.",
    edition: 4,
    author_name: "Michael Davis",
    genre: "Country",
  },
  {
    title: "Quidem aut voluptas.",
    edition: 6,
    author_name: "Linda Wilson",
    genre: "Electronic",
  },
  {
    title: "Mollitia minus pariatur.",
    edition: 8,
    author_name: "Robert Martinez",
    genre: "Reggae",
  },
  {
    title: "Quasi excepturi similique.",
    edition: 9,
    author_name: "Mary Anderson",
    genre: "Blues",
  },
  {
    title: "Laboriosam nulla cum.",
    edition: 10,
    author_name: "William Thomas",
    genre: "R&B",
  },
];

const AuthorsTable = () => {
  const column = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "title",
      },
      {
        header: "# Books",
        accessorKey: "edition",
      },
    ],
    []
  );

  return (
    <Card>
      <FilteredTable
        title="Authors"
        data={bookData}
        columns={column}
        ButtonCmp={AuthorsModal}
        isLoading={false}
      />
    </Card>
  );
};

export default AuthorsTable;
