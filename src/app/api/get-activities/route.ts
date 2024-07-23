import { NextResponse } from "next/server";
import { IActivityDB } from "../../../data/types/activitiesTypes";
import util from "util";
import { format } from "date-fns";
import db from "../../../lib/db";

const query = util.promisify(db.query).bind(db);

export async function POST(req: Request) {
  const { session } = await req.json();

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        const activities = await query(
            "SELECT * FROM activities WHERE user_id = ?",
            [userId]
        );

        const formattedActivities = activities.map((activity: IActivityDB) => ({
            ...activity,
            expiration_date: format(new Date(activity.expiration_date), "yyyy-MM-dd"),
            completed_date: activity.completed_date ? format(new Date(activity.completed_date), "yyyy-MM-dd") : null,
            keywords: JSON.parse(activity.keywords)
        }));

        return NextResponse.json({ activities: formattedActivities }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { error: "An error occurred: " + err.message },
            { status: 500 }
        );
    }
}