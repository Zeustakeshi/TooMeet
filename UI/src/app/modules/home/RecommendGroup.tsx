import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {};

type Group = {
    id: string;
    name: string;
    image: string;
};

const groups: Group[] = [
    {
        id: "1",
        name: "Alice Alice Alice",
        image: "https://example.com/alice.jpg",
    },
    {
        id: "2",
        name: "Bob Bob Bob",
        image: "https://example.com/bob.jpg",
    },
];
const RecommendGroup = (props: Props) => {
    return (
        <div className="w-full">
            {groups.map((user, index) => (
                <div
                    className={cn(
                        "w-full flex justify-start items-center gap-2 px-4 py-2"
                    )}
                    key={user.id}
                >
                    <div className="w-14 h-14 rounded-md flex-shrink-0">
                        <img
                            className=" rounded-md w-full h-full object-cover"
                            src="https://source.unsplash.com/random"
                            alt={`img-group-${user.name}`}
                        />
                    </div>
                    <div className="w-full">
                        <h5 className="text-sm font-semibold  line-clamp-1 mb-2 ">
                            {user.name}
                        </h5>
                        <div className="w-full flex justify-start items-center gap-2">
                            <Button size="sm" variant="secondary">
                                Xoá
                            </Button>
                            <Button size="sm">Theo dõi</Button>
                        </div>
                    </div>
                </div>
            ))}
            <Link
                href="/"
                className={cn(
                    "w-full text-center",
                    buttonVariants({ variant: "link" })
                )}
            >
                xem thêm
            </Link>
        </div>
    );
};

export default RecommendGroup;
