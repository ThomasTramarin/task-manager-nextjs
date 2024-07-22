import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { IActivity } from "../../data/types/activitiesTypes";
import { format } from "date-fns";

export const getUserActivities = async (type: string) => {
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
        throw new Error('Network response was not ok');
    }
    

    if(type === "today"){
        const today = format(new Date(), "yyyy-MM-dd");
        const filteredActivities = activities.filter((activity: IActivity) => activity.expiration_date === today && activity.completed === 0);
        return filteredActivities;
    }

    return data;
};