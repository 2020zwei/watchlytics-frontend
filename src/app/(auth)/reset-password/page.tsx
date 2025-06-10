"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmpassword, password, ResetsswordSchema } from "@/utils/mock";
import FormField from "@/components/common/FormField";
import { useRouter } from "next/navigation";
import { usePasswordReset } from "@/hooks/useAuth";
type FormData = z.infer<typeof ResetsswordSchema>;

export default function SignIn() {
  const router = useRouter()
  const [link, setLink] = useState<string>("");
  const { mutateAsync: passwordReset, isPending, error: apiError } = usePasswordReset();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkParam = params.get("link") ?? "";
    setLink(linkParam);
  }, []);

  const [togglePassType, setTogglePassType] = useState<{ [key: string]: boolean }>({
    password: false,
    confirm_password: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ResetsswordSchema),
    mode: "onChange",
  });

  const handleTogglePasswordType = (fieldName: string) => {
    setTogglePassType((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };
  const onSubmit = async (data: FormData) => {
    if (!link) {
      toast.error("Invalid or missing reset link");
      return
    }
    else {
      try {
        const res = await passwordReset({ payload: data, id: link })
        toast.success("Password reset successfully!");
        router.push("/login");
      } catch (error: any) {
        console.error("API error:", error?.response?.data?.non_field_errors?.[0]);
        toast.error(error?.response?.data?.non_field_errors?.[0]);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Image src="/clock.svg" alt="clock" width={48} height={48} />
          <span className="text-[#003BFF] font-medium text-lg ml-2">
            Watchlytics
          </span>
        </div>

        <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">
          Reset Password?
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:w-[28rem] w-full"
        >
          <fieldset className="grid grid-cols-1">
            {
              [password, confirmpassword].map((field) => (
                <FormField
                  field={field}
                  fieldType={field.fieldType}
                  type={
                    field.type === "password"
                      ? togglePassType[field.name]
                        ? "text"
                        : "password"
                      : field.type
                  }
                  key={field.label}
                  label={field.label}
                  name={field.name}
                  control={control}
                  placeholder={field.placeholder}
                  errors={errors}
                  inputContainer="w-full"
                  containerClass="bloc"
                  iconSize="1.5rem"
                  inputClass="bg-transparent"
                  icon={
                    field.type === "password"
                      ? togglePassType[field.name]
                        ? "eyeOff"
                        : "filledEye"
                      : undefined
                  }
                  onPasswordToggle={() => handleTogglePasswordType(field.name)}
                />
              ))
            }
          </fieldset>

          <Button
            type="submit"
            isLoading={isPending}
            radius="sm"
            size="lg"
            color="primary"
            className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
