"use server";

import { sql_db } from "@/database/connection";
import {
  generateDeleteQuery,
  generateInsertQuery,
  generateUpdateQuery,
} from "@/lib/queryGenerator";
import { QueryResponse } from "@/type";
import { revalidatePath } from "next/cache";

export const addAuthor = (data: Record<string, string>) => {
  const { query, values } = generateInsertQuery("authors", {
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(query, values, (err) => {
      if (err) {
        resolve({
          success: false,
          message: "Failed to add new author",
          data: [],
        });
      } else {
        revalidatePath("/authors");
        resolve({
          success: true,
          message: "New author added successfully",
          data: [],
        });
      }
    });
  });
};

export const editAuthor = (itemId: string, data: Record<string, string>) => {
  const { query, values } = generateUpdateQuery("authors", itemId, {
    ...data,
    updated_at: new Date().toISOString(),
  });

  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(query, values, (err) => {
      if (err) {
        resolve({
          success: false,
          message: "Failed to edit author",
          data: [],
        });
      } else {
        revalidatePath("/authors");
        resolve({
          success: true,
          message: "Author updated successfully",
          data: [],
        });
      }
    });
  });
};

export const getAuthorsList = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(
      "SELECT id, name, id as total_books FROM authors",
      (err, result) => {
        if (err) {
          resolve({
            success: false,
            message: "Failed to fetch data",
            data: [],
          });
        } else {
          resolve({ success: true, message: "Authors List", data: result });
        }
      }
    );
  });
};

export const deleteAuthor = (itemId: string) => {
  const { query } = generateDeleteQuery("authors", itemId);

  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(query, (err) => {
      if (err) {
        resolve({
          success: false,
          message: "Failed to delete author",
          data: [],
        });
      } else {
        revalidatePath("/authors");
        resolve({
          success: true,
          message: "Author deleted successfully",
          data: [],
        });
      }
    });
  });
};
