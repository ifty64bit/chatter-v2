import { Elysia, t } from "elysia";
import authGuard from "../middlewares/authGuard";
import db from "../db";
import { roomsTable } from "../db/schemas/roomsSchema";
import { roomsToUsersTable } from "../db/schemas/roomsToUsersSchema";
import { aliasedTable, and, eq, ne } from "drizzle-orm";
import { usersTable } from "../db/schemas/usersSchema";

export default new Elysia({
    name: "api:room",
    prefix: "/room",
})
    .use(authGuard)
    .decorate("db", db)
    .post(
        "/create",
        async ({ body, error, db, user }) => {
            try {
                const [room] = await db
                    .insert(roomsTable)
                    .values({
                        name: body.name ? body.name : "unnamed",
                    })
                    .returning();

                body.participants.forEach(async (userId: number) => {
                    await db
                        .insert(roomsToUsersTable)
                        .values({
                            roomId: room.id,
                            userId,
                        })
                        .returning();
                });
                return {
                    roomId: room.id,
                    name: room.name,
                };
            } catch (e) {
                console.error(e);
                return error(500, "Internal server error");
            }
        },
        {
            body: t.Object({
                name: t.Optional(t.String()),
                participants: t.Array(t.Number()),
            }),
        }
    )
    .get("/list", async ({ db, error, user }) => {
        try {
            return await db
                .select({
                    id: roomsTable.id,
                    name: roomsTable.name,
                    participants: [
                        {
                            id: usersTable.id,
                            name: usersTable.name,
                            username: usersTable.username,
                        },
                    ],
                })
                .from(roomsToUsersTable)
                .innerJoin(
                    roomsTable,
                    eq(roomsToUsersTable.roomId, roomsTable.id)
                )
                .innerJoin(
                    usersTable,
                    and(
                        eq(roomsToUsersTable.userId, user!.id),
                        ne(usersTable.id, user!.id)
                    )
                )
                .where(eq(roomsToUsersTable.userId, user!.id));
        } catch (e) {
            console.error(e);
            return error(500, "Internal server error");
        }
    });
