import React, { FC, ReactNode } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
    children: ReactNode;
    title?: string;
    description?: string;
};

const SidebarItem: FC<Props> = (props) => {
    return (
        <Card>
            {(props.title || props.description) && (
                <>
                    <CardHeader>
                        {props.title && (
                            <CardTitle className="text-lg text-primary">
                                {props.title}
                            </CardTitle>
                        )}
                        {props.description && (
                            <CardDescription>
                                {props.description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <Separator />
                </>
            )}
            <CardContent className="">{props.children}</CardContent>
        </Card>
    );
};

export default SidebarItem;
