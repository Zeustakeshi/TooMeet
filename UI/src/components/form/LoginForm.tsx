"use client";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Cookies from "js-cookie";
import { Button, buttonVariants } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const auth = useAuth();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (value: z.infer<typeof loginSchema>) => {
        setLoading(true);
        try {
            const response = await api({
                method: "POST",
                url: "/auth/login",
                data: { ...value },
            });
            const data = response.data;
            if (data.token && data.user) {
                localStorage.setItem("user", JSON.stringify(data.profile));

                Cookies.set("access_token", data.token, {
                    expires: data.expireIn,
                });
                auth.setUser(data.user);
                router.replace("/");
            } else {
                router.push(
                    `/auth/validation?o=${data.otpId}&p=${data.profileId}&2fa=true`
                );
            }
        } catch (error: any) {
            for (const key in error) {
                if (form.getValues(key as any))
                    form.setError(key as any, {
                        message: error[key],
                    });
                else {
                    alert(error);
                    break;
                }
            }
        }
        setLoading(false);
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-3"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="abc@gmail.com"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="********"
                                    type="password"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className="w-full mt-5"
                >
                    {loading ? "Đang xử lý" : " Đăng nhập"}
                </Button>
            </form>
            <div className="w-full text-center">
                <p>
                    Bạn chưa có tài khoản?
                    <Link
                        href="/auth/register"
                        className={cn(buttonVariants({ variant: "link" }))}
                    >
                        Tạo tài khoản
                    </Link>
                </p>
            </div>
        </Form>
    );
};

export default LoginForm;
