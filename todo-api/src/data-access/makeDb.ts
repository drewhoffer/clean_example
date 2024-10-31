import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

export function makeDb(): DB {
	const db = new DB("./db/clean_example_development.db");
	return db;
}
export default makeDb;
