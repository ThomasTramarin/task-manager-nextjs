"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { IActivity } from "../../data/types/activitiesTypes";
import EditActivityKeywords from "./EditActivityKeywords";
import { useState } from "react";
import { format, isAfter, isBefore } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormState } from "react-dom";
import { modifyActivityAction } from "../../data/actions/modifyActivityAction";

const INITIAL_STATE = {
  success: null,
  wait: true,
  errorMessage: null,
  successMessage: null,
};

export default function EditActivityForm({ data }: { data: IActivity }) {
  const [dateExpire, setDateExpire] = useState<Date | undefined>(
    data.expiration_date ? new Date(data.expiration_date) : undefined
  );
  const [dateCompleted, setDateCompleted] = useState<Date | undefined>(
    data.expiration_date ? new Date(data.expiration_date) : undefined
  );
  const [switchCompleted, setSwitchCompleted] = useState<boolean>(
    Boolean(data.completed)
  );

  const [keywords, setKeywords] = useState<string[]>(data.keywords);

  const addActivityActionAllArguments = modifyActivityAction
    .bind(null, data.id_activity)
    .bind(null, dateExpire)
    .bind(null, dateCompleted)
    .bind(null, switchCompleted)
    .bind(null, keywords);
  const [formState, formAction] = useFormState(
    addActivityActionAllArguments,
    INITIAL_STATE
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  console.log(data)
  return (
    <div className="p-4 bg-background-2 rounded-xl">
      <h2 className="text-white font-medium">Activity #{data.id_activity}</h2>
      <form action={formAction}>
        <EditActivityKeywords keywords={keywords} setKeywords={setKeywords} />
        <div className="mb-3">
          <Label htmlFor="title">Title:</Label>
          <Input
            type="text"
            name="title"
            id="title"
            required
            aria-required="true"
            defaultValue={data.title}
          />
        </div>
        <div className="mb-3">
          <Label htmlFor="description">Description:</Label>
          <Textarea
            name="description"
            className="text-white"
            id="description"
            required
            aria-required="true"
            defaultValue={data.description}
          />
        </div>
        <div className="mb-3">
          <Label htmlFor="priority">Priority:</Label>
          <Select
            required={true}
            aria-required={true}
            name="priority"
            defaultValue={data.priority}
          >
            <SelectTrigger className="bg-background-1 text-white">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent className="bg-background-1 text-white">
              <SelectItem value="low" className="bg-background-2">
                Low
              </SelectItem>
              <SelectItem value="medium" className="bg-background-2">
                Medium
              </SelectItem>
              <SelectItem value="high" className="bg-background-2">
                High
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label htmlFor="expire-date">Expire date:</Label>
            <Popover>
              <PopoverTrigger
                asChild
                className="bg-background-1 text-white"
                id="expire-date"
              >
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !dateExpire && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                  {dateExpire ? (
                    format(dateExpire, "PPP")
                  ) : (
                    <span className="text-white">Expire date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateExpire}
                  onSelect={(day) => day && setDateExpire(day)}
                  initialFocus
                  disabled={(date) => isBefore(date, today)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Label htmlFor="completed">Completed:</Label>
            <Switch
              id="completed"
              checked={switchCompleted}
              onClick={() => setSwitchCompleted(!switchCompleted)}
            />
          </div>
        </div>
        <div className="mb-3 flex flex-col gap-1">
          <Label htmlFor="completed-date">Completed Date:</Label>
          <Popover>
            <PopoverTrigger
              asChild
              className="bg-background-1 text-white"
              disabled={!Boolean(switchCompleted)}
              id="completed-date"
            >
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !dateCompleted && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                {dateCompleted ? (
                  format(dateCompleted, "PPP")
                ) : (
                  <span className="text-white">Completed date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateCompleted}
                onSelect={(day) => setDateCompleted(day)}
                initialFocus
                disabled={(date) => isAfter(date, today)}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" variant={"destructive"} className="mb-3">
          Save
        </Button>

        {!formState.wait && (
          <p
            aria-live="polite"
            className={`${
              formState.success ? "text-light-green" : "text-red-500"
            }`}
          >
            {formState.success
              ? `${formState.successMessage}`
              : `${formState.errorMessage}`}
          </p>
        )}
      </form>
    </div>
  );
}
