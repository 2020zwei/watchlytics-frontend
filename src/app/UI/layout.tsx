import Header from "@/components/common/Header";
import SideBarIrems from "@/components/common/SideBarIrems";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {


  return (
    <>
      <Header />
      <main className="xl:ps-[305px] ps-[245px] mt-[102px] pb-10 pe-6 pt-5">
        <SideBarIrems />
        {children}
      </main>
    </>
  );
}
