"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProvider } from "./AppContextProvider";
import ReactQueryProviders from "./reactQueryProviders";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <AppProvider>
          <ReactQueryProviders>
            {children}
          </ReactQueryProviders>
        </AppProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
