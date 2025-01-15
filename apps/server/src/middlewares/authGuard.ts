import { Elysia } from "elysia";
import jwt from "jsonwebtoken";

export default new Elysia({
    name: "auth:middleware",
})
    .derive(({ headers }) => {
        const auth = headers["authorization"];

        if (!auth) {
            return {
                user: undefined, // Explicitly set null if no authorization header
            };
        }

        const token = auth.split(" ")[1];
        let user = null;

        try {
            // Attempt to verify the token
            user = jwt.verify(token, "secret") as {
                id: number;
                name: string;
            };
        } catch (err) {
            console.error("JWT verification failed:", err);
        }

        return {
            user: user ? { id: user.id, name: user.name } : undefined, // Return parsed user if valid
        };
    })
    .onBeforeHandle({ as: "scoped" }, ({ user }) => {
        if (!user) {
            // Return an unauthorized response if the user is not set
            return new Response("Unauthorized", { status: 401 });
        }
    });
