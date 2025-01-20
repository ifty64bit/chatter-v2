import { Elysia, t } from "elysia";
import db from "../db";
import { type User, usersTable } from "../db/schemas/userSchema";

export default new Elysia({
    name: "api:auth",
    prefix: "/auth",
})
    .decorate("db", db)
    .post("/login", ({ request, db }) => {
        return {
            message: "Hello Elysia",
        };
    })
    .post(
        "/register",
        async ({ db, body }) => {
            const user: User[] = await db
                .insert(usersTable)
                .values({
                    email: body.email,
                    password: body.password,
                    name: body.name,
                    username: body.username,
                })
                .returning();
            return user[0];
        },
        {
            body: t.Object({
                name: t.String(),
                username: t.String(),
                email: t.String(),
                password: t.String(),
            }),
        }
    );
