import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React, { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const layout: FC<Props> = ({ children }) => {
    return (
        <div className="min-w-svw sm:h-[calc(100svh-72px)] min-h-[calc(100svh-72px)] py-4  bg-primary/5 ">
            <MaxWidthWrapper className="w-full h-full">
                <div className="shadow-xl bg-white dark:bg-slate-900 rounded-lg w-full h-full  flex justify-center items-center">
                    <div className="p-3 flex-1 h-full">{children}</div>
                    <div className="p-3  hidden lg:block h-full  flex-1">
                        <div className="bg-auth-background bg-contain bg-no-repeat bg-center bg-red-50 dark:bg-slate-800 w-full h-full rounded-md animate-"></div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default layout;
