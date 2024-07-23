"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import util from "util";
import db from "../../lib/db";
import { revalidateTag } from "next/cache";

const query = util.promisify(db.query).bind(db);

export async function deleteTaskAction(id_activity: number) {
  const session = await getServerSession(authOptions);

  const result = await query(
      "DELETE FROM activities WHERE id_activity = ? AND user_id = ?",
      [id_activity, session.user.id]
  );


  revalidateTag("get-activity")
}
