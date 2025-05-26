"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoginFormFields, SignInSchema } from "@/utils/mock";
import FormField from "@/components/common/FormField";
import { z } from "zod";
type FormData = z.infer<typeof SignInSchema>;
export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [togglePassType, setTogglePassType] = useState<{ [key: string]: boolean }>({
    password: false,
    confirm_password: false,
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange"
  });

  const handleTogglePasswordType = (fieldName: string) => {
    setTogglePassType((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin/`,
        {
          email: data.email,
          password: data.password,
        }
      );
      const result = response.data;

      setCookie("access_token", result.access_token, {
        maxAge: rememberMe ? 60 * 60 * 24 * 7 : undefined,
        path: "/",
      });

      toast.success("Login Successfully!", { position: "top-right" });
      localStorage.setItem("isLoggedin", "true");

      router.push(result?.is_subscribed ? "/dashboard" : "/subscription");
    } catch (error: any) {
      const message =
        error?.response?.data?.non_field_errors?.[0] || "Sign-in failed";
      toast.error(`Signin failed, ${message}`, { position: "top-right" });

      setError("email", { message: message });
      setError("password", { message: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center mb-8">
          <Image src="/clock.svg" alt="clock" width={48} height={48} />
          <span className="text-[#003BFF] font-medium text-lg ml-2">
            Watchlytics
          </span>
        </div>

        <h1 className="text-[2.5rem] font-bold mb-8 text-[#1E293B]">Sign In</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:w-[28rem] w-full">
          {/* Email Field */}

          <fieldset className="grid grid-cols-1">
            {
              LoginFormFields.map((field) => (
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
                  fill="#48505e"
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

          <div className="flex justify-between items-center mb-4">
            <Checkbox
              isSelected={rememberMe}
              onValueChange={setRememberMe}
              size="sm"
              className="text-gray-500 text-sm"
            >
              Remember me
            </Checkbox>

            <Link href="/forgot-password" className="text-sm text-gray-500">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            radius="sm"
            size="lg"
            color="primary"
            className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
          >
            Sign In
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-[#0047FF] font-medium underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
