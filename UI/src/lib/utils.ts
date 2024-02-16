import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const sleep = async (ms: number) => {
    return await new Promise((rs) => setTimeout(rs, ms));
};
