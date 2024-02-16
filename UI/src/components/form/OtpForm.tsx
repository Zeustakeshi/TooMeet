"use client";
import { otpSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {};

const OtpForm = (props: Props) => {
    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
    });

    const onSubmit = (value: z.infer<typeof otpSchema>) => {
        console.log({ value });
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
                <Button type="submit" className="w-full my-5">
                    Xác nhận
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                    Bạn chưa nhận được OTP ?
                    <Link
                        href="/"
                        className={cn(buttonVariants({ variant: "link" }))}
                    >
                        Gửi lại
                    </Link>
                </p>
            </form>
        </Form>
    );
};

export default OtpForm;
