import { QueryResult } from "mysql2";
import { ReactNode } from "react";

export type DatabaseTables = "authors" | "books" | "members" | "book_loans";

export type TAuthorForm = {
  name: string;
};
export type TMemberForm = {
  name: string;
  email: string;
  phone_no: string;
};
export type TBookForm = {
  title: string;
  edition: string;
  genre: string;
  author_id: string;
};
export type TBookIssueForm = {
  book_id: string;
  member_id: string;
};
export type FormModalProps = {
  TriggerButton: ReactNode;
  isUpdate?: boolean;
  formValues?: Record<string, string>;
  itemId?: string;
};
export type QueryResponse = {
  success: boolean;
  message: string;
  data: Record<string, string>[] | QueryResult;
};
export type TSelectBoxOptions = { label: string; value: string };
