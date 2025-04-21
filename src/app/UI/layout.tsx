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
      <main className="xl:ps-[295px] ps-[235px] mt-[102px] pb-10">
        <SideBarIrems />
        {children}
      </main>
    </>
  );
}
