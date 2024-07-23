import { getUserActivities } from "@/helpers/activities/getUserActivities";
import { activityEditPermissionChecker } from "../../../../helpers/activities/activityEditPermissionChecker";
import { IActivity } from "../../../../data/types/activitiesTypes";
import EditActivityForm from "@/components/modify/EditActivityForm";


export default async function modifyActivity({
  params,
}: {
  params: { id: string };
}) {
  const havePermission = await activityEditPermissionChecker(params.id);
  const data: IActivity = await getUserActivities("id", params.id);

  if (data && havePermission) {
    return (
      <main className="bg-background-1 min-h-screen p-4 mt-16">
        <h1 className="text-purple">Modify activity</h1>
       <EditActivityForm data={data} />
      </main>
    );
  }

}
