import { DB } from "https://deno.land/x/sqlite/mod.ts";

// Initialize SQLite Database
const db = new DB("./db/clean_example_development.db");

// Create the todos table
db.execute(`
  CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    label TEXT,
    description TEXT,
    status TEXT,
    priority TEXT,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

db.close();

export default db;
