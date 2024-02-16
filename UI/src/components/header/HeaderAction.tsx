"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

import ProfileMenu from "./ProfileMenu";
import { MessageSquareMore, BellIcon, MoonIcon, SunIcon } from "lucide-react";

const HeaderAction = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            <div className="flex flex-1 flex-shrink-0 justify-end items-center gap-4">
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        theme === "dark" ? setTheme("light") : setTheme("dark")
                    }
                >
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Button className="" variant={"ghost"}>
                    <BellIcon className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <Button variant={"ghost"}>
                    <MessageSquareMore className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <ProfileMenu></ProfileMenu>
            </div>
        </div>
    );
};

export default HeaderAction;
