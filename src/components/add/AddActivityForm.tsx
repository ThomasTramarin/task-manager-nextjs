"use client";
import { useState } from "react";
import { addActivityAction } from "../../data/actions/addActivityAction";
import { useFormState } from "react-dom";
import AddKeywords from "./AddKeywords";
import { format, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INITIAL_STATE = {
  success: null,
  wait: true,
  errorMessage: null,
  successMessage: null,
}

export default function AddActivityForm() {

  const [date, setDate] = useState<Date>();
  const [keywords, setKeywords] = useState<string[]>([]);
  const addActivityActionAllArguments = addActivityAction.bind(null, date).bind(null, keywords)
  const [formState, formAction] = useFormState(addActivityActionAllArguments, INITIAL_STATE);

  const today = new Date();
  today.setHours(0, 0, 0, 0)

  return (
    <div className="bg-background-2 p-4 rounded-xl">
      <h2 className="text-lg text-white font-bold">Add new activity</h2>
      <form action={formAction}>
        <AddKeywords keywords={keywords} setKeywords={setKeywords}/>
        <div className="mb-3">
          <Label htmlFor="title">Title:</Label>
          <Input
            type="text"
            name="title"
            id="title"
            className="text-base"
            maxLength={50}
            required={true}
            aria-required={true}
          />
        </div>
        <div className="mb-3">
          <Label htmlFor="desc">Description:</Label>
          <Textarea
            id="desc"
            name="desc"
            maxLength={500}
            placeholder="Type your description here."
            className="bg-background-1 border-none text-gray"
            required={true}
            aria-required={true}
          />
        </div>
        <div className="mb-8">
          <Label htmlFor="priority">Priority:</Label>
          <Select required={true} aria-required={true} name="priority">
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
        <div className="flex justify-between gap-3 mb-2">
          <Popover>
            <PopoverTrigger asChild className="bg-background-1 text-white">
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="text-white">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => isBefore(date, today)}
              />
            </PopoverContent>
          </Popover>

          <Button
            type="submit"
            variant="destructive"
            className="bg-background-1 hover:bg-background-1/50 text-white"
          >
            Create new activity
          </Button>
        </div>
        {
          !formState.wait && (<p aria-live="polite" className={`${formState.success ? "text-light-green" : "text-red-500"}`}>{formState.success ? `${formState.successMessage}` : `${formState.errorMessage}`}</p>)
        }
      </form>
    </div>
  );
}
