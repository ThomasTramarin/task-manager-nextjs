
import { getUserActivities } from "../../helpers/activities/getUserActivities";
import { IActivity } from "../../data/types/activitiesTypes";
import TodayCard from "./TodayCard";
export default async function TodayActivitiesCards() {
  const data: IActivity[] = await getUserActivities("today");
  
  //If there are activities
  if (data.length > 0) {
    return <TodayCard data={data}/>
  }

  //If there are no activities
  return (
    <div className="p-3 sm:p-6 rounded-xl bg-gradient-to-r from-[#5F72BE] to-[#9921E8]">
      <h2 className="text-white font-bold text-xl text-center mb-3">
        &#127881; Today is a special day! &#127881;
      </h2>
      <p className="text-black text-center font-medium">You have no tasks scheduled, so you can enjoy some well-deserved relaxation.</p>
    </div>
  );
}


