import clsx from "clsx";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden justify-between items-center">
      {/* Fixed Left Video Section */}
      <div className="w-full md:w-[50%] bg-black h-full hidden md:flex items-center justify-center p-2">
        <video
          src="https://nywatchmarket.com/wp-content/uploads/2025/01/1369230_Analogue_Attached_1920x1080.mp4?refresh=JLmrX&dontreplace"
          
          autoPlay
          loop
          muted
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Scrollable Right Form Section */}
      <div className="flex-1 overflow-y-auto h-screen flex justify-center px-5 py-10">
        <div className="w-full max-w-[560px]">{children}</div>
      </div>
    </div>
  );
}
