import UpcomingActivitiesCards from "@/components/upcoming/UpcomingActivitiesCards";

export default async function Upcoming(){

   return(
    <main className="bg-background-1 min-h-screen p-4 mt-16">
      <h1 className="text-purple">Upcoming</h1>
      <UpcomingActivitiesCards />
    </main>
   )
};