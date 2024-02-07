import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";

type Props = {
    className?: string;
    children: ReactNode;
};

const MaxWidthWrapper: FC<Props> = ({ children, className }) => {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-screen-2xl px-2.5 md:px-16",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
