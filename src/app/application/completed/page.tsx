import ActivitiesCompletedCards from "../../../components/completed/ActivitiesCompletedCards";
export default async function Completed() {
  
  return (
    <main className="bg-background-1 min-h-screen p-4 mt-16">
      <h1 className="text-purple">Activities Completed</h1>
      <ActivitiesCompletedCards />
    </main>
  );
}
