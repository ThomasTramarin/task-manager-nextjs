"use client";
import { IoNotifications, IoMenu, IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Button } from "../../../src/components/ui/button";
import { useNavbarContext } from "../../contexts/NavbarContext";
import { navAppLinks } from "../../data/datasets/navbarLink";
import Link from "next/link";

export default function TopBarApp() {
  //Context
  const {appMenuOpen, setAppMenuOpen} = useNavbarContext();

  //Toggle menu function
  const toggleMenu = () => {
    setAppMenuOpen(!appMenuOpen);
  };


  return (
    <nav className="h-16 fixed lg:w-[calc(100%-256px)] w-full top-0 right-0 bg-background-2 flex items-center justify-between border-b border-[#484848] p-6 z-10">
      <Button
        size={"icon"}
        aria-label="Toggle menu Button"
        onClick={toggleMenu}
        className="lg:hidden"
      >
        <IoMenu size={"icon"} color="white" />
      </Button>

      <div className="flex items-center gap-5">
        <Button size={"iconSm"} aria-label="Notifications">
          <IoNotifications size={25} color="white" />
        </Button>
        <Button
          size={"icon"}
          aria-label="User"
          className="border rounded-full"
        ></Button>
      </div>
    </nav>
  );
}
