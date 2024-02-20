"use client";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
type Props = {};

const CreatePost = (props: Props) => {
    const form = useForm();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="p-5">
                    <div className="flex justify-start items-center gap-5 mb-5">
                        <Avatar className="w-14 h-14">
                            <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <div className="text-slate-600 px-5 py-2 flex-1 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 rounded-md outline-primary border border-transparent">
                            Bạn đang nghĩ gì?
                        </div>
                    </div>
                    <div className="flex justify-end items-center">
                        <Button>Đăng</Button>
                    </div>
                </Card>
            </DialogTrigger>
            <DialogContent className="min-w-[800px] min-h-[500px] ">
                <Form {...form}>
                    <form className="flex flex-col justify-between w-full h-full">
                        <div className="flex justify-between items-start gap-5 p-3">
                            <DialogHeader>
                                <DialogTitle>Tạo bài viết</DialogTitle>
                                <DialogDescription>
                                    Tạo và chia sẻ khoảnh khắc với bạn bè
                                </DialogDescription>
                            </DialogHeader>
                            <Select>
                                <SelectTrigger
                                    defaultChecked
                                    className="w-[180px]"
                                >
                                    <SelectValue placeholder="Phạm vi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem defaultChecked value="PUBLIC">
                                        Công khai
                                    </SelectItem>
                                    <SelectItem value="PRIVATE">
                                        Riêng tư
                                    </SelectItem>
                                    <SelectItem value="FRIEND">
                                        Bạn bè
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Đăng</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;
