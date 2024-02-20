import OtpForm from "@/components/form/OtpForm";
import Logo from "@/components/ui/Logo";
import { redirect } from "next/navigation";

const page = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const otpId = searchParams["o"] as string;
    const profileId = searchParams["p"] as string;
    const is2Fa = !!(searchParams["2fa"] as string);

    if (!otpId || !profileId) redirect("/auth/register");

    return (
        <div className="p-6">
            <Logo size="md"></Logo>
            <div className="my-10  space-y-5 m-auto lg:max-w-[60%] ">
                <div className=" w-full text-left leading-loose">
                    <h1 className="text-3xl font-semibold">Xác thực OTP</h1>
                    <span className="text-sm text-muted-foreground">
                        Mã OTP đã được gửi đến địa chỉ email của bạn
                    </span>
                </div>
                <OtpForm
                    is2Fa={is2Fa}
                    profileId={profileId}
                    otpId={otpId}
                ></OtpForm>
            </div>
        </div>
    );
};

export default page;
