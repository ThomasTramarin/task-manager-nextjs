"use server";
import db from "../../lib/db";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

import util from "util";
import { revalidateTag } from "next/cache";

const query = util.promisify(db.query).bind(db);

export async function modifyActivityAction(
  idActivity: number,
  expireDate: Date | undefined,
  completedDate: Date | undefined,
  switchComplete: boolean,
  keywords: string[],
  prevState: any,
  formData: FormData
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return {
      ...prevState,
      success: false,
      errorMessage: "User is not authenticated",
      successMessage: null,
      wait: false,
    };
  }

  const userID = session.user.id;

  const fields = {
    idActivity: idActivity,
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    expiration_date: expireDate,
    completed_date: completedDate,
    completed: switchComplete ? 1 : 0,
    keywords: JSON.stringify(keywords),
  };

  if (
    fields.expiration_date && fields.completed === 1
      ? fields.completed_date
      : true
  ) {
    try {
      const res = await query(
        "UPDATE activities SET title = ?, description = ?, priority = ?, expiration_date = ?, completed_date = ?, completed = ?, keywords = ? WHERE id_activity = ? AND user_id = ?",
        [
          fields.title,
          fields.description,
          fields.priority,
          fields.expiration_date,
          fields.completed ? fields.completed_date : null,
          fields.completed,
          fields.keywords,
          fields.idActivity,
          userID,
        ]
      );
    } catch (err: any) {
      return {
        ...prevState,
        success: false,
        errorMessage: "An error occurred" + err,
        successMessage: null,
        wait: false,
      };
    }

    //If successful, revalidate data
    revalidateTag("get-activities");

    return {
      ...prevState,
      success: true,
      errorMessage: null,
      successMessage: "Activity edit successfully",
      wait: false,
    };
  } else {
    return {
      ...prevState,
      success: false,
      errorMessage: "Date is required",
      successMessage: null,
      wait: false,
    };
  }
}
