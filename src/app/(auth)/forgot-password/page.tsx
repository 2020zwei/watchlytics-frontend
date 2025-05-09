// "use client";

// import { Button, Input, Form } from "@heroui/react";
// import axios from "axios";
// import Image from "next/image";
// import { FormEvent, useState } from "react";
// import { toast } from "react-toastify";

// type FormDataType = Record<string, string>;

// export default function SignIn() {
//   const [errors, setErrors] = useState<any>({});
//   const [submitted, setSubmitted] = useState<FormDataType | null>(null);
//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Convert form data into an object of type FormDataType
//     const data = Object.fromEntries(
//       new FormData(e.currentTarget)
//     ) as FormDataType;
//     const newErrors: { [key: string]: { message: string } } = {};

//     // --- Validate Email ---
//     const email = data.email ? data.email.trim() : "";
//     if (!email) {
//       newErrors.email = { message: "Please enter your email address" };
//     }
//     // Additional regex checks can be uncommented if needed
//     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     // if (email && !emailRegex.test(email)) {
//     //   newErrors.email = { message: "Please enter a valid email address" };
//     // }

//     // If validation fails, update error state and stop further processing.
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Clear errors and process the submission
//     setErrors({});
//     setSubmitted(data);

//     try {
//       // Make the API call to the forgot-password endpoint with the email payload.
//       const response = await axios.post(
//         "https://api-dev.watchlytics.io/api/auth/forgot-password/",
//         { email }
//       );
//       const result = response.data;
//       console.log("Forgot Password Response:", result);

//       // Show a success notification (using toast or any notification lib)
//       toast.success("Reset password email sent successfully!", {
//         position: "top-right",
//       });
//     } catch (error: any) {
//       console.error(
//         "Error during forgot password request:",
//         error?.response?.data?.non_field_errors
//       );

//       // Show an error notification
//       toast.error(`${error?.response?.data?.non_field_errors}`, {
//         position: "top-right",
//       });

//       // Update error state with API error details
//       if (axios.isAxiosError(error)) {
//         setErrors(error?.response?.data?.non_field_errors);
//       } else {
//         setErrors({ api: { message: "Unexpected error occurred" } });
//       }
//     }
//   };

//   return (
//     <div className="w-full md:w-[56.5%] flex justify-center items-center">
//       <div className="w-full max-w-xl mx-auto">
//         <div className="">
//           {/* Logo and brand */}
//           <div className="flex items-center mb-8">
//             <div className="w-6 h-6 bg-[#0047FF] rounded-full flex items-center justify-center mr-2">
//               <span className="text-white text-xs">⌚</span>
//             </div>
//             <span className="text-[#0047FF] font-bold tracking-wide">
//               WATCHLYTICS
//             </span>
//           </div>

//           {/* Forgot Password Form */}
//           <div className="w-full max-w-md">
//             <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">
//               Forgot Password?
//             </h1>
//             <Form
//               className="w-full justify-center items-center space-y-4"
//               validationErrors={errors}
//               onReset={() => setSubmitted(null)}
//               onSubmit={onSubmit}
//             >
//               <Input
//                 isRequired
//                 variant="bordered"
//                 radius="sm"
//                 size="lg"
//                 errorMessage={({ validationDetails }) => {
//                   if (errors.email) {
//                     return errors.email.message;
//                   }
//                   if (validationDetails.valueMissing) {
//                     return "Please enter your email address";
//                   }
//                   if (validationDetails.typeMismatch) {
//                     return "Please enter a valid email address";
//                   }
//                   return undefined;
//                 }}
//                 label="Email"
//                 labelPlacement="outside"
//                 name="email"
//                 placeholder="Enter your e-mail"
//                 type="email"
//               />

//               <Button
//                 radius="sm"
//                 size="lg"
//                 className="w-full"
//                 color="primary"
//                 type="submit"
//               >
//                 Continue
//               </Button>
//             </Form>

//             {errors && (
//               <div className="text-small text-red-500">
//                 {JSON.stringify(errors)}
//               </div>
//             )}
//           </div>
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

type FormDataType = Record<string, string>;

export default function SignIn() {
  const [errors, setErrors] = useState<any>({});
  // const [submitted, setSubmitted] = useState<FormDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handler to clear email error when the user types in the email field
  const handleEmailChange = () => {
    if (errors.email) {
      setErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert form data into an object
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as FormDataType;
    const newErrors: { [key: string]: { message: string } } = {};

    // --- Validate Email ---
    const email = data.email ? data.email.trim() : "";
    if (!email) {
      newErrors.email = { message: "Please enter your email address" };
    } else {
      // Basic regex pattern for validating an email address
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = { message: "Please enter a valid email address" };
      }
    }

    // If validation fails, update error state and stop further processing.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and process the submission
    setErrors({});
    // setSubmitted(data);
    setLoading(true);
    try {
      // Make the API call to the forgot-password endpoint with the email payload.
      const response = await axios.post(
        "https://api-dev.watchlytics.io/api/auth/forgot-password/",
        { email }
      );
      const result = response.data;

      // Show a success notification
      toast.success("Reset password email sent successfully!", {
        position: "top-right",
      });
    } catch (error: any) {
      console.error(
        "Error during forgot password request:",
        error?.response?.data?.non_field_errors
      );

      // Show an error notification
      toast.error(`${error?.response?.data?.non_field_errors}`, {
        position: "top-right",
      });

      if (axios.isAxiosError(error)) {
        // Set errors under the email key so it displays below the email input.
        setErrors({ email: error?.response?.data?.non_field_errors });
      } else {
        setErrors({ api: { message: "Unexpected error occurred" } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="">
          {/* Logo and brand */}
          <div className="flex items-center mb-8">
            <div className="w-6 h-6  rounded-full flex items-center justify-center mr-2">
              <Image src="/clock.svg" alt="clock" width={48} height={48} />
            </div>
            <span className="text-[#003BFF] font-medium tracking-wide text-lg">
              Watchlytics
            </span>
          </div>

          {/* Forgot Password Form */}
          <div className="w-full max-w-md">
            <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">
              Forgot Password?
            </h1>
            <Form
              className="w-full justify-center items-center space-y-4"
              validationErrors={errors}
              // onReset={() => setSubmitted(null)}
              onSubmit={onSubmit}
            >
              <Input
                isRequired
                variant="bordered"
                radius="sm"
                size="lg"
                onChange={handleEmailChange}
                errorMessage={({ validationDetails }) => {
                  if (errors.email) {
                    // Check if errors.email is an object with a "message" property.
                    return (
                      (typeof errors.email === "object" &&
                        errors.email.message) ||
                      errors.email
                    );
                  }
                  if (validationDetails.valueMissing) {
                    return "Please enter your email address";
                  }
                  if (validationDetails.typeMismatch) {
                    return "Please enter a valid email address";
                  }
                  return undefined;
                }}
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your e-mail"
                type="email"
              />

              <Button
                isLoading={loading}
                radius="sm"
                size="lg"
                color="primary"
                type="submit"
                className="w-full text-white bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
              >
                Continue
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
