export const generateInsertQuery = (
  tableName: string,
  data: Record<string, string>
) => {
  const columns = Object.keys(data);
  const values = Object.values(data);

  const placeholders = columns.map(() => "?").join(", ");
  const query = `INSERT INTO ${tableName} (${columns.join(
    ", "
  )}) VALUES (${placeholders})`;

  return { query, values };
};

export const generateUpdateQuery = (
  tableName: string,
  data: Record<string, string>,
  condition: string
) => {
  const columnsAndValues = Object.entries(data);
  const setClause = columnsAndValues
    .map(([column]) => `${column} = ?`)
    .join(", ");

  const query = `UPDATE ${tableName} SET ${setClause} WHERE ${condition}`;
  const values = columnsAndValues.flatMap(([, value]) => [value]);

  return { query, values };
};
