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
  data: Record<string, string>,
  whereCondition?: string
) => {
  const condition =
    whereCondition && itemId == "" ? whereCondition : `id = ${itemId}`;
  const { query, values } = generateUpdateQuery(tableName, condition, {
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

export const getMembers = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query("SELECT id, name FROM members", (err, result) => {
      if (err) {
        resolve({
          success: false,
          message: "Failed to fetch data",
          data: [],
        });
      } else {
        resolve({ success: true, message: "Members", data: result });
      }
    });
  });
};

export const getAuthorsList = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(
      "SELECT a.id AS id, a.name AS name, COUNT(b.id) AS total_books FROM authors a LEFT JOIN books b ON a.id = b.author_id GROUP BY a.name, a.id",
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

export const getMembersList = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(
      "SELECT id, name, email, phone_no FROM members",
      (err, result) => {
        if (err) {
          resolve({
            success: false,
            message: "Failed to fetch data",
            data: [],
          });
        } else {
          resolve({ success: true, message: "Members List", data: result });
        }
      }
    );
  });
};

export const getAvailableBooks = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(
      "SELECT id, title, edition FROM books WHERE status = 'available'",
      (err, result) => {
        if (err) {
          resolve({
            success: false,
            message: "Failed to fetch data",
            data: [],
          });
        } else {
          resolve({
            success: true,
            message: "Available Books List",
            data: result,
          });
        }
      }
    );
  });
};

export const getBooksStatus = () => {
  return new Promise<QueryResponse>((resolve, reject) => {
    sql_db.query(
      "SELECT b.id, b.title, b.edition, b.status, m.name AS member_name FROM books b LEFT JOIN book_loans bl ON b.id = bl.book_id AND bl.return_date IS NULL LEFT JOIN members m ON bl.member_id = m.id",
      (err, result) => {
        if (err) {
          resolve({
            success: false,
            message: "Failed to fetch data",
            data: [],
          });
        } else {
          resolve({
            success: true,
            message: "Books Status List",
            data: result,
          });
        }
      }
    );
  });
};
