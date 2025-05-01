"use client";

import { USER } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
    isSidebarOpen: boolean;
    user: USER | null;
    toggleSidebar: (value: boolean) => void;
    setIsSidebarOpen: (value: boolean) => void;
    setCurrentUser: (value: USER | null) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setCurrentUser] = useState<USER | null>(null);

    const toggleSidebar = (value: boolean) => {
        setIsSidebarOpen(value);
    };

    return (
        <AppContext.Provider
            value={{
                isSidebarOpen,
                setIsSidebarOpen,
                user,
                setCurrentUser,
                toggleSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
