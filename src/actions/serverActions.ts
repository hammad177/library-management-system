"use server";

import { sql_db } from "@/database/connection";
import {
  generateDeleteQuery,
  generateInsertQuery,
  generateUpdateQuery,
} from "@/lib/queryGenerator";
import { DatabaseTables, QueryResponse } from "@/type";

export const insertIntoDB = (
  tableName: DatabaseTables,
  data: Record<string, string>
) => {
  const { query, values } = generateInsertQuery(tableName, {
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(query, values, (err) => {
      if (err) {
        resolve({
          success: false,
          message: "Failed to add new record",
          data: [],
        });
      } else {
        resolve({
          success: true,
          message: "New record added successfully",
          data: [],
        });
      }
    });
  });
};

export const updateIntoDB = (
  tableName: DatabaseTables,
  itemId: string,
  data: Record<string, string>
) => {
  const { query, values } = generateUpdateQuery(tableName, itemId, {
    ...data,
    updated_at: new Date().toISOString(),
  });

  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(query, values, (err) => {
      if (err) {
        resolve({
          success: false,
          message: "Failed to edit record",
          data: [],
        });
      } else {
        resolve({
          success: true,
          message: "Record updated successfully",
          data: [],
        });
      }
    });
  });
};

export const deleteFromDB = (tableName: DatabaseTables, itemId: string) => {
  const { query } = generateDeleteQuery(tableName, itemId);

  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(query, (err) => {
      if (err) {
        resolve({
          success: false,
          message: "Failed to delete record",
          data: [],
        });
      } else {
        resolve({
          success: true,
          message: "Record deleted successfully",
          data: [],
        });
      }
    });
  });
};

export const getAuthors = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query("SELECT id, name FROM authors", (err, result) => {
      if (err) {
        resolve({
          success: false,
          message: "Failed to fetch data",
          data: [],
        });
      } else {
        resolve({ success: true, message: "Authors", data: result });
      }
    });
  });
};

export const getAuthorsList = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(
      "SELECT a.name AS name, COUNT(b.id) AS total_books FROM authors a LEFT JOIN books b ON a.id = b.author_id GROUP BY a.name",
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

export const getBooksList = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(
      "SELECT b.id AS id, b.title AS title, b.genre AS genre, b.edition AS edition, a.name AS author_name FROM books b JOIN authors a ON b.author_id = a.id",
      (err, result) => {
        if (err) {
          resolve({
            success: false,
            message: "Failed to fetch data",
            data: [],
          });
        } else {
          resolve({ success: true, message: "Books List", data: result });
        }
      }
    );
  });
};
