"use client";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const LoginForm = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (value: z.infer<typeof loginSchema>) => {
        console.log(value);
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
                <Button type="submit" className="w-full mt-5">
                    Đăng nhập
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
