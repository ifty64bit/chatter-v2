import { Elysia } from "elysia";
import authGuard from "../middlewares/authGuard";

export default new Elysia({
    name: "room",
    prefix: "/room",
})
    .use(authGuard)
    .post("/create", ({}) => {
        return { message: "Hello Elysia" };
    })
    .get("/list", ({ request }) => {
        return {
            rooms: [
                {
                    id: 1,
                    name: "Room 1",
                },
                {
                    id: 2,
                    name: "Room 2",
                },
            ],
        };
    });
