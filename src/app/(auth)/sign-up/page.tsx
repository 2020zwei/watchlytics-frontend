"use client";

import { Button, Input, Form } from "@heroui/react";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EyeFilledIcon } from "../../../components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../components/icon/EyeSlashFilledIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

type FormDataType = Record<string, string | FormDataEntryValue>;

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [clientId, setClientId] = useState("");
  const router = useRouter();

  const getPasswordError = (value: string): string | null => {
    if (value.length < 4) return "Password must be 4 characters or more";
    if (!/[A-Z]/.test(value)) return "Password needs at least 1 uppercase letter";
    if (!/[^a-zA-Z0-9]/.test(value)) return "Password needs at least 1 symbol";
    return null;
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible((prev) => !prev);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as FormDataType;
    const newErrors: any = {};

    const nameValue = (data.name as string)?.trim();
    if (!nameValue) newErrors.name = { message: "Please enter your full name" };
    else if (/^\d/.test(nameValue)) newErrors.name = { message: "Name should not start with a number" };
    else if (!/^[A-Za-z\s]+$/.test(nameValue)) newErrors.name = { message: "Name can only contain letters and spaces" };

    const emailValue = (data.email as string)?.trim();
    if (!emailValue) newErrors.email = { message: "Please enter your email address" };

    const passwordError = getPasswordError(password);
    if (passwordError) newErrors.password = { message: passwordError };

    if (password !== confirmPassword) {
      newErrors.confirmPassword = { message: "Passwords do not match" };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      email: data.email,
      password: password,
      first_name: nameValue,
      lastname: "",
      client_id: Number(data.clientId) || undefined,
    };

    setLoading(true);
    try {
      const response = await axios.post("https://api-dev.watchlytics.io/api/auth/signup/", payload);
      const result = response.data;

      setCookie("access_token", result.access_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      toast.success("Signup Successful!", { position: "top-right" });
      router.push("/subscription");
    } catch (error: any) {

      if (axios.isAxiosError(error)) {
        setErrors(error?.response?.data?.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(errors, "Bilal")
  }, [errors])

  return (
    <>
      <div className="flex items-center mb-8">
        <Image src="/clock.svg" alt="clock" width={48} height={48} />
        <span className="text-[#003BFF] font-medium tracking-wide text-lg ml-2">Watchlytics</span>
      </div>
      <>
        <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">Create Account</h1>
        <Form onSubmit={onSubmit} validationErrors={errors} className="pb-10">
          <Input
            isRequired
            name="name"
            placeholder="Enter your full name"
            label="Full Name"
            labelPlacement="outside"
            type="text"
            variant="bordered"
            radius="sm"
            size="lg"
            errorMessage={() => errors.name?.message}
          />

          <Input
            isRequired
            name="email"
            placeholder="Enter your email"
            label="Email"

            labelPlacement="outside"
            type="email"
            variant="bordered"
            radius="sm"
            size="lg"
            errorMessage={() => errors.email}
          />

          <Input
            isRequired
            name="password"
            placeholder="Enter your password"
            label="Password"
            labelPlacement="outside"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onValueChange={setPassword}
            onBlur={() => setPasswordTouched(true)}
            variant="bordered"
            radius="sm"
            size="lg"
            isInvalid={passwordTouched && (!!getPasswordError(password) || !!errors.password)}
            errorMessage={() =>
              passwordTouched && (errors.password?.message || getPasswordError(password))
            }
            endContent={
              <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                {isPasswordVisible ? (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />

          <Input
            isRequired
            name="confirmPassword"
            placeholder="Re-enter your password"
            label="Confirm Password"
            labelPlacement="outside"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onValueChange={setConfirmPassword}
            onBlur={() => setConfirmPasswordTouched(true)}
            variant="bordered"
            radius="sm"
            size="lg"
            isInvalid={confirmPasswordTouched && confirmPassword !== password}
            errorMessage={() =>
              confirmPasswordTouched && confirmPassword !== password
                ? "Passwords do not match"
                : ""
            }
            endContent={
              <button type="button" onClick={toggleConfirmPasswordVisibility} className="focus:outline-none">
                {isConfirmPasswordVisible ? (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />

          <Input
            name="clientId"
            value={clientId}
            onValueChange={setClientId}
            label={
              <div className="flex justify-between items-center">
                <span>IFS Client ID</span>
                <Image src="/i.svg" alt="Client ID Icon" width={17} height={13} />
              </div>
            }
            labelPlacement="outside"
            placeholder="Enter your client id"
            type="number"
            variant="bordered"
            radius="sm"
            size="lg"
          />

          <Button
            type="submit"
            isLoading={loading}
            className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
            radius="sm"
            size="lg"
            color="primary"
          >
            Create Account
          </Button>

          <div className="text-center text-sm w-full text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0047FF] font-medium underline">
              Sign In
            </Link>
          </div>
        </Form>
      </>
    </>
  );
}
