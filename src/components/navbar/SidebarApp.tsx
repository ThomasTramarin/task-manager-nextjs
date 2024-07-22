"use client";
import { useNavbarContext } from "../../contexts/NavbarContext";
import { usePathname } from "next/navigation";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { navAppLinks } from "../../data/datasets/navbarLink";
import { IoClose } from "react-icons/io5";

export default function TopBarApp() {
  const pathname = usePathname();
  //Context
  const { appMenuOpen, setAppMenuOpen } = useNavbarContext();

  //Toggle menu function
  const toggleMenu = () => {
    setAppMenuOpen(!appMenuOpen);
  };

  return (
    <aside
      className={`fixed h-screen bg-background-2 border-r border-[#484848] z-50 lg:transition-none transition-all duration-300 ${
        appMenuOpen ? "w-64" : "w-0 hidden lg:block lg:w-64"
      }`}
    >
      <div className="flex items-center gap-5 p-4">
        <Link
          href="/"
          className="text-2xl text-purple font-bold block lg:mx-auto"
        >
          Task Manager
        </Link>
        <Button
          className="block lg:hidden"
          variant={"transparent"}
          size="iconSm"
          aria-label="Close sidebar menu"
          onClick={toggleMenu}
        >
          <IoClose color="white" size={25} />
        </Button>
      </div>

      <ul className="flex flex-col gap-3 items-center mt-12">
        {navAppLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <li
              key={link.id}
              className={`w-56 text-white font-medium rounded-lg hover:bg-[#5b1db9]/80 transition-colors duration-150 ${
                pathname === link.href && "bg-[#5b1db9]"
              }`}
            >
              <Link
                href={link.href}
                className="flex items-center px-3 py-2 w-full h-full"
                onClick={toggleMenu}
              >
                {IconComponent && <IconComponent className="mr-2" />}{" "}
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
