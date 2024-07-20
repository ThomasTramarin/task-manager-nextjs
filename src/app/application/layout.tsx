import TopBarApp from "../../components/navbar/TopBarApp";
import SidebarApp from "../../components/navbar/SidebarApp";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-screen">
      <SidebarApp />
      <div className="flex flex-col w-full relative lg:ml-64">
        <TopBarApp />
        {children}
      </div>
    </div>
  );
}
