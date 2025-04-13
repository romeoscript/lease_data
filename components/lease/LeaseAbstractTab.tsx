"use client";

import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaseTermsSection } from "./LeaseTermsSection";
import { RentScheduleSection } from "./RentScheduleSection";
import { OptionsRecoveriesSection } from "./OptionsRecoveriesSection";
import { amazonLeaseData } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileIcon, Copy } from "lucide-react";
import ExportPdfButton from "./ExportPdfButton";
import PdfViewerModal from "./PdfViewerModal";
import toast from "react-hot-toast";
import { colors } from "@/utils/styleConstants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function LeaseAbstractTab() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const pdfPath = "/280-Richards-OM.pdf"; 
  
  const handleCopyToClipboard = async () => {
    if (!contentRef.current) return;
    
    try {
      // Create a simplified text representation of lease data
      const textContent = `
        280 Richards - Lease Abstract
        
        TENANT INFORMATION
        Tenant: ${amazonLeaseData.tenant.name}
        Guarantor: ${amazonLeaseData.tenant.guarantor}
        Credit Rating: ${amazonLeaseData.tenant.creditRating}
        Market Cap: ${amazonLeaseData.tenant.marketCap}
        
        LEASE DATES
        Lease Commencement: ${amazonLeaseData.dates.leaseCommencementDate}
        Lease Expiration: ${amazonLeaseData.dates.leaseExpirationDate}
        Remaining Term: ${amazonLeaseData.dates.remainingTerm}
        
        RENTAL STRUCTURE
        Annual Rent: ${amazonLeaseData.financials.annualRent.toLocaleString()}
        Weighted Average Rent PSF: ${amazonLeaseData.financials.weightedAverageRentPSF.toFixed(2)}
        Annual Escalations: ${amazonLeaseData.financials.annualEscalations}
        
        OPTIONS
        Renewal Options: ${amazonLeaseData.options.renewalOptions}
        Other Options: ${amazonLeaseData.options.otherOptions}
        
        RECOVERY STRUCTURE
        Real Estate Taxes: ${amazonLeaseData.recoveryStructure.realEstateTaxes}
        CAM: ${amazonLeaseData.recoveryStructure.CAM}
        Insurance: ${amazonLeaseData.recoveryStructure.insurance}
        Management Fee: ${amazonLeaseData.recoveryStructure.managementFee}
      `;
      
      await navigator.clipboard.writeText(textContent);
      toast.success("Lease summary copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Could not copy content to clipboard");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 max-w-full">
      <div ref={contentRef}>
        <Tabs defaultValue="lease-terms" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="mb-6 w-full grid grid-cols-3 min-w-[450px]">
              <TabsTrigger value="lease-terms">
                Lease Terms
              </TabsTrigger>
              <TabsTrigger value="rent-schedule">
                Rent Schedule
              </TabsTrigger>
              <TabsTrigger value="options">
                Options & Recoveries
              </TabsTrigger>
            </TabsList>
          </div>
          
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
      </div>

      <Separator className="my-6" />
      
      <div className={`flex ${isSmallScreen ? 'flex-col space-y-4' : 'items-center justify-between'} text-sm text-muted-foreground`}>
        <div className="flex items-center gap-2 overflow-hidden">
          <FileIcon size={16} className="flex-shrink-0" />
          <span className="flex-shrink-0">Source: </span>
          <button 
            onClick={() => setIsPdfModalOpen(true)}
            className="text-blue-600 hover:underline truncate cursor-pointer"
          >
            280 Richards - OM.pdf
          </button>
        </div>
        <div className={`flex ${isSmallScreen ? 'w-full' : ''} gap-2`}>
          <ExportPdfButton 
            leaseData={amazonLeaseData}
    
            containerRef={contentRef}
            className={isSmallScreen ? 'flex-1' : ''}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className={`gap-1 ${isSmallScreen ? 'flex-1 whitespace-nowrap' : ''}`}
            style={{
              backgroundColor: colors.table.rowEvenBg,
              color: colors.primaryText,
              borderColor: colors.panelBorder
            }}
            onClick={handleCopyToClipboard}
          >
            <Copy size={14} style={{ color: colors.secondaryText }} className="flex-shrink-0" />
            <span className={isSmallScreen ? "hidden sm:inline" : ""}>Copy to Clipboard</span>
            <span className={isSmallScreen ? "sm:hidden" : "hidden"}>Copy</span>
          </Button>
        </div>
      </div>
      
      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfPath={pdfPath}
        documentTitle="280 Richards - Offering Memorandum"
      />
    </div>
  );
}