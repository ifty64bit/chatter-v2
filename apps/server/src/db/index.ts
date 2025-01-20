import { drizzle } from "drizzle-orm/neon-http";

const CONNECTION_STRING = process.env.DATABASE_URL;

if (!CONNECTION_STRING) {
    throw new Error("DATABASE_URL is not set");
}

const db = drizzle(CONNECTION_STRING);

export default db;
