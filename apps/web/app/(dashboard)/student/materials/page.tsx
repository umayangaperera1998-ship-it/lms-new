"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Video, PlayCircle, Download, Folder } from "lucide-react";

const notes = [
  { id: 1, title: "Algebra Chapter 1 Summary", subject: "Mathematics", size: "2.4 MB", date: "May 20, 2026" },
  { id: 2, title: "Kinematics Formula Sheet", subject: "Physics", size: "1.1 MB", date: "May 18, 2026" },
  { id: 3, title: "Organic Chemistry Reactions", subject: "Chemistry", size: "3.5 MB", date: "May 15, 2026" },
];

const videos = [
  { id: 1, title: "Introduction to Calculus", subject: "Mathematics", duration: "45 mins", date: "May 21, 2026", views: 120 },
  { id: 2, title: "Newton's Laws Explained", subject: "Physics", duration: "1 hr 15 mins", date: "May 19, 2026", views: 85 },
];

export default function StudentMaterialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
        <p className="text-muted-foreground mt-1">Access lecture notes, tutorial videos, and class recordings.</p>
      </div>

      <Tabs defaultValue="notes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notes" className="flex items-center gap-2"><FileText className="w-4 h-4"/> Notes</TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2"><Video className="w-4 h-4"/> Tutorial Videos</TabsTrigger>
          <TabsTrigger value="recordings" className="flex items-center gap-2"><PlayCircle className="w-4 h-4"/> Class Recordings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {notes.map((note) => (
              <Card key={note.id} className="flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <Badge variant="outline" className="w-fit mb-2">{note.subject}</Badge>
                  <CardTitle className="text-base line-clamp-2">{note.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 flex-1 text-sm text-gray-500">
                  <p>Uploaded: {note.date}</p>
                  <p>Size: {note.size}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="w-full h-8 text-xs">Preview</Button>
                  <Button variant="default" className="w-full h-8 text-xs"><Download className="w-3 h-3 mr-1"/> Download</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {videos.map((vid) => (
              <Card key={vid.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative group cursor-pointer">
                  <PlayCircle className="w-12 h-12 text-gray-400 group-hover:text-primary transition-colors" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {vid.duration}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="w-fit mb-1">{vid.subject}</Badge>
                  <CardTitle className="text-base">{vid.title}</CardTitle>
                  <CardDescription>Uploaded on {vid.date} • {vid.views} views</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recordings">
           <Card className="flex flex-col items-center justify-center py-12 text-center">
             <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
               <Folder className="w-12 h-12 text-gray-400" />
             </div>
             <CardTitle className="text-xl">No Recordings Available</CardTitle>
             <CardDescription className="max-w-md mt-2">
               Class recordings will appear here after your live sessions have ended and been processed.
             </CardDescription>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
