"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation"; // for redirect
import Cookies from "js-cookie";
// Inside the Layout component

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/login"); // replace with your login page route
  };
  // Sidebar content component to reuse in both desktop and mobile
  const SidebarContent = () => (
    <div
      className="flex flex-col h-full "
      style={{
        background: "linear-gradient(180deg, #00249E 0%, #264AC3 100%)",
        borderRadius: "0px 6px 6px 0px",
      }}
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <Image src="/sidebar_clock.svg" alt="clock" width={30} height={30} />
        <span className="text-xl font-semibold">Watchlytics</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-7">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              {/* <Home className="h-5 w-5" /> */}
              <Image
                src="/Home.svg"
                alt="clock"
                width={24}
                height={24}
                color="#CCCCCC"
              />
              <span className="text-[#CCCCCC]">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Image src="/Inventory.svg" alt="clock" width={24} height={24} />
              <span>Inventory</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Image src="/Report.svg" alt="clock" width={24} height={24} />
              <span>Reports</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Image
                src="/customer-class-line-svgrepo-com 1.svg"
                alt="clock"
                width={24}
                height={24}
              />
              <span>Customers</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Image
                src="/hugeicons_shipment-tracking.svg"
                alt="clock"
                width={24}
                height={24}
              />
              <span>Shipping</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Image
                src="/hugeicons_invoice-04.svg"
                alt="clock"
                width={24}
                height={24}
              />
              <span>Invoices</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Bottom menu */}
      <div className="p-4 mt-auto">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors bg-blue-800"
            >
              <Image src="/Settings.svg" alt="clock" width={24} height={24} />
              <span>Settings</span>
            </a>
          </li>
          <li>
            {/* <a
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Image src="/Log Out.svg" alt="clock" width={24} height={24} />
              <span>Log Out</span>
            </a> */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Image src="/Log Out.svg" alt="clock" width={24} height={24} />
              <span>Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-auto w-64 bg-blue-700 text-white z-50 transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block w-64 text-white flex-shrink-0 h-full">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header - Only visible on mobile */}
        <header className="bg-white p-4 flex justify-between items-center border-b shadow-sm md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-1 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </button>

          <div className="flex items-center">
            <span className="text-xl font-semibold">Watchlytics</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
              <img
                src="/profile.png"
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
