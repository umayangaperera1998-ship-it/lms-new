"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Plus } from "lucide-react";

// Mock Schedule Slots
const initialSlots = [
  { id: 1, title: "Advanced Mathematics", day: "Monday", time: "10:00 AM - 12:00 PM", class: "AL 2026" },
  { id: 2, title: "Physics Theory", day: "Tuesday", time: "02:00 PM - 04:00 PM", class: "AL 2026" },
  { id: 3, title: "Advanced Mathematics", day: "Wednesday", time: "10:00 AM - 12:00 PM", class: "AL 2026" },
  { id: 4, title: "Physics Theory", day: "Thursday", time: "02:00 PM - 04:00 PM", class: "AL 2026" },
  { id: 5, title: "Chemistry Revision", day: "Saturday", time: "08:00 AM - 11:00 AM", class: "Grade 13" },
];

export default function TeacherSchedulePage() {
  const [slots, setSlots] = useState(initialSlots);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("");

  const handleAddSlot = () => {
    if (!title.trim() || !time.trim()) return;
    const newSlot = {
      id: Date.now(),
      title,
      day,
      time,
      class: "AL 2026"
    };
    setSlots(prev => [...prev, newSlot]);
    setTitle("");
    setTime("");
    setIsOpen(false);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Schedule</h1>
          <p className="text-muted-foreground mt-1">Plan your weekly lectures and arrange study timings.</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Book New Slot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map((dayName) => {
          const slotsForDay = slots.filter(s => s.day === dayName);
          return (
            <Card key={dayName} className="flex flex-col min-h-[300px]">
              <CardHeader className="p-3 border-b text-center bg-slate-50 dark:bg-slate-900/10">
                <CardTitle className="text-xs font-bold tracking-wider uppercase text-gray-500">{dayName}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 flex-1 space-y-2">
                {slotsForDay.length === 0 ? (
                  <p className="text-[10px] text-gray-400 text-center py-8">No classes</p>
                ) : (
                  slotsForDay.map(slot => (
                    <div key={slot.id} className="p-2 rounded border bg-card text-xs space-y-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{slot.title}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {slot.time}
                      </p>
                      <span className="inline-block text-[9px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-medium">
                        {slot.class}
                      </span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Book Slot Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Class Timing</DialogTitle>
            <DialogDescription>Input lecture name and duration details.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slot-title">Class Name</Label>
              <Input 
                id="slot-title" 
                placeholder="E.g. Mathematics" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slot-day">Day of Week</Label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger id="slot-day">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slot-time">Timing Range</Label>
                <Input 
                  id="slot-time" 
                  placeholder="E.g. 10:00 AM - 12:00 PM" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <CardFooter className="justify-end border-t pt-4">
            <Button onClick={handleAddSlot}>Confirm Timing</Button>
          </CardFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
