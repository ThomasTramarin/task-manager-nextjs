"use client";
import { IoNotifications, IoMenu, IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Button } from "../../../src/components/ui/button";
import { useNavbarContext } from "../../contexts/NavbarContext";
import { navAppLinks } from "../../data/datasets/navbarLink";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function TopBarApp({ session }: any) {
  //Context
  const { appMenuOpen, setAppMenuOpen } = useNavbarContext();
  const [openProfile, setOpenProfile] = useState(false);
  console.log(session);
  //Toggle menu function
  const toggleMenu = () => {
    setAppMenuOpen(!appMenuOpen);
  };

  return (
    <nav className="h-16 fixed lg:w-[calc(100%-256px)] lg:justify-end w-full top-0 right-0 bg-background-2 flex items-center justify-between border-b border-[#484848] p-6 z-10">
      <Button
        size={"icon"}
        variant={"transparent"}
        aria-label="Toggle menu Button"
        onClick={toggleMenu}
        className="lg:hidden"
      >
        <IoMenu size={"icon"} color="white" />
      </Button>

      <Button
        size={"icon"}
        variant={"transparent"}
        aria-label="User Profile"
        className="border rounded-full"
        onClick={() => setOpenProfile(!openProfile)}
      ></Button>

      {openProfile && (
        <div className="bg-background-2 p-3 absolute top-16 right-8 rounded-lg text-gray shadow-xl">
          <h3 className="text-white font-medium">Profile</h3>
          <hr className="text-gray" />
          <div className="text-sm mt-1">{session.user.email}</div>
          <div className="text-sm mb-4">{session.user.username}</div>

          <Button
            onClick={() => signOut()}
            variant={"destructive"}
            size={"sm"}
            className="w-full dark:bg-purple hover:dark:bg-purple/80 dark:text-black"
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
