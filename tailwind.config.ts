import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        colors: {
            blanco: "#ffffff",
            negro: "#000814",
            gris: "#f2f2f2",
            primario: "#001d3d",
            secundario: "#003566",
            terciario: "#ffc300",
            cuaternario: "#ffd60a",
        },
    },
    plugins: [nextui()],
};
export default config;
