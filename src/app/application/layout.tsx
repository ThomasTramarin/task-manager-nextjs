import TopBarApp from "../../components/navbar/TopBarApp";
import SidebarApp from "../../components/navbar/SidebarApp";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-row w-screen">
      <SidebarApp />
      <div className="flex flex-col w-full relative lg:ml-64">
        <TopBarApp session={session}/>
        {children}
      </div>
    </div>
  );
}
