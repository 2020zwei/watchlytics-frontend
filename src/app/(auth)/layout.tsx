import Image from "next/image";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      // className="container mx-auto grid grid-cols-1 md:grid-cols-3 p-4 " or h-
      className="lg:container lg:mx-auto flex flex-col md:flex-row md:gap-4 h-[100vh] justify-center"
      style={{ paddingInline: "0.5rem" }}
    >
      <div className="lg:w-[33.5%]  py-2">
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
      {children}
      <ToastContainer />
    </div>
  );
}
