"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authApi } from "@/lib/api/auth.api";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Lock, 
  CheckCircle2, 
  Camera, 
  Save,
  ShieldCheck,
  Building
} from "lucide-react";

export default function TeacherProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [quals, setQuals] = useState("");
  const [exp, setExp] = useState("5");

  useEffect(() => {
    const currentUser = authApi.getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      setFirstName(currentUser.firstName || "");
      setLastName(currentUser.lastName || "");
      setPhone(currentUser.phone || "0771234567");
      setBio(currentUser.bio || "Senior Lecturer in Physics & Mathematics. Passionate about helping students solve complex equations and achieve A/L success.");
      setQuals(currentUser.qualifications || "MSc in Applied Mathematics, BSc in Physics (University of Colombo)");
    }
  }, []);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your professional bio, credentials, and account settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Profile Card Summary */}
        <Card className="md:col-span-1 h-fit">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <div className="relative group cursor-pointer">
              <div className="w-28 h-28 rounded-full border bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                <User className="w-12 h-12 text-slate-400" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg">{user ? `${firstName} ${lastName}` : "Teacher Profile"}</h2>
              <p className="text-xs text-muted-foreground">{user?.email || "teacher@lms.local"}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="success" className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </Badge>
              <Badge variant="outline">Teacher</Badge>
            </div>
            <p className="text-xs text-gray-500 italic px-2">
              Member since May 2026
            </p>
          </CardContent>
        </Card>

        {/* Dynamic Detail Tabs */}
        <Card className="md:col-span-3">
          <Tabs defaultValue="general" className="w-full">
            <CardHeader className="border-b p-0">
              <TabsList className="w-full justify-start rounded-none h-12 bg-transparent px-6">
                <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">General Details</TabsTrigger>
                <TabsTrigger value="credentials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Professional & Bio</TabsTrigger>
                <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Security Settings</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="p-6">
              <TabsContent value="general" className="space-y-4 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="profile-email" type="email" value={user?.email || ""} disabled className="pl-9 bg-slate-50 dark:bg-slate-900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="profile-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-9" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-inst">Associated Institute</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="profile-inst" value={user?.instituteName || "Future Academy"} disabled className="pl-9 bg-slate-50 dark:bg-slate-900" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="credentials" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="profile-bio">About Me / Bio</Label>
                  <Textarea id="profile-bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-quals">Qualifications & Certifications</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="profile-quals" value={quals} onChange={(e) => setQuals(e.target.value)} className="pl-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-exp">Years of Experience</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="profile-exp" type="number" value={exp} onChange={(e) => setExp(e.target.value)} className="pl-9" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="curr-pass">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="curr-pass" type="password" placeholder="••••••••" className="pl-9" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-pass">New Password</Label>
                    <Input id="new-pass" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conf-new-pass">Confirm New Password</Label>
                    <Input id="conf-new-pass" type="password" placeholder="••••••••" />
                  </div>
                </div>
              </TabsContent>
            </CardContent>

            <CardFooter className="justify-between border-t p-6 bg-slate-50/50 dark:bg-slate-900/10">
              <div>
                {isSaved && (
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
                  </span>
                )}
              </div>
              <Button onClick={handleSave} className="flex items-center gap-1">
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
