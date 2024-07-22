"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import util from "util";
import db from "../../lib/db";
import { format } from "date-fns";
import { revalidateTag } from "next/cache";

const query = util.promisify(db.query).bind(db);

export async function completeTaskAction(id_activity: number) {
  const today = format(new Date(), "yyyy-MM-dd");

  const session = await getServerSession(authOptions);

  const result = await query(
      "UPDATE activities SET completed = 1, completed_date = ? WHERE id_activity = ? AND user_id = ?",
      [today, id_activity, session.user.id]
  );

  revalidateTag("get-activity")
}
