"use server";

import { sql_db } from "@/database/connection";
import { generateInsertQuery } from "@/lib/queryGenerator";
import { QueryResult } from "mysql2";
import { revalidatePath } from "next/cache";

type PromiseType = {
  success: boolean;
  error: string | null;
  data: Record<string, string>[] | QueryResult;
};

export const addAuthor = (data: Record<string, string>) => {
  const { query, values } = generateInsertQuery("authors", {
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  return new Promise<PromiseType>((resolve, reject) => {
    sql_db.query(query, values, (err) => {
      if (err) {
        resolve({ success: false, error: "Failed to insert data", data: [] });
      } else {
        revalidatePath("/authors");
        resolve({ success: true, error: null, data: [] });
      }
    });
  });
};

export const getAuthorsList = () => {
  return new Promise<PromiseType>((resolve, reject) => {
    sql_db.query(
      "SELECT id, name, id as total_books FROM authors",
      (err, result) => {
        if (err) {
          resolve({
            success: false,
            error: "Failed to fetch data",
            data: [],
          });
        } else {
          resolve({ success: true, error: null, data: result });
        }
      }
    );
  });
};
