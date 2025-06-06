// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Providers } from "./providers";
// import "react-toastify/dist/ReactToastify.css";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { Providers } from "./providers";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";


const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Watchlytics",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={clsx("antialiased", archivo.variable,inter.variable)}
      >
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
