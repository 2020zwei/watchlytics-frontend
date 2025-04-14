// // "use client";

// // import { Button, Form, Input } from "@heroui/react";
// // import Image from "next/image";
// // import { FormEvent, useState } from "react";

// // // Define the type for the form submission data
// // type FormDataType = Record<string, string | FormDataEntryValue>;

// // export default function SignIn() {
// //   // State to store the form data
// //   const [submitted, setSubmitted] = useState<FormDataType | null>(null);

// //   // Handle form submission
// //   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     const data: FormDataType = Object.fromEntries(
// //       new FormData(e.currentTarget)
// //     ) as FormDataType;

// //     setSubmitted(data); // Save form data to state
// //   };

// //   return (
// //     <div className="flex flex-col md:flex-row h-screen w-full">
// //       {/* Left side with image - hidden on mobile */}
// //       <div className="hidden md:block md:w-1/2 bg-[#1a4dc0] bg-gradient-to-b from-[#1a4dc0] to-[#a7c1ff]">
// //         <Image
// //           src="/your-watch-image.jpg"
// //           alt="Citizen watches on blue background"
// //           width={500}
// //           height={500}
// //           className="object-contain p-4 w-full h-full"
// //         />
// //       </div>

// //       {/* Right side with sign in form */}
// //       <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
// //         {/* Logo and brand */}
// //         <div className="flex items-center mb-8">
// //           <div className="w-6 h-6 bg-[#0047FF] rounded-full flex items-center justify-center mr-2">
// //             <span className="text-white text-xs">⌚</span>
// //           </div>
// //           <span className="text-[#0047FF] font-bold tracking-wide">
// //             WATCHLYTICS
// //           </span>
// //         </div>
// //         <Button color="primary">Button</Button>
// //         {/* Sign in form */}
// //         <div className="w-full max-w-md">
// //           <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">Sign In</h1>
// //           <Form className="w-full " onSubmit={onSubmit}>
// //             <Input
// //               isRequired
// //               errorMessage={({ validationDetails, validationErrors }) => {
// //                 if (validationDetails.typeMismatch) {
// //                   return "Please enter a valid email address";
// //                 }

// //                 return validationErrors;
// //               }}
// //               label="Email"
// //               labelPlacement="outside"
// //               name="email"
// //               placeholder="Enter your email"
// //               type="email"
// //             />
// //             <Button color="primary" type="submit">
// //               Submit
// //             </Button>
// //             {submitted && (
// //               <div className="text-small text-default-500">
// //                 You submitted: <code>{JSON.stringify(submitted)}</code>
// //               </div>
// //             )}
// //           </Form>

// //           <div className="flex justify-between items-center mb-8">
// //             <div className="flex items-center">
// //               <input
// //                 type="checkbox"
// //                 id="remember"
// //                 className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //               />
// //               <label htmlFor="remember" className="text-gray-500 text-sm">
// //                 Remember me
// //               </label>
// //             </div>
// //             <a href="#" className="text-gray-400 text-sm">
// //               Forgot password?
// //             </a>
// //           </div>

// //           <button className="w-full bg-[#0047FF] text-white py-3 rounded font-medium hover:bg-blue-700 transition duration-200">
// //             Sign In
// //           </button>

// //           <div className="text-center mt-6 text-sm text-gray-600">
// //             Dont have an account?{" "}
// //             <a href="#" className="text-[#0047FF] font-medium">
// //               Sign In
// //             </a>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { Button, Checkbox, Form, Input } from "@heroui/react";
// import Image from "next/image";
// import { FormEvent, useState } from "react";

// // Type for form data
// type FormDataType = Record<string, string | FormDataEntryValue>;

// // Type for form validation errors
// type ValidationErrors = {
//   [key: string]: string | undefined;
// };

// export default function SignIn() {
//   const [submitted, setSubmitted] = useState<FormDataType | null>(null);
//   const [errors, setErrors] = useState<ValidationErrors>({});
//   const [password, setPassword] = useState<string>("");

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

//   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const data = Object.fromEntries(
//       new FormData(e.currentTarget)
//     ) as FormDataType;

//     const newErrors: ValidationErrors = {};

//     const passwordError = getPasswordError(data.password as string);
//     if (passwordError) {
//       newErrors.password = passwordError;
//     }

//     if (data.name === "admin") {
//       newErrors.name = "Nice try! Choose a different username";
//     }

//     if (data.terms !== "true") {
//       newErrors.terms = "Please accept the terms";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setErrors({});
//     setSubmitted(data);
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full">
//       {/* Left side with image - hidden on mobile */}
//       <div className="hidden md:block md:w-1/2 bg-[#1a4dc0] bg-gradient-to-b from-[#1a4dc0] to-[#a7c1ff]">
//         <Image
//           src="/your-watch-image.jpg"
//           alt="Citizen watches on blue background"
//           width={500}
//           height={500}
//           className="object-contain p-4 w-full h-full"
//         />
//       </div>

//       {/* Right side with sign in form */}
//       <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
//         {/* Logo and brand */}
//         <div className="flex items-center mb-8">
//           <div className="w-6 h-6 bg-[#0047FF] rounded-full flex items-center justify-center mr-2">
//             <span className="text-white text-xs">⌚</span>
//           </div>
//           <span className="text-[#0047FF] font-bold tracking-wide">
//             WATCHLYTICS
//           </span>
//         </div>

//         {/* Sign in form */}
//         <div className="w-full max-w-md">
//           <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">Sign In</h1>
//           <Form
//             className="w-full justify-center items-center space-y-4"
//             validationErrors={errors}
//             onReset={() => setSubmitted(null)}
//             onSubmit={onSubmit}
//           >
//             <div className="flex flex-col gap-4 w-full">
//               <Input
//                 isRequired
//                 errorMessage={({ validationDetails }) => {
//                   if (validationDetails.valueMissing) {
//                     return "Please enter your email";
//                   }
//                   if (validationDetails.typeMismatch) {
//                     return "Please enter a valid email address";
//                   }
//                   return undefined;
//                 }}
//                 label="Email"
//                 labelPlacement="outside"
//                 name="email"
//                 placeholder="Enter your email"
//                 type="email"
//               />

//               <Input
//                 isRequired
//                 errorMessage={getPasswordError(password)}
//                 isInvalid={getPasswordError(password) !== null}
//                 label="Password"
//                 labelPlacement="outside"
//                 name="password"
//                 placeholder="Enter your password"
//                 type="password"
//                 value={password}
//                 onValueChange={setPassword}
//               />

//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="remember"
//                     className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember" className="text-gray-500 text-sm">
//                     Remember me
//                   </label>
//                 </div>
//                 <a href="#" className="text-gray-400 text-sm">
//                   Forgot password?
//                 </a>
//               </div>
//               <div className="flex gap-4">
//                 <Button className="w-full" color="primary" type="submit">
//                   Sign In
//                 </Button>
//               </div>
//             </div>

//             {submitted && (
//               <div className="text-small text-default-500 mt-4">
//                 Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
//               </div>
//             )}
//             <div className="text-center mt-6 text-sm text-gray-600">
//               Don’t have an account?{" "}
//               <a href="#" className="text-[#0047FF] font-medium">
//                 Sign In
//               </a>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button, Checkbox, Form, Input } from "@heroui/react";
import Image from "next/image";
import { FormEvent, useState } from "react";

// Type for form data
type FormDataType = Record<string, string | FormDataEntryValue>;

export default function SignIn() {
  const [submitted, setSubmitted] = useState<FormDataType | null>(null);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello");
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as FormDataType;

    const newErrors: { [key: string]: Record<string, string> } = {};

    const passwordError = getPasswordError(data.password as string);
    if (passwordError) {
      newErrors.password = { message: passwordError };
    }

    // Check for a username value if it exists (example check)
    if (data.name === "admin") {
      newErrors.name = { message: "Nice try! Choose a different username" };
    }

    if (data.terms !== "true") {
      newErrors.terms = { message: "Please accept the terms" };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit data if no errors
    setErrors({});
    setSubmitted(data);
  };

  // onBlur handler for password to set field as touched
  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  return (
    // <div className="flex flex-col md:flex-row h-screen w-full">
    //   {/* Left side with image - hidden on mobile */}
    // <div className="hidden md:block md:w-1/2 bg-[#1a4dc0] bg-gradient-to-b from-[#1a4dc0] to-[#a7c1ff]">
    //   <Image
    //     src="/1.svg"
    //     alt="Citizen watches on blue background"
    //     width={500}
    //     height={500}
    //     className="object-contain p-4 w-full h-full"
    //   />
    //   {/* <Image
    //     src="/watch2.svg"
    //     alt="Citizen watches on blue background"
    //     width={500}
    //     height={500}
    //     className="object-contain p-4 w-full h-[22rem] z-50 relative ml-[11rem ]"
    //   /> */}
    // </div>

    //   {/* Right side with sign in form */}
    //   <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
    //     {/* Logo and brand */}
    //     <div className="flex items-center mb-8">
    //       <div className="w-6 h-6 bg-[#0047FF] rounded-full flex items-center justify-center mr-2">
    //         <span className="text-white text-xs">⌚</span>
    //       </div>
    //       <span className="text-[#0047FF] font-bold tracking-wide">
    //         WATCHLYTICS
    //       </span>
    //     </div>

    // {/* Sign in form */}
    // <div className="w-full max-w-md">
    //   <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">Sign In</h1>
    //   <Form
    //     className="w-full justify-center items-center space-y-4"
    //     validationErrors={errors}
    //     onReset={() => setSubmitted(null)}
    //     onSubmit={onSubmit}
    //   >
    //     <div className="flex flex-col gap-4 w-full">
    //       <Input
    //         isRequired
    //         errorMessage={({ validationDetails }) => {
    //           if (validationDetails.valueMissing) {
    //             return "Please enter your email";
    //           }
    //           if (validationDetails.typeMismatch) {
    //             return "Please enter a valid email address";
    //           }
    //           return undefined;
    //         }}
    //         label="Email"
    //         labelPlacement="outside"
    //         name="email"
    //         placeholder="Enter your email"
    //         type="email"
    //       />

    //       <Input
    //         isRequired
    //         errorMessage={
    //           passwordTouched
    //             ? getPasswordError(password) || undefined
    //             : undefined
    //         }
    //         isInvalid={
    //           passwordTouched && getPasswordError(password) !== null
    //         }
    //         label="Password"
    //         labelPlacement="outside"
    //         name="password"
    //         placeholder="Enter your password"
    //         type="password"
    //         value={password}
    //         onValueChange={setPassword}
    //         onBlur={handlePasswordBlur}
    //       />

    //       <div className="flex justify-between items-center mb-8">
    //         <div className="flex items-center">
    //           <Checkbox
    //             isSelected={isSelected}
    //             onValueChange={setIsSelected}
    //             size="sm"
    //             className="text-gray-500 text-sm"
    //           >
    //             Remember me
    //           </Checkbox>
    //         </div>
    //         <a href="#" className="text-gray-400 text-sm">
    //           Forgot password?
    //         </a>
    //       </div>
    //       <div className="flex gap-4">
    //         <Button className="w-full" color="primary" type="submit">
    //           Sign In
    //         </Button>
    //       </div>
    //     </div>

    //     {submitted && (
    //       <div className="text-small text-default-500 mt-4">
    //         Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
    //       </div>
    //     )}
    //     <div className="text-center mt-6 text-sm text-gray-600">
    //       Don’t have an account?{" "}
    //       <a href="#" className="text-[#0047FF] font-medium">
    //         Sign In
    //       </a>
    //     </div>
    //   </Form>
    // </div>
    //   </div>
    // </div>
    // <div className="grid grid-cols-3 h-[100vh] p-[1rem]">
    //   <div
    //     className=" hidden md:block md:w-full bg-[#1a4dc0] bg-gradient-to-b from-[#1a4dc0] to-[#a7c1ff]"
    //     style={{ borderRadius: "1rem", height: "97vh", width: "37.5rem" }}
    //   >
    //     <Image
    //       src="/1.svg"
    //       alt="Citizen watches on blue background"
    //       width={500}
    //       height={500}
    //       className="object-contain p-4 w-full h-full"
    //     />
    //   </div>
    //   {/* Sign in form */}
    //   <div className="w-full max-w-[31.25rem] m-auto col-span-2">
    //     <h1 className="text-[32px] font-bold mb-8 text-[#1E293B]">Sign In</h1>
    //     <Form
    //       className="w-full justify-center items-center space-y-4"
    //       validationErrors={errors}
    //       onReset={() => setSubmitted(null)}
    //       onSubmit={onSubmit}
    //     >
    //       <div className="flex flex-col gap-4 w-full">
    //         <Input
    //           isRequired
    //           errorMessage={({ validationDetails }) => {
    //             if (validationDetails.valueMissing) {
    //               return "Please enter your email";
    //             }
    //             if (validationDetails.typeMismatch) {
    //               return "Please enter a valid email address";
    //             }
    //             return undefined;
    //           }}
    //           label="Email"
    //           labelPlacement="outside"
    //           name="email"
    //           placeholder="Enter your email"
    //           type="email"
    //         />

    //         <Input
    //           isRequired
    //           errorMessage={
    //             passwordTouched
    //               ? getPasswordError(password) || undefined
    //               : undefined
    //           }
    //           isInvalid={passwordTouched && getPasswordError(password) !== null}
    //           label="Password"
    //           labelPlacement="outside"
    //           name="password"
    //           placeholder="Enter your password"
    //           type="password"
    //           value={password}
    //           onValueChange={setPassword}
    //           onBlur={handlePasswordBlur}
    //         />

    //         <div className="flex justify-between items-center mb-8">
    //           <div className="flex items-center">
    //             <Checkbox
    //               isSelected={isSelected}
    //               onValueChange={setIsSelected}
    //               size="sm"
    //               className="text-gray-500 text-sm"
    //             >
    //               Remember me
    //             </Checkbox>
    //           </div>
    //           <a href="#" className="text-gray-400 text-sm">
    //             Forgot password?
    //           </a>
    //         </div>
    //         <div className="flex gap-4">
    //           <Button className="w-full" color="primary" type="submit">
    //             Sign In
    //           </Button>
    //         </div>
    //       </div>

    //       {submitted && (
    //         <div className="text-small text-default-500 mt-4">
    //           Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
    //         </div>
    //       )}
    //       <div className="text-center mt-6 text-sm text-gray-600">
    //         Don’t have an account?{" "}
    //         <a href="#" className="text-[#0047FF] font-medium">
    //           Sign In
    //         </a>
    //       </div>
    //     </Form>
    //   </div>
    // </div>

    <div
      // className="container mx-auto grid grid-cols-1 md:grid-cols-3 p-4 "
      className="container mx-auto flex flex-col md:flex-row"
      style={{ paddingInline: "2rem" }}
    >
      <div className="w-[43.5%] py-2">
        {/* Left side image panel - only shows on medium and up */}
        <div
          className="relative hidden md:block rounded-xl h-screen"
          // style={{ width: "634px", height: "1008px" }}
        >
          <Image
            src="/test1.png"
            alt="Citizen watches on blue background"
            fill
            // className="object-contain w-full h-full p-4"
            style={{ objectFit: "inherit" }}
          />
        </div>
      </div>

      {/* Right side sign-in form */}
      <div className="w-full md:w-[56.5%] flex justify-center items-center">
        <div className="w-full max-w-xl mx-auto">
          <h1 className="text-[2.5rem] font-bold mb-8 text-[#1E293B]">
            Sign In
          </h1>
          <Form
            className="space-y-4"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-4 w-full">
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
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              {/* <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
              /> */}
              <Input
                isRequired
                errorMessage={
                  passwordTouched
                    ? getPasswordError(password) || undefined
                    : undefined
                }
                isInvalid={
                  passwordTouched && getPasswordError(password) !== null
                }
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onValueChange={setPassword}
                onBlur={handlePasswordBlur}
              />

              <div className="flex justify-between items-center mb-4">
                <Checkbox
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                  size="sm"
                  className="text-gray-500 text-sm"
                >
                  Remember me
                </Checkbox>
                <a href="#" className="text-gray-400 text-sm">
                  Forgot password?
                </a>
              </div>

              <Button className="w-full" color="primary" type="submit">
                Sign In
              </Button>

              {submitted && (
                <div className="text-small text-default-500 mt-4">
                  Submitted data:{" "}
                  <pre>{JSON.stringify(submitted, null, 2)}</pre>
                </div>
              )}

              <div className="text-center mt-6 text-sm text-gray-600">
                Don’t have an account?{" "}
                <a href="#" className="text-[#0047FF] font-medium">
                  Sign Up
                </a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
