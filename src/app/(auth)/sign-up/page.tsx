// "use client";

// import { Button, Input, Form } from "@heroui/react";
// import axios from "axios";
// import Image from "next/image";
// import { FormEvent, useState } from "react";
// import { toast } from "react-toastify";
// import { EyeFilledIcon } from "../../../components/icon/EyeFilledIcon";
// import { EyeSlashFilledIcon } from "../../../components/icon/EyeSlashFilledIcon";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// type FormDataType = Record<string, string | FormDataEntryValue>;

// export default function Signup() {
//   const [submitted, setSubmitted] = useState<FormDataType | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errors, setErrors] = useState<any>({});
//   const [password, setPassword] = useState<string>("");
//   const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const router = useRouter();
//   // State for password visibility
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

//   // New handler to update password and clear any previous password errors.
//   const handlePasswordChange = (value: string) => {
//     setPassword(value);
//     // If there's an error for the password field, remove it.
//     if (errors.password) {
//       setErrors((prevErrors: any) => {
//         const newErrors = { ...prevErrors };
//         delete newErrors.password;
//         return newErrors;
//       });
//     }
//   };

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible); // Toggle visibility state
//   };

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Submitting form for signup");

//     // Convert form data into an object
//     const data = Object.fromEntries(
//       new FormData(e.currentTarget)
//     ) as FormDataType;
//     const newErrors: { [key: string]: Record<string, string> } = {};

//     // --- Validate Full Name ---
//     const nameValue = data.name ? (data.name as string).trim() : "";
//     if (!nameValue) {
//       newErrors.name = { message: "Please enter your full name" };
//     } else if (/^\d/.test(nameValue)) {
//       newErrors.name = { message: "User name should not start with a number" };
//     } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
//       newErrors.name = {
//         message: "Full name can only contain alphabets and spaces",
//       };
//     }

//     // --- Validate Email ---
//     const emailValue = data.email ? (data.email as string).trim() : "";
//     if (!emailValue) {
//       newErrors.email = { message: "Please enter your email address" };
//     }
//     // --- Validate Client ID ---
//     const clientIdValue = data.clientId ? (data.clientId as string).trim() : "";
//     if (!clientIdValue) {
//       newErrors.clientId = { message: "Please enter your client id" };
//     } else if (isNaN(Number(clientIdValue))) {
//       newErrors.clientId = { message: "Client id must be a number" };
//     }

//     // --- Validate Password ---
//     const passwordError = getPasswordError(data.password as string);
//     if (passwordError) {
//       newErrors.password = { message: passwordError };
//     }

//     // If there are any errors, update the error state and exit.
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Clear errors and set submitted data if no errors.
//     setErrors({});
//     setSubmitted(data);

//     // Prepare the payload: the API expects email, password, first_name (using the full name) and lastname.
//     const payload = {
//       email: data.email,
//       password: data.password,
//       first_name: data.name,
//       lastname: "",
//     };
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://api-dev.watchlytics.io/api/auth/signup/",
//         payload
//       );
//       const result = response.data;
//       console.log("Signup successful:", result);

//       toast.success("Signup Successful!", { position: "top-right" });
//       router.push("/login");
//     } catch (error: any) {
//       toast.error("Signup failed!", { position: "top-right" });
//       if (axios.isAxiosError(error)) {
//         setErrors(error?.response?.data?.errors);
//       }
//     } finally {
//       // Reset loading state once API call is complete
//       setLoading(false);
//     }
//   };

//   const handlePasswordBlur = () => {
//     setPasswordTouched(true);
//   };

//   return (
//     <div className="w-full md:w-[56.5%] flex justify-center items-center">
//       <div className="w-full max-w-xl mx-auto">
//         <div className="flex items-center mb-8">
//           <div className="w-6 h-6  rounded-full flex items-center justify-center mr-2">
//             <Image src="/clock.svg" alt="clock" width={48} height={48} />
//           </div>
//           <span className="text-[#003BFF] font-medium tracking-wide text-lg">
//             Watchlytics
//           </span>
//         </div>
//         <div className="w-full max-w-lg">
//           <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">
//             Create Account
//           </h1>
//           <Form
//             className="w-full justify-center items-center space-y-4"
//             validationErrors={errors}
//             onReset={() => setSubmitted(null)}
//             onSubmit={onSubmit}
//           >
//             <div className="flex flex-col gap-4 md:w-[28rem] w-full">
//               <Input
//                 isRequired
//                 errorMessage={({ validationDetails }) => {
//                   if (errors.name) {
//                     return errors.name.message;
//                   }
//                   if (validationDetails.valueMissing) {
//                     return "Please enter your full name";
//                   }
//                 }}
//                 label="Full Name"
//                 labelPlacement="outside"
//                 name="name"
//                 placeholder="Enter your full name"
//                 type="text"
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//               />

//               <Input
//                 isRequired
//                 errorMessage={({ validationDetails }) => {
//                   if (errors.email) {
//                     return errors.email;
//                   }
//                   if (validationDetails.valueMissing) {
//                     return "Please enter your email";
//                   }
//                   if (validationDetails.typeMismatch) {
//                     return "Please enter a valid email address";
//                   }
//                 }}
//                 label="Email"
//                 labelPlacement="outside"
//                 name="email"
//                 placeholder="Enter your email"
//                 type="email"
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//               />

//               <Input
//                 isRequired
//                 errorMessage={
//                   passwordTouched
//                     ? errors.password
//                       ? errors.password
//                       : getPasswordError(password) || ""
//                     : ""
//                 }
//                 isInvalid={
//                   passwordTouched &&
//                   (getPasswordError(password) !== null || !!errors.password)
//                 }
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//                 label="Password"
//                 labelPlacement="outside"
//                 name="password"
//                 placeholder="Enter your password"
//                 type={isVisible ? "text" : "password"} // Toggle between text and password type
//                 value={password}
//                 onValueChange={handlePasswordChange}
//                 onBlur={handlePasswordBlur}
//                 endContent={
//                   <button
//                     className="focus:outline-none"
//                     type="button"
//                     onClick={toggleVisibility}
//                   >
//                     {!isVisible ? (
//                       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                     ) : (
//                       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                     )}
//                   </button>
//                 }
//               />
//               {/* Client ID input field added */}
//               <Input
//                 isRequired
//                 errorMessage={({ validationDetails }) => {
//                   if (errors.clientId) {
//                     return errors.clientId.message;
//                   }
//                   if (validationDetails.valueMissing) {
//                     return "Please enter your client id";
//                   }
//                 }}
//                 label="Client ID"
//                 labelPlacement="outside"
//                 name="clientId"
//                 placeholder="Enter your client id"
//                 type="number"
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//               />
//               <div className="flex gap-4">
//                 <Button
//                   radius="sm"
//                   size="lg"
//                   isLoading={loading}
//                   className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
//                   color="primary"
//                   type="submit"
//                 >
//                   Create Account
//                 </Button>
//               </div>
//             </div>
//             <div className="text-center mt-6 text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 href="/login"
//                 className="text-[#0047FF] font-medium underline"
//               >
//                 Sign In
//               </Link>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { Button, Input, Form } from "@heroui/react";
// import axios from "axios";
// import Image from "next/image";
// import { FormEvent, useState } from "react";
// import { toast } from "react-toastify";
// import { EyeFilledIcon } from "../../../components/icon/EyeFilledIcon";
// import { EyeSlashFilledIcon } from "../../../components/icon/EyeSlashFilledIcon";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// type FormDataType = Record<string, string | FormDataEntryValue>;

// export default function Signup() {
//   const [submitted, setSubmitted] = useState<FormDataType | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errors, setErrors] = useState<any>({});
//   const [password, setPassword] = useState<string>("");
//   const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const router = useRouter();

//   // Validate password according to given rules.
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

//   // New handler to update password and clear any previous password errors.
//   const handlePasswordChange = (value: string) => {
//     setPassword(value);
//     // Remove previous error for the password field if it exists.
//     if (errors.password) {
//       setErrors((prevErrors: any) => {
//         const newErrors = { ...prevErrors };
//         delete newErrors.password;
//         return newErrors;
//       });
//     }
//   };

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible); // Toggle visibility state
//   };

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Submitting form for signup");

//     // Convert form data into an object
//     const data = Object.fromEntries(
//       new FormData(e.currentTarget)
//     ) as FormDataType;
//     const newErrors: { [key: string]: Record<string, string> } = {};

//     // --- Validate Full Name ---
//     const nameValue = data.name ? (data.name as string).trim() : "";
//     if (!nameValue) {
//       newErrors.name = { message: "Please enter your full name" };
//     } else if (/^\d/.test(nameValue)) {
//       newErrors.name = { message: "User name should not start with a number" };
//     } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
//       newErrors.name = {
//         message: "Full name can only contain alphabets and spaces",
//       };
//     }

//     // --- Validate Email ---
//     const emailValue = data.email ? (data.email as string).trim() : "";
//     if (!emailValue) {
//       newErrors.email = { message: "Please enter your email address" };
//     }

//     // --- Validate Client ID ---
//     const clientIdValue = data.clientId ? (data.clientId as string).trim() : "";
//     if (!clientIdValue) {
//       newErrors.clientId = { message: "Please enter your client id" };
//     } else if (isNaN(Number(clientIdValue))) {
//       newErrors.clientId = { message: "Client id must be a number" };
//     }

//     // --- Validate Password ---
//     const passwordError = getPasswordError(data.password as string);
//     if (passwordError) {
//       newErrors.password = { message: passwordError };
//     }

//     // If there are any errors, update the error state and exit.
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Clear errors and set submitted data if no errors.
//     setErrors({});
//     setSubmitted(data);

//     // Prepare the payload: the API expects email, password, first_name (using the full name), lastname, and now client_id.
//     const payload = {
//       email: data.email,
//       password: data.password,
//       first_name: data.name,
//       lastname: "",
//       client_id: Number(data.clientId), // Sending client id as a number.
//     };
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://api-dev.watchlytics.io/api/auth/signup/",
//         payload
//       );
//       const result = response.data;
//       console.log("Signup successful:", result);

//       toast.success("Signup Successful!", { position: "top-right" });
//       router.push("/login");
//     } catch (error: any) {
//       toast.error("Signup failed!", { position: "top-right" });
//       if (axios.isAxiosError(error)) {
//         setErrors(error?.response?.data?.errors);
//       }
//     } finally {
//       // Reset loading state once API call is complete
//       setLoading(false);
//     }
//   };

//   const handlePasswordBlur = () => {
//     setPasswordTouched(true);
//   };

//   return (
//     <div className="w-full md:w-[56.5%] flex justify-center items-center">
//       <div className="w-full max-w-xl mx-auto">
//         <div className="flex items-center mb-8">
//           <div className="w-6 h-6  rounded-full flex items-center justify-center mr-2">
//             <Image src="/clock.svg" alt="clock" width={48} height={48} />
//           </div>
//           <span className="text-[#003BFF] font-medium tracking-wide text-lg">
//             Watchlytics
//           </span>
//         </div>
//         <div className="w-full max-w-lg">
//           <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">
//             Create Account
//           </h1>
//           <Form
//             className="w-full justify-center items-center space-y-4"
//             validationErrors={errors}
//             onReset={() => setSubmitted(null)}
//             onSubmit={onSubmit}
//           >
//             <div className="flex flex-col gap-4 md:w-[28rem] w-full">
//               <Input
//                 isRequired
//                 errorMessage={({ validationDetails }) => {
//                   if (errors.name) {
//                     return errors.name.message;
//                   }
//                   if (validationDetails.valueMissing) {
//                     return "Please enter your full name";
//                   }
//                 }}
//                 label="Full Name"
//                 labelPlacement="outside"
//                 name="name"
//                 placeholder="Enter your full name"
//                 type="text"
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//               />

//               <Input
//                 isRequired
//                 errorMessage={({ validationDetails }) => {
//                   if (errors.email) {
//                     return errors.email;
//                   }
//                   if (validationDetails.valueMissing) {
//                     return "Please enter your email";
//                   }
//                   if (validationDetails.typeMismatch) {
//                     return "Please enter a valid email address";
//                   }
//                 }}
//                 label="Email"
//                 labelPlacement="outside"
//                 name="email"
//                 placeholder="Enter your email"
//                 type="email"
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//               />

//               <Input
//                 isRequired
//                 errorMessage={
//                   passwordTouched
//                     ? errors.password
//                       ? errors.password
//                       : getPasswordError(password) || ""
//                     : ""
//                 }
//                 isInvalid={
//                   passwordTouched &&
//                   (getPasswordError(password) !== null || !!errors.password)
//                 }
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//                 label="Password"
//                 labelPlacement="outside"
//                 name="password"
//                 placeholder="Enter your password"
//                 type={isVisible ? "text" : "password"}
//                 value={password}
//                 onValueChange={handlePasswordChange}
//                 onBlur={handlePasswordBlur}
//                 endContent={
//                   <button
//                     className="focus:outline-none"
//                     type="button"
//                     onClick={toggleVisibility}
//                   >
//                     {!isVisible ? (
//                       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                     ) : (
//                       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//                     )}
//                   </button>
//                 }
//               />
//               {/* Client ID input field added */}
//               <Input
//                 // isRequired
//                 errorMessage={({ validationDetails }) => {
//                   if (errors.clientId) {
//                     return errors.clientId.message;
//                   }
//                   if (validationDetails.valueMissing) {
//                     return "Please enter your client id";
//                   }
//                 }}
//                 // label="Client ID"
//                 label={
//                   <div className="flex items-center top-[1.5625rem] gap-1 justify-between">
//                     <span>Client ID</span>
//                     <Image
//                       src="/i.svg" // Update with your icon path
//                       alt="Client ID Icon"
//                       width={17}
//                       height={13}
//                       className="mr-2"
//                     />
//                   </div>
//                 }
//                 labelPlacement="outside"
//                 name="clientId"
//                 placeholder="Enter your client id"
//                 type="number"
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//               />
//               <div className="flex gap-4">
//                 <Button
//                   radius="sm"
//                   size="lg"
//                   isLoading={loading}
//                   className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
//                   color="primary"
//                   type="submit"
//                 >
//                   Create Account
//                 </Button>
//               </div>
//             </div>
//             <div className="text-center mt-6 text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 href="/login"
//                 className="text-[#0047FF] font-medium underline"
//               >
//                 Sign In
//               </Link>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button, Input, Form } from "@heroui/react";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { EyeFilledIcon } from "../../../components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../components/icon/EyeSlashFilledIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormDataType = Record<string, string | FormDataEntryValue>;

export default function Signup() {
  // const [submitted, setSubmitted] = useState<FormDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [password, setPassword] = useState<string>("");
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [clientId, setClientId] = useState<string>("");
  const [clientIdError, setClientIdError] = useState<string | null>(null);
  const router = useRouter();

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

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  const handleClientIdChange = (value: string) => {
    setClientId(value);
    if (!/^\d{8,10}$/.test(value)) {
      setClientIdError("Client ID must be 8 to 10 digits");
    } else {
      setClientIdError(null);
    }

    if (errors.clientId) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.clientId;
        return newErrors;
      });
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form for signup");

    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as FormDataType;
    const newErrors: { [key: string]: Record<string, string> } = {};

    const nameValue = data.name ? (data.name as string).trim() : "";
    if (!nameValue) {
      newErrors.name = { message: "Please enter your full name" };
    } else if (/^\d/.test(nameValue)) {
      newErrors.name = { message: "User name should not start with a number" };
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      newErrors.name = {
        message: "Full name can only contain alphabets and spaces",
      };
    }

    const emailValue = data.email ? (data.email as string).trim() : "";
    if (!emailValue) {
      newErrors.email = { message: "Please enter your email address" };
    }

    const clientIdValue = data.clientId ? (data.clientId as string).trim() : "";
    if (!clientIdValue) {
      newErrors.clientId = { message: "Please enter your client id" };
    } else if (!/^\d{8,10}$/.test(clientIdValue)) {
      newErrors.clientId = { message: "Client ID must be 8 to 10 digits" };
    }

    const passwordError = getPasswordError(data.password as string);
    if (passwordError) {
      newErrors.password = { message: passwordError };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // setSubmitted(data);

    const payload = {
      email: data.email,
      password: data.password,
      first_name: data.name,
      lastname: "",
      client_id: Number(data.clientId),
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api-dev.watchlytics.io/api/auth/signup/",
        payload
      );
      const result = response.data;
      console.log("Signup successful:", result);

      toast.success("Signup Successful!", { position: "top-right" });
      router.push("/login");
    } catch (error: any) {
      toast.error("Signup failed!", { position: "top-right" });
      if (axios.isAxiosError(error)) {
        setErrors(error?.response?.data?.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  return (
    <div className="w-full md:w-[56.5%] flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-6 h-6  rounded-full flex items-center justify-center mr-2">
            <Image src="/clock.svg" alt="clock" width={48} height={48} />
          </div>
          <span className="text-[#003BFF] font-medium tracking-wide text-lg">
            Watchlytics
          </span>
        </div>
        <div className="w-full max-w-lg">
          <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">
            Create Account
          </h1>
          <Form
            className="w-full justify-center items-center space-y-4"
            validationErrors={errors}
            // onReset={() => setSubmitted(null)}
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-4 md:w-[28rem] w-full">
              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (errors.name) {
                    return errors.name.message;
                  }
                  if (validationDetails.valueMissing) {
                    return "Please enter your full name";
                  }
                }}
                label="Full Name"
                labelPlacement="outside"
                name="name"
                placeholder="Enter your full name"
                type="text"
                variant="bordered"
                radius="sm"
                size="lg"
              />

              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (errors.email) {
                    return errors.email;
                  }
                  if (validationDetails.valueMissing) {
                    return "Please enter your email";
                  }
                  if (validationDetails.typeMismatch) {
                    return "Please enter a valid email address";
                  }
                }}
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
                radius="sm"
                size="lg"
              />

              <Input
                isRequired
                errorMessage={
                  passwordTouched
                    ? errors.password
                      ? errors.password
                      : getPasswordError(password) || ""
                    : ""
                }
                isInvalid={
                  passwordTouched &&
                  (getPasswordError(password) !== null || !!errors.password)
                }
                variant="bordered"
                radius="sm"
                size="lg"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                value={password}
                onValueChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
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
                // isRequired
                name="clientId"
                value={clientId}
                onValueChange={handleClientIdChange}
                errorMessage={
                  clientIdError ||
                  (errors.clientId ? errors.clientId.message : undefined)
                }
                isInvalid={!!clientIdError || !!errors.clientId}
                label={
                  <div className="flex items-center top-[1.5625rem] gap-1 justify-between">
                    <span>Client ID</span>
                    <Image
                      src="/i.svg"
                      alt="Client ID Icon"
                      width={17}
                      height={13}
                      className="mr-2"
                    />
                  </div>
                }
                labelPlacement="outside"
                placeholder="Enter your client id"
                type="number"
                variant="bordered"
                radius="sm"
                size="lg"
              />

              <div className="flex gap-4">
                <Button
                  radius="sm"
                  size="lg"
                  isLoading={loading}
                  className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
                  color="primary"
                  type="submit"
                >
                  Create Account
                </Button>
              </div>
            </div>
            <div className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#0047FF] font-medium underline"
              >
                Sign In
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
