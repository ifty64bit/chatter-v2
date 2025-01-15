import { Elysia } from "elysia";

export default new Elysia({
    name: "auth",
    prefix: "/auth",
})
    .post("/login", ({ request }) => {
        return {
            message: "Hello Elysia",
        };
    })
    .post("/register", () => {});
