// "use client";

// import { Button, Checkbox, Form, Input } from "@heroui/react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { setCookie } from "cookies-next";
// import { useRouter } from "next/navigation";

// import { FormEvent, useState } from "react";
// import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
// import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";
// import Link from "next/link";
// import Image from "next/image";

// // Type for form data
// type FormDataType = Record<string, string | FormDataEntryValue>;

// interface IError {
//   api: {
//     [key: string]: Record<string, string>;
//   };
// }

// export default function SignIn() {
//   const router = useRouter();
//   const [submitted, setSubmitted] = useState<FormDataType | null>(null);
//   const [errors, setErrors] = useState<any>();
//   const [password, setPassword] = useState<string>("");
//   const [isSelected, setIsSelected] = useState<boolean>(false);
//   const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
//   const [isVisible, setIsVisible] = useState<boolean>(false); // State for password visibility

//   // Real-time password validation
//   const getPasswordError = (value: string): string | null => {
//     if (value.length < 4) {
//       return "Password must be 4 characters or more";
//     }
//     if ((value.match(/[A-Z]/g) || []).length < 1) {
//       return "Password needs at least 1 uppercase letter";
//     }
//     if ((value.match(/[^a-z]/gi) || []).length < 1) {
//       return "Password needs at least 1 symbol";
//     }
//     return null;
//   };
//   const toggleVisibility = () => {
//     setIsVisible(!isVisible); // Toggle visibility state
//   };
//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const data = Object.fromEntries(
//       new FormData(e.currentTarget)
//     ) as FormDataType;

//     const newErrors: { [key: string]: Record<string, string> } = {};

//     const passwordError = getPasswordError(data.password as string);
//     if (passwordError) {
//       newErrors.password = { message: passwordError };
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Clear errors and submit data if no errors
//     setErrors({});
//     setSubmitted(data);
//     try {
//       console.log("hellojjjjjjjj");
//       const response = await axios.post(
//         "https://api-dev.watchlytics.io/api/auth/signin/",
//         {
//           email: data.email,
//           password: data.password,
//         }
//       );

//       const result = response.data;
//       console.log(result, "result");
//       // ✅ Set access_token in cookie
//       setCookie("access_token", result.access_token, {
//         maxAge: 60 * 60 * 24 * 7, // 7 days
//         path: "/",
//       });
//       toast.success("Login Successfully  !", {
//         position: "top-right",
//       });
//       // ✅ Redirect to profile
//       router.push("/profile");

//       // Optional: handle token or redirect
//       console.log("Login successful:", result?.access_token);
//     } catch (error: any) {
//       console.log(error?.response?.data?.non_field_errors, "result");
//       toast.error(`Signin failed,${error?.response?.data?.non_field_errors}`, {
//         position: "top-right",
//       });
//       if (axios.isAxiosError(error)) {
//         setErrors(error?.response?.data?.non_field_errors || "Sign-in failed");
//         // setErrors({ api: { message: apiMessage } });
//       } else {
//         setErrors({ api: { message: "Unexpected error occurred" } });
//       }
//     }
//   };

//   // onBlur handler for password to set field as touched
//   const handlePasswordBlur = () => {
//     setPasswordTouched(true);
//   };

//   return (
//     <div className="w-full lg:w-[56.5%] flex justify-center items-center justify-center-center">
//       <div className="w-full max-w-xl mx-auto">
//         <div className="flex items-center mb-8">
//           <div className="w-6 h-6  rounded-full flex items-center justify-center mr-2">
//             <Image src="/clock.svg" alt="clock" width={48} height={48} />
//           </div>
//           <span className="text-[#003BFF] font-medium tracking-wide text-lg">
//             Watchlytics
//           </span>
//         </div>
//         <h1 className="text-[2.5rem] font-bold mb-8 text-[#1E293B]">Sign In</h1>

//         <Form
//           className="space-y-4"
//           validationErrors={errors}
//           onReset={() => setSubmitted(null)}
//           onSubmit={onSubmit}
//         >
//           <div className="flex flex-col gap-4 w-full">
//             <Input
//               isRequired
//               errorMessage={({ validationDetails }) => {
//                 if (validationDetails.valueMissing) {
//                   return "Please enter your email";
//                 }
//                 if (validationDetails.typeMismatch) {
//                   return "Please enter a valid email address";
//                 }
//                 return undefined;
//               }}
//               label="Email"
//               radius="sm"
//               size="lg"
//               labelPlacement="outside"
//               name="email"
//               placeholder="Enter your email"
//               type="email"
//               variant="bordered"
//             />

//             <Input
//               isRequired
//               variant="bordered"
//               radius="sm"
//               size="lg"
//               errorMessage={
//                 passwordTouched
//                   ? getPasswordError(password) || undefined
//                   : undefined
//               }
//               isInvalid={passwordTouched && getPasswordError(password) !== null}
//               label="Password"
//               labelPlacement="outside"
//               name="password"
//               placeholder="Enter your password"
//               value={password}
//               onValueChange={setPassword}
//               onBlur={handlePasswordBlur}
//               type={isVisible ? "text" : "password"}
//               endContent={
//                 <button
//                   className="focus:outline-none"
//                   type="button"
//                   onClick={toggleVisibility}
//                 >
//                   {!isVisible ? (
//                     <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                   ) : (
//                     <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                   )}
//                 </button>
//               }
//             />
//             {/* {JSON.stringify(errors)} */}
//             <div className="flex justify-between items-center mb-4">
//               <Checkbox
//                 isSelected={isSelected}
//                 onValueChange={setIsSelected}
//                 size="sm"
//                 className="text-gray-500 text-sm"
//               >
//                 Remember me
//               </Checkbox>
//               <a href="#" className="text-gray-400 text-sm">
//                 Forgot password?
//               </a>
//             </div>

//             <Button
//               radius="sm"
//               isLoading
//               size="lg"
//               color="primary"
//               type="submit"
//               className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
//             >
//               Sign In
//             </Button>

//             <div className="text-center mt-6 text-sm text-gray-600">
//               Don’t have an account?{" "}
//               <Link
//                 href="/sign-up"
//                 className="text-[#0047FF] font-medium underline"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button, Checkbox, Form, Input } from "@heroui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { FormEvent, useEffect, useState } from "react";
import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";
import Link from "next/link";
import Image from "next/image";

// Type for form data
type FormDataType = Record<string, string | FormDataEntryValue>;

export default function SignIn() {
  const router = useRouter();
  // const [submitted, setSubmitted] = useState<FormDataType | null>(null);
  const [errors, setErrors] = useState<any>();
  const [password, setPassword] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false); // Remember me checkbox state
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false); // State for password visibility
  const [loading, setLoading] = useState<boolean>(false); // New state for button loading

  // Real-time password validation
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as FormDataType;
    const newErrors: { [key: string]: Record<string, string> } = {};

    const passwordError = getPasswordError(data.password as string);
    if (passwordError) {
      newErrors.password = { message: passwordError };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit data if no errors
    setErrors({});
    // setSubmitted(data);

    // Set loading state to true when API call begins
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
      if (isSelected) {
        setCookie("access_token", result.access_token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
      } else {
        setCookie("access_token", result.access_token, {
          path: "/",
        });
      }

      toast.success("Login Successfully!", {
        position: "top-right",
      });
      localStorage.setItem("isLoggedin", "true")
      if (!result?.is_subscribed) {
        router.push("/subscription");
      }
      else {
        router.push("/profile");
      }

    } catch (error: any) {
      toast.error(`Signin failed, ${error?.response?.data?.non_field_errors}`, {
        position: "top-right",
      });
      if (axios.isAxiosError(error)) {
        setErrors(error?.response?.data?.non_field_errors || "Sign-in failed");
      } else {
        setErrors({ api: { message: "Unexpected error occurred" } });
      }
    } finally {
      // Reset loading state once API call is complete
      setLoading(false);
    }
  };

  // onBlur handler for password to set field as touched
  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };
  const logout = async () => {
    await fetch('/api/logout/')
  }
  useEffect(() => {
    // logout()
  }, [])

  return (
    <div className="flex justify-center items-center justify-center-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2">
            <Image src="/clock.svg" alt="clock" width={48} height={48} />
          </div>
          <span className="text-[#003BFF] font-medium tracking-wide text-lg">
            Watchlytics
          </span>
        </div>
        <h1 className="text-[2.5rem] font-bold mb-8 text-[#1E293B]">Sign In</h1>

        <Form
          validationErrors={errors}
          // onReset={() => setSubmitted(null)}
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-4 md:w-[28rem] w-full">
            <Input
              isRequired
              errorMessage={({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your email";
                }
                if (validationDetails.typeMismatch) {
                  return "Please enter a valid email address";
                }
                return undefined;
              }}
              label="Email"
              radius="sm"
              size="lg"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
            />

            <Input
              isRequired
              variant="bordered"
              radius="sm"
              size="lg"
              errorMessage={
                passwordTouched
                  ? getPasswordError(password) || undefined
                  : undefined
              }
              isInvalid={passwordTouched && getPasswordError(password) !== null}
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
              onBlur={handlePasswordBlur}
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
            {/* {JSON.stringify(errors)} */}
            <div className="flex justify-between items-center mb-4">
              <Checkbox
                isSelected={isSelected}
                onValueChange={setIsSelected}
                size="sm"
                className="text-gray-500 text-sm"
              >
                Remember me
              </Checkbox>

              <Link href="/forgot-password " className="text-gray-500 text-sm">
                Forgot password?
              </Link>
            </div>

            <Button
              radius="sm"
              isLoading={loading} // Button loading state managed here
              size="lg"
              color="primary"
              type="submit"
              className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
            >
              Sign In
            </Button>

            <div className="text-center w-full text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[#0047FF] font-medium underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
