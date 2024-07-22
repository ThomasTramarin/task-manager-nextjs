"use server";
import db from "../../lib/db";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

import util from "util";
import { revalidateTag } from "next/cache";

const query = util.promisify(db.query).bind(db);

export async function addActivityAction(
  date: Date | undefined,
  keywords: string[],
  prevState: any,
  formData: FormData
) {
  //User session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return {
      ...prevState,
      success: false,
      errorMessage: "User is not authenticated",
      successMessage: null,
      wait: false
    };
  }
  const userId = session.user.id;

  //Form fields
  const fields = {
    title: formData.get("title"),
    description: formData.get("desc"),
    priority: formData.get("priority"),
    date: date,
    keywords: JSON.stringify(keywords),
  };

  //Form validation
  if (fields.date) {
    try {
      //Try to add activity
      const res = await query(
        "INSERT INTO activities (user_id, title, description, expiration_date, priority, keywords, completed, completed_date) VALUES (?,?,?,?,?,?,?,?)",
        [userId, fields.title, fields.description, fields.date, fields.priority, fields.keywords, 0, null]
      );

    } catch (err: any) {
      return {
        ...prevState,
        success: false,
        errorMessage: "An error occurred" + err,
        successMessage: null,
        wait: false
      };
    }

    //If successful, revalidate data
    revalidateTag("get-activities")
  
    return {
      ...prevState,
      success: true,
      errorMessage: null,
      successMessage: "Activity added successfully",
      wait: false
    };
  } else {
    return {
      ...prevState,
      success: false,
      errorMessage: "Date is required",
      successMessage: null,
      wait: false
    };
  }
}
