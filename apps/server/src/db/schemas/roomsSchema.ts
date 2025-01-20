import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const roomsTable = pgTable("rooms", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
});

export type RoomInsert = typeof roomsTable.$inferInsert;
export type Room = typeof roomsTable.$inferSelect;
