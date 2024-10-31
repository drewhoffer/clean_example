import { DB } from "https://deno.land/x/sqlite/mod.ts";

function dropDatabase() {
	const db = new DB("./db/clean_example_development.db");
	db.execute("DROP TABLE IF EXISTS todos");
	console.log("Database reset successfully.");
	db.close();
}

try {
	dropDatabase();
} catch (err) {
	console.error("Error resetting database:", err);
}
