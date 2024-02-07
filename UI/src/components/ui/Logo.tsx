import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
};

const Logo: FC<Props> = ({ className, size }) => {
    return (
        <Link
            href="/"
            className={cn(
                "inline-block text-2xl font-semibold text-primary",
                className,
                size === "2xl" || "text-2xl",
                size === "sm" && "text-sm",
                size === "md" && "text-md",
                size === "lg" && "text-lg",
                size === "xl" && "text-xl"
            )}
        >
            TooMeet
        </Link>
    );
};

export default Logo;
