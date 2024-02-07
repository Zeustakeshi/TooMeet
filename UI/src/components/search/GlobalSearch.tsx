import React from "react";
import { Input } from "../ui/input";

type Props = {};

const GlobalSearch = (props: Props) => {
    return (
        <div className="flex-1 flex-shrink-0">
            <Input placeholder="Bạn muốn tìm gì?" />
        </div>
    );
};

export default GlobalSearch;
