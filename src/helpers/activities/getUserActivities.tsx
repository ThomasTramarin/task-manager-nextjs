import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { IActivity } from "../../data/types/activitiesTypes";
import { eachHourOfInterval, format } from "date-fns";
import { Recycle } from "lucide-react";

export const getUserActivities = async (type: string, id?:string) => {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${process.env.ROOT_URL}/api/get-activities`, {
    next: { tags: ["get-activities"] },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session }),
  });
  const data = await response.json();
  const activities = data.activities;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  if (type === "today") {
    const today = format(new Date(), "yyyy-MM-dd");
    const filteredActivities = activities.filter(
      (activity: IActivity) =>
        activity.expiration_date === today && activity.completed === 0
    );
    return filteredActivities;
  } else if (type === "completed") {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const filteredActivities = activities.filter((activity: IActivity) => {
      if (!activity.completed_date) {
        return false;
      }
      const completedAt = new Date(activity.completed_date);
      return completedAt >= sevenDaysAgo && completedAt <= now;
    });

    return filteredActivities;
  } else if (type === "all") {
    return data;
  }else if (type === "id"){
    const filteredActivities = activities.filter((activity: IActivity) =>{
      return String(activity.id_activity) === id;
    })

    return filteredActivities[0];
  }
};
