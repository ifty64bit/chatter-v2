import { Elysia } from "elysia";
import auth from "./modules/auth";
import { cors } from "@elysiajs/cors";
import room from "./modules/room";

const app = new Elysia()
    .use(cors())
    .get("/", () => "Hello Elysia")
    .use(auth)
    .use(room)
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
