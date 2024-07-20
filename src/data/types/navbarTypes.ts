import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

//Nav Context props
export interface NavbarContextProps {
  homeMenuOpen: boolean;
  appMenuOpen: boolean;
  setHomeMenuOpen: Dispatch<SetStateAction<boolean>>;
  setAppMenuOpen: Dispatch<SetStateAction<boolean>>;
}

//Siedebar app link
export interface SidebarLink {
  id: number;
  text: string;
  href: string;
  icon: IconType;
}
