"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProvider } from "./AppContextProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <AppProvider>
          {children}
        </AppProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
