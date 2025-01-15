import { type Config } from "tailwindcss";

const sharedConfig: Config = {
    content: [
        "../../apps/web/src/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default sharedConfig;
