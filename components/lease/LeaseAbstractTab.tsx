// src/components/lease/LeaseAbstractTab.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaseTermsSection } from "./LeaseTermsSection";
import { RentScheduleSection } from "./RentScheduleSection";
import { OptionsRecoveriesSection } from "./OptionsRecoveriesSection";
import { amazonLeaseData } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileIcon, Download, Copy } from "lucide-react";

export default function LeaseAbstractTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <Tabs defaultValue="lease-terms" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="lease-terms">Lease Terms</TabsTrigger>
          <TabsTrigger value="rent-schedule">Rent Schedule</TabsTrigger>
          <TabsTrigger value="options">Options & Recoveries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lease-terms">
          <LeaseTermsSection leaseData={amazonLeaseData} />
        </TabsContent>
        
        <TabsContent value="rent-schedule">
          <RentScheduleSection leaseData={amazonLeaseData} />
        </TabsContent>
        
        <TabsContent value="options">
          <OptionsRecoveriesSection leaseData={amazonLeaseData} />
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <FileIcon size={16} />
          <span>Source: </span>
          <a href="#" className="text-blue-600 hover:underline">
            280 Richards - OM.pdf
          </a>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download size={14} />
            <span>Export PDF</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Copy size={14} />
            <span>Copy to Clipboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
}