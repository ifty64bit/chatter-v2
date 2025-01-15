import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    appName: string;
}

export const Button = ({ children, appName }: ButtonProps) => {
    return (
        <button
            className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }
            onClick={() => alert(`Hello from your ${appName} app!`)}
        >
            {children}
        </button>
    );
};
