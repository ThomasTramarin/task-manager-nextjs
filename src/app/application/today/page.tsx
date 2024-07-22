import TodayActivitiesCards from "../../../components/today/TodayActivitiesCards";
export default async function Today() {
  
  return (
    <main className="bg-background-1 min-h-screen p-4 mt-16">
      <h1 className="text-purple">Today Activities</h1>
      <TodayActivitiesCards />
    </main>
  );
}
