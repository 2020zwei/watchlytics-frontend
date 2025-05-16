"use client"
import Header from "@/components/common/Header";
import Icon from "@/components/common/Icon";
import SideBarIrems from "@/components/common/SideBarIrems";
import { useAppContext } from "@/providers/AppContextProvider";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isSidebarOpen, toggleSidebar } = useAppContext();

  const pathName = usePathname()
  useEffect(() => {
    toggleSidebar(false)
  }, [pathName])

  return (
    <>
      <header className={clsx("fixed start-0 top-0 z-40 border-b border-gray-20 bg-white min-h-[100px] right-0 flex items-center transition-all ease-in-out duration-700 xl:ps-[305px]  lg:ps-[245px] ps-6")}>
        <button className="lg:hidden block" onClick={() => toggleSidebar(true)}><Icon name='hamburger' size='1.4rem' /></button>
        <Header />
      </header>
      <main className={clsx(" mt-[102px] pb-5 pe-6 pt-5 transition-all ease-in-out duration-700 xl:ps-[305px]  lg:ps-[245px] ps-6")}>
        <aside className={clsx("start-0 scrollable top-0 bg-blue-gradient fixed px-4 xl:min-w-[280px] w-[220px] h-screen overflow-y-auto pb-8 z-50 transition-all ease-in-out duration-700 lg:translate-x-0 -translate-x-[300px]", isSidebarOpen ? "translate-x-0" : "")}>
          <button onClick={() => toggleSidebar(false)} className=' absolute right-3 z-50 top-3 lg:hidden'><Icon name='close' fill='#fff' size='1.4rem' /></button>
          <SideBarIrems />
        </aside>
        {children}
      </main>
    </>
  );
}
