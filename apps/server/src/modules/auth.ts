import { Elysia, t } from "elysia";
import db from "../db";
import { type User, usersTable } from "../db/schemas/userSchema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import brbcrypt from "bcryptjs";

export default new Elysia({
    name: "api:auth",
    prefix: "/auth",
})
    .decorate("db", db)
    .post(
        "/login",
        async ({ body, db, error }) => {
            try {
                const user: User[] = await db
                    .select()
                    .from(usersTable)
                    .where(eq(usersTable.email, body.email))
                    .limit(1);
                if (user.length === 0) {
                    return error(401, "User not found");
                }

                const passwordMatch = await brbcrypt.compare(
                    body.password,
                    user[0].password
                );

                if (!passwordMatch) {
                    return error(401, "Invalid password");
                }

                const token = jwt.sign(
                    { id: user[0].id },
                    process.env.JWT_SECRET as string,
                    {
                        expiresIn: "1d",
                    }
                );

                return {
                    token,
                    user: user[0],
                };
            } catch (e) {
                console.error(e);
                return error(500, "Internal server error");
            }
        },
        {
            body: t.Object({
                email: t.String(),
                password: t.String(),
            }),
        }
    )
    .post(
        "/register",
        async ({ db, body, error }) => {
            try {
                const hashedPassword = await brbcrypt.hash(body.password, 10);

                const user: User[] = await db
                    .insert(usersTable)
                    .values({
                        email: body.email,
                        password: hashedPassword,
                        name: body.name,
                        username: body.username,
                    })
                    .returning();

                return user[0];
            } catch (e) {
                console.error(e);
                return error(500, "Internal server error");
            }
        },
        {
            body: t.Object({
                name: t.String(),
                username: t.String(),
                email: t.String(),
                password: t.String(),
            }),
            response: {
                200: t.Object({
                    id: t.Number(),
                    name: t.String(),
                    username: t.String(),
                    email: t.String(),
                }),
                500: t.String(),
            },
        }
    );
