"use client";

import { Button } from "@heroui/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import FormField from "@/components/common/FormField";
import { clientId, confirmpassword, email, name, password, RegistrationFormSchema } from "@/utils/mock";
import { useSignup } from "@/hooks/useAuth";
const fields = [
  { ...name, name: "name" },
  email,
  password,
  confirmpassword,
  clientId
]

type FormData = z.infer<typeof RegistrationFormSchema>;

export default function Signup() {
  const router = useRouter();
  const { mutateAsync: signup, isPending, error: apiError } = useSignup();

  const [togglePassType, setTogglePassType] = useState<{ [key: string]: boolean }>({
    password: false,
    confirm_password: false,
  });

  const {
    control,
    handleSubmit,
    setError,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RegistrationFormSchema),
    mode: "onChange"
  });

  const handleTogglePasswordType = (fieldName: string) => {
    setTogglePassType((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const [password, confirmPassword] = watch(["password", "confirm_password"]);
  useEffect(() => {
    if (password || confirmPassword) {
      trigger(["password", "confirm_password"]);
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = async (data: FormData) => {
    console.log(data)
    const payload = {
      email: data.email,
      password: data.password,
      first_name: data.name,
      lastname: "",
      client_id: data.client_id || undefined,
    };
    try {
      const res = await signup(payload);
      const result = res.data;

      setCookie("access_token", result.access_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      toast.success("Signup Successful!", { position: "top-right" });
      router.push("/subscription");
    }
    catch (error: any) {
      console.log(apiError)
      if (axios.isAxiosError(error)) {

        const errors = error?.response?.data?.errors;
        console.log(errors)
        if (errors && typeof errors === "object") {
          Object.entries(errors).forEach(([field, message]) => {
            // @ts-ignore
            setError(field, { type: "server", message: message as string });
          });
        }
      }
    }
  };



  return (
    <>
      <div className="flex items-center mb-8">
        <Image src="/clock.svg" alt="clock" width={48} height={48} />
        <span className="text-[#003BFF] font-medium tracking-wide text-lg ml-2">Watchlytics</span>
      </div>

      <h1 className="text-[32px] font-bold text-dark-800 ">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="pb-10">


        <fieldset className="grid grid-cols-1">
          {
            fields.map((field) => (
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

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isPending}
          className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90 mt-6"
          radius="sm"
          size="lg"
          color="primary"
        >
          Create Account
        </Button>

        <div className="text-center text-sm w-full text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0047FF] font-medium underline">
            Sign In
          </Link>
        </div>
      </form>
    </>
  );
}
