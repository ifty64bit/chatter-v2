import { integer, pgTable } from "drizzle-orm/pg-core";
import { roomsTable } from "./roomsSchema";
import { usersTable } from "./usersSchema";

export const roomsToUsersTable = pgTable("rooms_to_users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    roomId: integer()
        .notNull()
        .references(() => roomsTable.id),
    userId: integer()
        .notNull()
        .references(() => usersTable.id),
});

export type RoomsToUsersInsert = typeof roomsToUsersTable.$inferInsert;
export type RoomsToUsers = typeof roomsToUsersTable.$inferSelect;
