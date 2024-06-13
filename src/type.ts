import { QueryResult } from "mysql2";

export type TAuthorForm = {
  name: string;
};
export type QueryResponse = {
  success: boolean;
  message: string;
  data: Record<string, string>[] | QueryResult;
};
