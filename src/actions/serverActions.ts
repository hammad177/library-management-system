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
