"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, File, Trash, Download } from "lucide-react";

const initialMaterials = [
  { id: 1, title: "Algebra Basics Formula Cheat Sheet", class: "Advanced Mathematics", type: "PDF", size: "2.4 MB", date: "May 20, 2026" },
  { id: 2, title: "Thermodynamics Lecture Notes 1", class: "Physics Theory AL", type: "PDF", size: "3.5 MB", date: "May 19, 2026" },
];

export default function TeacherMaterialsPage() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [title, setTitle] = useState("");
  const [targetClass, setTargetClass] = useState("math");
  const [desc, setDesc] = useState("");

  const handleUpload = () => {
    if (!title.trim()) return;
    const newMaterial = {
      id: Date.now(),
      title,
      class: targetClass === "math" ? "Advanced Mathematics" : targetClass === "physics" ? "Physics Theory AL" : "Chemistry Revision",
      type: "PDF",
      size: "1.2 MB",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setMaterials(prev => [newMaterial, ...prev]);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Study Materials Upload</h1>
        <p className="text-muted-foreground mt-1">Publish lecture notes, syllabus drafts, and worksheets for your students.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Upload Form */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Upload Form</CardTitle>
            <CardDescription>Share files directly to classes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="material-title">Document Title</Label>
              <Input 
                id="material-title" 
                placeholder="E.g. Lecture Notes 3" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="material-class">Assign Class Room</Label>
              <Select value={targetClass} onValueChange={setTargetClass}>
                <SelectTrigger id="material-class">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Advanced Math</SelectItem>
                  <SelectItem value="physics">Physics Theory</SelectItem>
                  <SelectItem value="chemistry">Chemistry Revision</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="material-desc">Description</Label>
              <Textarea 
                id="material-desc" 
                placeholder="Details about what the document covers..." 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="border border-dashed border-gray-300 dark:border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
              <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
              <span className="text-xs font-semibold">Click to upload file</span>
              <span className="text-[10px] text-gray-400 mt-1">PDF, Word, or Slides up to 25MB</span>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t pt-4">
            <Button onClick={handleUpload}>Publish Material</Button>
          </CardFooter>
        </Card>

        {/* Uploaded Materials List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>A log of your uploaded files.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Assigned Class</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((mat) => (
                  <TableRow key={mat.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <File className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate max-w-[150px] sm:max-w-xs">{mat.title}</span>
                    </TableCell>
                    <TableCell>{mat.class}</TableCell>
                    <TableCell>{mat.date}</TableCell>
                    <TableCell>{mat.size}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => setMaterials(prev => prev.filter(item => item.id !== mat.id))}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
