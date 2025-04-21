import clsx from "clsx";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="lg:container lg:mx-auto flex flex-col md:flex-row md:gap-4 justify-center"
      style={{ paddingInline: "0.5rem" }}
    >
      <div className="lg:w-[33.5%]  py-2">
        <div
          style={{
            backgroundImage: `url("/test1.png")`
          }}
          className={clsx("bg-no-repeat bg-contain object-contain h-full w-full")}
        >
        </div>
      </div>

      {/* Right side sign-in form */}
      <div className="pt-5 flex-1">   {children}</div>
      <ToastContainer />
    </div>
  );
}
