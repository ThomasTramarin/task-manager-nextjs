import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { Button } from "../ui/button";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="h-16 bg-background-2 flex items-center text-purple px-4 sm:px-10">
      <ul className="flex justify-between items-center w-full">
        {!session ? (
          <>
            <li>
              <Link href="/" className="text-xl font-bold">
                TaskManager
              </Link>
            </li>
            <div className="flex gap-2">
              <li>
                <Link
                  href="/login"
                  className="p-2 rounded-md bg-light-green text-black font-medium"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="p-2 rounded-md bg-light-green text-black font-medium"
                >
                  Register
                </Link>
              </li>
            </div>
          </>
        ) : (
          <>
            <li>
              <Link href="/" className="text-xl font-bold">
                TaskManager
              </Link>
            </li>
            <li ><Link
                  href="/application/today"
                  className="p-2 rounded-md bg-light-green text-black font-medium"
                >
                  Open
                </Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
