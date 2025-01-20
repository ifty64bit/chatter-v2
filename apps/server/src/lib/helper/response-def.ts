import { Elysia, t } from "elysia";

export default new Elysia({
    name: "middleware:response",
}).guard({
    response: {
        200: t.Object({
            data: t.Any(),
        }),
    },
});
