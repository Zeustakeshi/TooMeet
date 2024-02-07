import Sidebar from "@/components/sidebar/Sidebar";
import SidebarItem from "@/components/sidebar/SidebarItem";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { FC, ReactNode, Suspense } from "react";
import NewEven from "../modules/home/NewEven";
import RecommendGroup from "../modules/home/RecommendGroup";
import RecommendFriend from "../modules/home/RecommendFriend";

type Props = {
    children: ReactNode;
};

const layout: FC<Props> = ({ children }) => {
    return (
        <MaxWidthWrapper className="grid grid-cols-12 gap-2">
            <Sidebar className="col-start-1 col-end-4 ">
                <SidebarItem title="Sự kiện nổi bật">
                    <NewEven></NewEven>
                </SidebarItem>
                <SidebarItem title="Bạn có thể biết">
                    <RecommendFriend></RecommendFriend>
                </SidebarItem>
                <SidebarItem title="Bạn có thể quan tâm">
                    <RecommendGroup></RecommendGroup>
                </SidebarItem>
            </Sidebar>
            <div className="col-start-4 col-end-10 my-10 ">{children}</div>
            <Sidebar className="col-start-10 col-end-13 ">
                <SidebarItem>hi</SidebarItem>
            </Sidebar>
        </MaxWidthWrapper>
    );
};

export default layout;
