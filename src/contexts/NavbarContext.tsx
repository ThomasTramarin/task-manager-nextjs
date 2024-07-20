"use client";
import { createContext, useState, ReactNode, useContext } from "react";
import { NavbarContextProps } from "../data/types/navbarTypes";

export const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [homeMenuOpen, setHomeMenuOpen] = useState<boolean>(false);
  const [appMenuOpen, setAppMenuOpen] = useState<boolean>(false);

  return (
    <NavbarContext.Provider value={{ homeMenuOpen, appMenuOpen, setHomeMenuOpen, setAppMenuOpen }}>
      {children}
    </NavbarContext.Provider>
  );
};

export function useNavbarContext(){
    const context = useContext(NavbarContext);
    if(context === undefined){
      throw new Error("Use context not found")
    }
    return context;
}