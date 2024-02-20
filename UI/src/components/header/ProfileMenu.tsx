"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import Cookies from "js-cookie";

import {
    Bell,
    CalendarDays,
    HelpCircle,
    LogOut,
    LucideIcon,
    MessageSquareWarning,
    Moon,
    Settings,
    Sun,
    SunMoon,
    User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

const ProfileMenu = () => {
    const { setTheme } = useTheme();

    const router = useRouter();

    const { user, setUser } = useAuth();

    if (!user) return <></>;

    const handleSignOut = () => {
        Cookies.remove("access_token");
        localStorage.clear();
        setUser(null);
        router.replace("/auth/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage
                        loading={"lazy"}
                        src={user?.profile.avatar || undefined}
                    ></AvatarImage>
                    <AvatarFallback>
                        {user?.name.split(" ")[0][0]}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent translate="yes" className="min-w-72">
                <div className="flex justify-start items-start gap-3 p-3">
                    <Avatar>
                        <AvatarImage
                            src={user?.profile.avatar || undefined}
                        ></AvatarImage>
                        <AvatarFallback>
                            {user?.name.split(" ")[0][0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {/* ACCOUNT INFO */}
                    <DropdownMenuItemIcon Icon={User}>
                        Thông tin tài khoản
                    </DropdownMenuItemIcon>
                    {/* GLOBAL SETTING */}
                    <DropdownMenuItemIcon Icon={Settings}>
                        Cài đặt chung
                    </DropdownMenuItemIcon>
                    {/* NOTOFICATION */}
                    <DropdownMenuItemIcon Icon={Bell}>
                        Thông báo
                    </DropdownMenuItemIcon>
                    {/* TIMETABLE */}
                    <DropdownMenuItemIcon Icon={CalendarDays}>
                        Thời khóa biểu
                    </DropdownMenuItemIcon>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {/* LANGUAGE */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            {/* <DropdownMenuItemIcon asChild Icon={Languages}> */}
                            Ngôn ngữ
                            {/* </DropdownMenuItemIcon> */}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItemIcon>
                                    Tiếng việt
                                </DropdownMenuItemIcon>
                                <DropdownMenuItemIcon>
                                    English
                                </DropdownMenuItemIcon>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {/* THEME */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            {/* <DropdownMenuItemIcon Icon={SunMoon} asChild> */}
                            Giao diện
                            {/* </DropdownMenuItemIcon> */}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItemIcon
                                    onClick={() => setTheme("light")}
                                    Icon={Sun}
                                >
                                    Sáng
                                </DropdownMenuItemIcon>
                                <DropdownMenuItemIcon
                                    onClick={() => setTheme("dark")}
                                    Icon={Moon}
                                >
                                    Tối
                                </DropdownMenuItemIcon>
                                <DropdownMenuItemIcon
                                    onClick={() => setTheme("system")}
                                    Icon={SunMoon}
                                >
                                    Hệ thống
                                </DropdownMenuItemIcon>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* LOGOUT */}
                    <DropdownMenuItemIcon onClick={handleSignOut} Icon={LogOut}>
                        Đăng xuất
                    </DropdownMenuItemIcon>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* HELP */}
                    <DropdownMenuItemIcon Icon={HelpCircle}>
                        Trợ giúp
                    </DropdownMenuItemIcon>
                    {/* FEEDBACK */}
                    <DropdownMenuItemIcon Icon={MessageSquareWarning}>
                        Phản hồi
                    </DropdownMenuItemIcon>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const DropdownMenuItemIcon = ({
    Icon,
    children,
    asChild,
    onClick,
}: {
    Icon?: LucideIcon;
    children: ReactNode;
    asChild?: boolean;
    onClick?: () => void;
}) => {
    return (
        <DropdownMenuItem onClick={onClick} asChild={asChild}>
            <div className="w-full flex justify-start items-center gap-3">
                {Icon && <Icon size={20} />}
                <span>{children}</span>
            </div>
        </DropdownMenuItem>
    );
};

export default ProfileMenu;
