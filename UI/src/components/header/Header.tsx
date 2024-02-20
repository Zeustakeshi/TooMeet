"use client";
import Logo from "@/components/ui/Logo";
import { useTheme } from "next-themes";
import GlobalSearch from "../search/GlobalSearch";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import HeaderAction from "./HeaderAction";
import Navbar from "./Navbar";

type Props = {};

const Header = (props: Props) => {
    const { setTheme, theme } = useTheme();
    return (
        <header className="shadow-1 bg-white dark:bg-slate-900 backdrop-blur-sm bg-opacity-80 sticky top-0 z-50">
            <MaxWidthWrapper className="hidden md:flex justify-between items-center gap-5">
                <div className="flex flex-1 flex-shrink-0 justify-start items-center gap-5">
                    <Logo className="p-5"></Logo>
                    <Navbar></Navbar>
                </div>
                <GlobalSearch></GlobalSearch>
                <HeaderAction></HeaderAction>
            </MaxWidthWrapper>
        </header>
    );
};

export default Header;
