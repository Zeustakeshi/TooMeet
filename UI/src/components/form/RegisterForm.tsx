"use client";
import { cn } from "@/lib/utils";
import { createAccoutSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import moment from "moment";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button, buttonVariants } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof createAccoutSchema>>({
        resolver: zodResolver(createAccoutSchema),
    });

    const onSubmit = (value: z.infer<typeof createAccoutSchema>) => {
        console.log(value);

        router.push("/auth/validation");
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-3"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* EMAIL */}
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
                {/* USERNAME */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên người dùng</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nguyễn Văn A"
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="">Ngày sinh</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild className="w-full">
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "",
                                                    !field.value &&
                                                        "text-muted-foreground w-full "
                                                )}
                                            >
                                                {field.value ? (
                                                    moment(field.value).format(
                                                        "DD-MM-yyyy"
                                                    )
                                                ) : (
                                                    <span className="mr-2">
                                                        Chọn ngày sinh
                                                    </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-full p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            // showOutsideDays={false}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date >
                                                    moment()
                                                        .subtract(16, "years")
                                                        .toDate() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                            defaultMonth={
                                                field.value ||
                                                moment()
                                                    .subtract(16, "years")
                                                    .toDate()
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giới tính</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Giới tính" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"MALE"}>
                                            Nam
                                        </SelectItem>
                                        <SelectItem value={"FEMALE"}>
                                            Nữ
                                        </SelectItem>
                                        <SelectItem value={"OTHER"}>
                                            Khác
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full mt-5">
                    Tạo tài khoản
                </Button>
            </form>
            <div className="w-full text-center">
                <p>
                    Bạn đã là thành viên?{" "}
                    <Link
                        href="/auth/login"
                        className={cn(buttonVariants({ variant: "link" }))}
                    >
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </Form>
    );
};

export default RegisterForm;
