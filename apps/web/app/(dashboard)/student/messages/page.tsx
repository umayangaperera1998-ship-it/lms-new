"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Image as ImageIcon, Paperclip } from "lucide-react";

const contacts = [
  { id: 1, name: "Advanced Math Group", type: "Group", lastMessage: "Don't forget the assignment!", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Dr. Ajith Silva", type: "Teacher", lastMessage: "Yes, you can submit it tomorrow.", time: "Yesterday", unread: 0 },
  { id: 3, name: "Chemistry Revision", type: "Group", lastMessage: "Class is rescheduled to 9 AM.", time: "Monday", unread: 0 },
];

export default function StudentMessagesPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
      </div>
      
      <Card className="flex-1 flex overflow-hidden border">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r flex flex-col bg-gray-50/50 dark:bg-gray-900/20">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search messages..." className="pl-8 bg-white dark:bg-gray-900" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                className={`p-4 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${contact.id === 1 ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
              >
                <Avatar>
                  <AvatarFallback className={contact.type === 'Group' ? 'bg-blue-100 text-blue-600' : ''}>
                    {contact.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-semibold truncate">{contact.name}</h4>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {contact.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-950">
          <div className="p-4 border-b flex items-center gap-3 shadow-sm z-10">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">AM</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Advanced Math Group</h3>
              <p className="text-xs text-gray-500">120 members, 4 online</p>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-900/20 space-y-4">
             {/* Mock Messages */}
             <div className="flex justify-center">
               <span className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400">Today</span>
             </div>
             
             <div className="flex gap-3 max-w-[80%]">
               <Avatar className="w-8 h-8"><AvatarFallback>NP</AvatarFallback></Avatar>
               <div>
                 <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none border shadow-sm text-sm">
                   Hello students! Don't forget the assignment is due tomorrow at 5 PM.
                 </div>
                 <span className="text-xs text-gray-500 mt-1 block">Mr. Nimal Perera • 10:30 AM</span>
               </div>
             </div>

             <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
               <div>
                 <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none shadow-sm text-sm">
                   Noted sir, will submit it today!
                 </div>
                 <span className="text-xs text-gray-500 mt-1 block text-right">You • 10:35 AM</span>
               </div>
             </div>
          </div>

          <div className="p-4 border-t bg-white dark:bg-gray-950">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-500"><Paperclip className="w-5 h-5"/></Button>
              <Button variant="ghost" size="icon" className="text-gray-500"><ImageIcon className="w-5 h-5"/></Button>
              <Input placeholder="Type a message..." className="flex-1 bg-gray-100 dark:bg-gray-900 border-transparent focus-visible:ring-1" />
              <Button size="icon" className="shrink-0"><Send className="w-4 h-4"/></Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
