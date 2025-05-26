"use client";

import { Button } from "@heroui/react";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@/components/common/Icon";

// Zod Schema
const ForgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password/`;
      await axios.post(url, data);

      toast.success("Reset password email sent successfully!", {
        position: "top-right",
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.non_field_errors?.[0] ||
        "Failed to send reset link"
      );
    } finally {
      setLoading(false);
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
          Forgot Password?
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:w-[28rem] w-full"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
              Email Address:
              <sup><Icon name="star" fill="red" size="0.5rem" /></sup>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`border rounded-md bg-transparent px-3 py-2 w-full focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={loading}
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
