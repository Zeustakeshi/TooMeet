"use client";
import CreatePost from "@/components/post/CreatePost";
import { Card } from "@/components/ui/card";
import React from "react";

const Home = () => {
    return (
        <div className="min-h-[4000px]">
            <CreatePost></CreatePost>
            <Card className="p-5 my-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus perferendis sunt distinctio sint praesentium. Ab
                expedita ducimus similique rerum aliquid maiores omnis tenetur,
                quis sunt, hic magni! Corrupti, aperiam inventore!
            </Card>
        </div>
    );
};

export default Home;
