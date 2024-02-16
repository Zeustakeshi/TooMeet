import * as z from "zod";
import moment from "moment";

export const createAccoutSchema = z
    .object({
        email: z
            .string({
                required_error: "Email không được bỏ trống!",
            })
            .email({
                message: "Định dạng email không hợp lệ!",
            }),
        username: z
            .string({
                required_error: "Tên không được bỏ trống!",
            })
            .min(5, { message: "Tên người dùng phải có ít nhất 5 kí tự" })
            .max(50, "Tên người dùng không được vượt quá 50 kí tự"),
        birthday: z.date({ required_error: "Vui lòng chọn ngày sinh" }),
        gender: z.enum(["MALE", "FEMALE", "OTHER"], {
            required_error: "Vui lòng chọn giới tính",
        }),
    })
    .refine(
        (data) => {
            return moment(data.birthday).get("year") > 16;
        },
        {
            message: "Tuổi phải lớn hơn 16",
        }
    );

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "Email không được bỏ trống!",
        })
        .email({
            message: "Định dạng email không hợp lệ!",
        }),
});

export const otpSchema = z.object({
    otp: z
        .string({
            required_error: "Vui lòng nhập OTP.",
        })
        .length(6, { message: "OTP không hợp lệ!" }),
});
