import { SidebarLink } from "../types/navbarTypes";
import { AiFillHome } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";


export const navAppLinks: SidebarLink[] = [
    {
        id: 1,
        text: "Today",
        href: "/application/today",
        icon: AiFillHome
    },
    {
        id: 2,
        text: "Add",
        href: "/application/add",
        icon: IoMdAddCircle
    },
    {
        id: 3,
        text: "Completed",
        href: "/application/completed",
        icon: FaCheckCircle
    },
    {
        id: 4,
        text: "sfdfdf",
        href: "/application/ggg",
        icon: AiFillHome
    },
]