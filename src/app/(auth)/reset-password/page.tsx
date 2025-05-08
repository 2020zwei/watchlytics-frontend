"use client";

import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
import { Button, Input, Form } from "@heroui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

// type FormDataType = Record<string, string>;

export default function SignIn() {
  const router = useRouter();
  const [link, setLink] = useState<string>("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkParam = params.get("link") ?? "";
    setLink(linkParam);
  }, []);
  const [errors, setErrors] = useState<any>({});
  // const [submitted, setSubmitted] = useState<FormDataType | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPasswordTouched, setNewPasswordTouched] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible2, setIsVisible2] = useState<boolean>(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState<boolean>(false);

  const getPasswordError = (value: string): string | null => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }
    return null;
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Toggle visibility state
  };
  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2); // Toggle visibility state
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: { message: string } } = {};

    const passwordError = getPasswordError(newPassword);
    if (passwordError) {
      newErrors.newPassword = { message: passwordError };
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = { message: "Passwords do not match" };
    }

    if (!link) {
      newErrors.link = { message: "Invalid or missing reset link" };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // setSubmitted({ newPassword, confirmPassword });
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://api-dev.watchlytics.io/api/auth/password-reset-confirm/${link}`,
        {
          password: newPassword,
          confrim_password: confirmPassword,
        }
      );
      toast.success("Password reset successfully!");
      router.push("/login");
    } catch (error: any) {
      console.error("API error:", error?.response?.data?.password[0]);
      toast.error(error?.response?.data?.password[0]);
      setErrors({
        api: {
          message:
            error?.response?.data?.detail ||
            "Something went wrong during password reset",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPasswordBlur = () => setNewPasswordTouched(true);
  const handleConfirmPasswordBlur = () => setConfirmPasswordTouched(true);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="">
          <div className="flex items-center mb-8">
            <div className="w-6 h-6  rounded-full flex items-center justify-center mr-2">
              <Image src="/clock.svg" alt="clock" width={48} height={48} />
            </div>
            <span className="text-[#003BFF] font-medium tracking-wide text-lg">
              Watchlytics
            </span>
          </div>

          <div className="w-full max-w-md">
            <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">
              Reset Password
            </h1>

            <Form
              className="w-full gap-4 justify-center items-center space-y-4"
              validationErrors={errors}
              // onReset={() => setSubmitted(null)}
              onSubmit={onSubmit}
            >
              <Input
                variant="bordered"
                radius="sm"
                size="lg"
                isRequired
                errorMessage={
                  newPasswordTouched
                    ? errors.newPassword
                      ? errors.newPassword.message
                      : getPasswordError(newPassword) || undefined
                    : undefined
                }
                isInvalid={
                  newPasswordTouched &&
                  (getPasswordError(newPassword) !== null ||
                    !!errors.newPassword)
                }
                label="New Password"
                labelPlacement="outside"
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onValueChange={setNewPassword}
                onBlur={handleNewPasswordBlur}
                type={isVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {!isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />

              <Input
                isRequired
                variant="bordered"
                radius="sm"
                size="lg"
                errorMessage={({}) => {
                  if (errors.confirmPassword) {
                    return errors.confirmPassword.message;
                  }
                  if (
                    confirmPasswordTouched &&
                    confirmPassword !== newPassword
                  ) {
                    return "Passwords do not match";
                  }
                  return undefined;
                }}
                isInvalid={
                  confirmPasswordTouched && confirmPassword !== newPassword
                }
                label="Confirm Password"
                labelPlacement="outside"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                onBlur={handleConfirmPasswordBlur}
                type={isVisible2 ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility2}
                  >
                    {!isVisible2 ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />

              <Button
                radius="sm"
                isLoading={isLoading}
                size="lg"
                color="primary"
                type="submit"
                className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
              >
                Reset Password
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
