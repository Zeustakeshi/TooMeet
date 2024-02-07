import RegisterForm from "@/components/form/RegisterForm";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const page = () => {
    return (
        <div className="p-6">
            <Logo size="md"></Logo>
            <div className="my-10  space-y-5 m-auto lg:max-w-[60%] ">
                <div className=" w-full text-left leading-loose">
                    <h1 className="text-3xl font-semibold">Tạo tài khoản</h1>
                    <span className="text-sm text-muted-foreground">
                        Tạo tài khoản để kết nối với mọi người
                    </span>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 ">
                    <Button variant="secondary">Đăng nhập với Google</Button>
                    <Button variant="secondary">Đăng nhập với Facebook</Button>
                </div>
                <RegisterForm></RegisterForm>
            </div>
        </div>
    );
};

export default page;
