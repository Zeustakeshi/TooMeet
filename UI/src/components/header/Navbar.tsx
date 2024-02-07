"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { tuple } from "zod";

type Props = {};

type NavItem = {
    label: string;
    to: string;
};

const navItems: NavItem[] = [
    {
        label: "Trang chủ",
        to: "/",
    },
    {
        label: "Bạn bè",
        to: "/friends",
    },
    {
        label: "Nhóm",
        to: "/groups",
    },
];

const Navbar = (props: Props) => {
    const pathname = usePathname();
    return (
        <nav className="flex w-full justify-start items-center gap-5">
            {navItems.map(({ label, to }, index) => (
                <Link
                    className={cn(
                        "font-semibold hover:text-primary text-muted-foreground",
                        {
                            "text-primary": pathname.startsWith(to),
                        }
                    )}
                    key={index}
                    href={to}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default Navbar;
