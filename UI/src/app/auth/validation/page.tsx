import LoginForm from "@/components/form/LoginForm";
import OtpForm from "@/components/form/OtpForm";
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
                    <h1 className="text-3xl font-semibold">Xác thực OTP</h1>
                    <span className="text-sm text-muted-foreground">
                        Mã OTP đã được gửi đến địa chỉ email abc@gmail.com.
                    </span>
                </div>
                <OtpForm></OtpForm>
            </div>
        </div>
    );
};

export default page;
