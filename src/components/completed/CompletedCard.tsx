import { IActivity } from "../../data/types/activitiesTypes";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";

export default function CompletedCard({ data }: { data: IActivity[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {data.map((activity: IActivity) => (
        <div
          key={activity.id_activity}
          className="bg-background-2 p-4 rounded-xl h-80 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div>
            <h3 className="text-lg text-white font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              {activity.title}
            </h3>
            <p
              className="text-zinc-200 overflow-hidden text-ellipsis mt-2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
              }}
            >
              {activity.description}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mt-3">
              <p
                className={`uppercase text-sm font-semibold ${
                  activity.priority === "high"
                    ? "text-red-600"
                    : activity.priority === "low"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {activity.priority}
              </p>
              <p className="text-sm text-purple">{activity.completed_date}</p>
            </div>

            {activity.keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2 text-light-green text-sm mt-3">
                {activity.keywords.map((keyword: string) => (
                  <span key={keyword}>#{keyword}</span>
                ))}
              </div>
            ) : (
              <div className="text-light-green mt-3 text-sm">No keywords</div>
            )}

            <Button
              variant={"transparent"}
              className="text-white text-xl mt-3"
              size={"iconSm"}
            >
              <FaEdit />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
