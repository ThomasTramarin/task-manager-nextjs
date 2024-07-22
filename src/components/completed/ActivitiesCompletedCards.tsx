import { getUserActivities } from "../../helpers/activities/getUserActivities";
import CompletedCard from "./CompletedCard";

export default async function ActivitiesCompletedCards() {
  const data = await getUserActivities("completed");

  //If there are activities
  if(data.length > 0) {
    return <CompletedCard data={data}/>
  }
  return (
    <div className="p-3 sm:p-6 rounded-xl bg-gradient-to-r from-[#5F72BE] to-[#9921E8]">
        <h2 className="text-white font-bold text-xl text-center mb-3">
        &#10060; Completed Activities not found &#10060;
      </h2>
      <p className="text-black text-center font-medium">No completed activities have been found in the last 7 days.</p>
    </div>
  );
}
