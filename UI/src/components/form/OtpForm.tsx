"use client";
import api from "@/lib/api";
import { otpSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAuth } from "@/context/AuthProvider";

type Props = {
    profileId: string;
    otpId: string;
    is2Fa: boolean;
};

const OtpForm = ({ profileId: p, otpId: o, is2Fa }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [otpId, setOtpId] = useState(() => o);
    const [profileId, setProfileId] = useState(() => p);

    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
    });

    const router = useRouter();
    const auth = useAuth();

    const onSubmit = async (value: z.infer<typeof otpSchema>) => {
        try {
            setLoading(true);
            const url = is2Fa ? "/auth/otp/2fa/verify" : "auth/otp/verify";
            const response = await api({
                method: "POST",
                url,
                params: {
                    p: profileId,
                    o: otpId,
                },
                data: value,
            });

            const data = response.data;
            localStorage.setItem("user", JSON.stringify(data.user));
            Cookies.set("access_token", data.token, {
                expires: data.expireIn,
            });
            auth.setUser(data.user);
            router.replace("/");
        } catch (error: any) {
            const message = error?.response?.data?.message;
            form.setError("otp", {
                message: error,
            });
        }
        setLoading(false);
    };

    const handleResend = async () => {
        try {
            setLoading(true);
            const response = await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/otp/resend`,
                params: {
                    p: profileId,
                    o: otpId,
                },
            });

            const data = response.data;
            setOtpId(data.otpId);
        } catch (error: any) {
            const message = error?.response?.data?.message;
            if (!message) {
                console.log({ error });
                alert("Đã có lỗi xảy ra vui lòng thử lại sau!");
                return;
            }
            form.setError("otp", {
                message,
            });
        }
        setLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="text-center"
                                    placeholder="Nhập mã OTP"
                                    type="password"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className="w-full my-5"
                >
                    {loading ? "Đang xử lý" : "Xác nhận"}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                    Bạn chưa nhận được OTP ?
                    <Button
                        disabled={loading}
                        onClick={handleResend}
                        type="button"
                        variant={"link"}
                    >
                        Gửi lại
                    </Button>
                </p>
            </form>
        </Form>
    );
};

export default OtpForm;
