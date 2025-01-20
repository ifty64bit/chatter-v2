import { Elysia } from "elysia";
import jwt from "jsonwebtoken";

export default new Elysia({
    name: "auth:middleware",
})
    .derive({ as: "scoped" }, ({ headers }) => {
        const auth = headers["authorization"];
        if (!auth) {
            return { user: null };
        }

        const token = auth.split(" ")[1];
        try {
            return {
                user: jwt.verify(token, process.env.JWT_SECRET as string) as {
                    id: number;
                    name: string;
                },
            };
        } catch (error) {
            console.error("JWT verification failed:", error);
            return { user: null };
        }
    })
    .onBeforeHandle({ as: "scoped" }, ({ user }) => {
        if (!user) {
            return new Response("Unauthorized", { status: 401 });
        }
    });
