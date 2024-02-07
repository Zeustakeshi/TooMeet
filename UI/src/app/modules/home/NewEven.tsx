import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

type EvenItem = {
    title: string;
    link: string;
    content: string;
    image: string;
};

const evens = [
    {
        title: "The Seven Wonders of the Ancient World",
        link: "https://www.history.com/topics/ancient-history/seven-wonders",
        content:
            "Learn about the Seven Wonders of the Ancient World, including the Great Pyramid of Giza and the Hanging Gardens of Babylon.",
        image: "https://www.history.com/.image/t_share/MTY2MjUwNzM0OTExMjIzMDc/mausoleum-at-halicarnassus.jpg",
    },
    {
        title: "Introduction to Quantum Mechanics",
        link: "https://www.khanacademy.org/science/physics/quantum-physics",
        content:
            "Explore the fundamental principles of quantum mechanics, from wave-particle duality to quantum superposition.",
        image: "https://cdn.kastatic.org/ka-perseus-images/a1288e4a8b033e1a0530a885d007ed07a6c634d7.png",
    },
];

const NewEven = async () => {
    return (
        <div className="w-full">
            {evens.map((even, index) => (
                <Link
                    className={cn(
                        "w-full flex justify-start items-start gap-2 hover:bg-muted px-4 py-2"
                    )}
                    href={even.link}
                    key={index}
                >
                    <div className="w-14 h-14 rounded-md flex-shrink-0">
                        <img
                            className=" rounded-md w-full h-full object-cover"
                            src="https://source.unsplash.com/random"
                            alt={`img-even-${even.title}`}
                        />
                    </div>
                    <div>
                        <h5 className="text-sm font-semibold  line-clamp-1">
                            {even.title}
                        </h5>
                        <p className="w-full line-clamp-2 text-pretty text-xs text-muted-foreground ">
                            {even.content}
                        </p>
                    </div>
                </Link>
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

export default NewEven;
