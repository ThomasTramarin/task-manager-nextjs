"use client";
import * as React from "react";
import { format } from "date-fns";
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

export default function AddActivityForm() {
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="bg-background-2 p-4 rounded-xl">
        <h2 className="text-lg text-white font-bold">Add new activity</h2>
    <form action="">
      <div className="mb-3">
        <Label htmlFor="title">Title:</Label>
        <Input type="text" name="title" id="title" className="text-base" />
      </div>
      <div className="mb-3">
        <Label htmlFor="desc">Description:</Label>
        <Textarea
          id="desc"
          name="desc"
          placeholder="Type your description here."
          className="bg-background-1 border-none text-gray"
        />
      </div>
      <div className="mb-3">
        <Label htmlFor="priority">Priority:</Label>
        <Select>
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
      <div className="mb-8">
        <Label htmlFor="category">Category:</Label>
        <Select>
          <SelectTrigger className="bg-background-1 text-white">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-background-1 text-white">
            <SelectItem value="no-category" className="bg-background-2">
              No category
            </SelectItem>
            <SelectItem value="work" className="bg-background-2">
              Work
            </SelectItem>
            <SelectItem value="school" className="bg-background-2">
              School
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between gap-3">
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
              {date ? format(date, "PPP") : <span className="text-white">Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button type="submit" variant="destructive" className="bg-background-1 hover:bg-background-1/50 text-white">Create new activity</Button>
      </div>
    </form>
    </div>
  );
}
