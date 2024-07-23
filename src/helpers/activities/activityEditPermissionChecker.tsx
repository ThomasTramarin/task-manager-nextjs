import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import util from "util";
import db from "../../lib/db";
import { IActivityDB } from "@/data/types/activitiesTypes";
import { notFound } from "next/navigation";

const query = util.promisify(db.query).bind(db);

export const activityEditPermissionChecker = async (activityID: string) => {
    const session = await getServerSession(authOptions);
    const userID = session.user.id;

    // Check if the user has the necessary permissions to edit the activity with the given ID
    const result: IActivityDB[] = await query("SELECT * FROM activities WHERE id_activity = ?", [activityID])

    if(result.length > 0){
        const userActivityID = result[0].user_id;
        
        if(userActivityID === userID){
            return true;
        }else{
            notFound();
        }

    }else{
        notFound();
    }

}