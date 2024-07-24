
import { getUserActivities } from "../../helpers/activities/getUserActivities";
import { IActivity } from "../../data/types/activitiesTypes";
import UpcomingCard from "./UpcomingCard";
// import TodayCard from "./TodayCard";
export default async function UpcomingActivitiesCards() {
  const data: IActivity[] = await getUserActivities("upcoming");

  //If there are activities
  if (data.length > 0) {
    return <UpcomingCard data={data}/>
  }

  //If there are no activities
  return (
    <div className="p-3 sm:p-6 rounded-xl bg-gradient-to-r from-[#5F72BE] to-[#9921E8]">
        <h2 className="text-white font-bold text-xl text-center mb-3">
        &#10060; Upcoming Activities not found &#10060;
      </h2>
      <p className="text-black text-center font-medium">No future activities saved.</p>
    </div>
  );
}


