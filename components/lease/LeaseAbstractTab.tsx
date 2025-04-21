"use client";

import { useRef, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaseTermsSection } from "./LeaseTermsSection";
import { RentScheduleSection } from "./RentScheduleSection";
import { OptionsRecoveriesSection } from "./OptionsRecoveriesSection";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileIcon, Copy } from "lucide-react";
import ExportPdfButton from "./ExportPdfButton";
import PdfViewerModal from "./PdfViewerModal";
import toast from "react-hot-toast";
import { colors } from "@/utils/styleConstants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LeaseData } from "@/lib/types";

interface LeaseAbstractTabProps {
  leaseData: LeaseData;
  sourceDocument?: {
    fileName: string;
    filePath?: string;
  };
}

export default function LeaseAbstractTab({ 
  leaseData, 
  sourceDocument = { fileName: "280 Richards - OM.pdf", filePath: "/280-Richards-OM.pdf" } 
}: LeaseAbstractTabProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfPath, setPdfPath] = useState(sourceDocument.filePath || "/280-Richards-OM.pdf");
  const [documentTitle, setDocumentTitle] = useState(sourceDocument.fileName || "280 Richards - OM.pdf");
  
  // Update source document when props change
  useEffect(() => {
    if (sourceDocument) {
      setDocumentTitle(sourceDocument.fileName);
      if (sourceDocument.filePath) {
        setPdfPath(sourceDocument.filePath);
      }
    }
  }, [sourceDocument]);
  
  const handleCopyToClipboard = async () => {
    if (!contentRef.current) return;
    
    try {
      // Create a simplified text representation of lease data
      const textContent = `
        ${leaseData.property.name} - Lease Abstract
        
        TENANT INFORMATION
        Tenant: ${leaseData.tenant.name}
        Guarantor: ${leaseData.tenant.guarantor}
        Credit Rating: ${leaseData.tenant.creditRating}
        Market Cap: ${leaseData.tenant.marketCap}
        
        LEASE DATES
        Lease Commencement: ${leaseData.dates.leaseCommencementDate}
        Lease Expiration: ${leaseData.dates.leaseExpirationDate}
        Remaining Term: ${leaseData.dates.remainingTerm}
        
        RENTAL STRUCTURE
        Annual Rent: ${leaseData.financials.annualRent.toLocaleString()}
        Weighted Average Rent PSF: ${leaseData.financials.weightedAverageRentPSF.toFixed(2)}
        Annual Escalations: ${leaseData.financials.annualEscalations}
        
        OPTIONS
        Renewal Options: ${leaseData.options.renewalOptions}
        Other Options: ${leaseData.options.otherOptions}
        
        RECOVERY STRUCTURE
        Real Estate Taxes: ${leaseData.recoveryStructure.realEstateTaxes}
        CAM: ${leaseData.recoveryStructure.CAM}
        Insurance: ${leaseData.recoveryStructure.insurance}
        Management Fee: ${leaseData.recoveryStructure.managementFee}
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
            <LeaseTermsSection leaseData={leaseData} />
          </TabsContent>
          
          <TabsContent value="rent-schedule">
            <RentScheduleSection leaseData={leaseData} />
          </TabsContent>
          
          <TabsContent value="options">
            <OptionsRecoveriesSection leaseData={leaseData} />
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
            {documentTitle}
          </button>
        </div>
        <div className={`flex ${isSmallScreen ? 'w-full' : ''} gap-2`}>
          <ExportPdfButton 
            leaseData={leaseData}
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
        documentTitle={`${leaseData.property.name} - Offering Memorandum`}
      />
    </div>
  );
}