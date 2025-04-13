// src/components/lease/ExportPdfButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { LeaseData } from "@/lib/utils";
import { colors } from "@/utils/styleConstants";

interface ExportPdfButtonProps {
  leaseData: LeaseData;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function ExportPdfButton({ leaseData, containerRef }: ExportPdfButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!containerRef.current) {
      toast.error("Could not locate content to export");
      return;
    }

    try {
      setIsExporting(true);
      
      // Dynamically import libraries only when needed to reduce initial bundle size
      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf")
      ]);
      
      const html2canvas = html2canvasModule.default;
      const jsPDF = jsPDFModule.default;
      
      // Create filename with property name and date
      const propertyAddress = leaseData?.property?.address || "Property";
      const fileName = `${propertyAddress.toString().replace(/\s+/g, '_')}_Lease_Abstract_${new Date().toISOString().split('T')[0]}.pdf`;
      
      const contentElement = containerRef.current;
      
      toast.loading("Generating PDF...");
      
      // First we need to calculate the optimal page size based on content
      const width = contentElement.offsetWidth;
      const height = contentElement.offsetHeight;
      
      // Use html2canvas-pro to capture the content
      const canvas = await html2canvas(contentElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
        // html2canvas-pro has better handling of fonts and SVG
        imageTimeout: 15000, // Longer timeout for complex charts
        ignoreElements: (element) => {
          // Ignore any elements we don't want in the PDF
          return element.classList.contains('pdf-ignore');
        },
        // Add specific CSS that only uses standard colors, avoiding oklch
        onclone: (document) => {
          // Override any potentially problematic CSS variables or color functions
          const style = document.createElement('style');
          style.textContent = `
            :root {
              --background: #ffffff !important;
              --foreground: ${colors.primaryText} !important;
              --primary: ${colors.accent} !important;
              --primary-foreground: #ffffff !important;
              --destructive: ${colors.risk.high.text} !important;
              --muted-foreground: ${colors.secondaryText} !important;
              --border: ${colors.panelBorder} !important;
            }
            * {
              color-scheme: light !important;
            }
            .bg-blue-50 { background-color: ${colors.accentLight} !important; }
            .bg-green-50 { background-color: ${colors.risk.low.bg} !important; }
            .text-blue-600, .text-blue-800 { color: ${colors.accent} !important; }
            .text-green-600, .text-green-700 { color: ${colors.risk.low.text} !important; }
            .border-blue-200 { border-color: ${colors.insights.border} !important; }
            .border-green-200 { border-color: ${colors.risk.low.border} !important; }
            
            /* Chart colors */
            .recharts-line-stroke { stroke-width: 2 !important; }
            .recharts-line-dot { stroke-width: 1 !important; }
            
            /* Table colors */
            thead { background-color: ${colors.table.headerBg} !important; }
            thead th { color: ${colors.table.headerText} !important; }
            tbody tr:nth-child(even) { background-color: ${colors.table.rowEvenBg} !important; }
            tbody tr:nth-child(odd) { background-color: ${colors.table.rowOddBg} !important; }
            tbody td { color: ${colors.table.cellText} !important; border-color: ${colors.table.rowBorder} !important; }

            /* Print optimizations */
            @media print {
              body { -webkit-print-color-adjust: exact; }
              .recharts-surface { overflow: visible !important; }
            }
          `;
          document.head.appendChild(style);
        }
      });
      
      // Calculate PDF dimensions - use A4 ratio but scale based on content width
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (height * pdfWidth) / width;
      
      // Create PDF instance with appropriate dimensions
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth * 1.414 ? "portrait" : "landscape",
        unit: "mm",
        format: [pdfWidth, Math.min(pdfHeight, 297)] // Limit to A4 height maximum
      });
      
      // Add the canvas as an image to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // If content is longer than one page, we need to add more pages
      if (pdfHeight > 297) {
        let remainingHeight = pdfHeight - 297;
        let currentPosition = 297;
        
        while (remainingHeight > 0) {
          pdf.addPage();
          pdf.addImage(
            imgData, 
            'PNG', 
            0, 
            -currentPosition, 
            pdfWidth, 
            pdfHeight
          );
          
          currentPosition += 297;
          remainingHeight -= 297;
        }
      }
      
      // Save the PDF
      pdf.save(fileName);
      
      // Dismiss loading toast and show success
      toast.dismiss("pdf-loading-toast");
      toast.success(`${fileName} has been downloaded`, {
        duration: 3000,
        icon: '📄'
      });
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.dismiss("pdf-loading-toast");
      toast.error("An error occurred while exporting to PDF", {
        duration: 4000,
        icon: '❌'
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-1"
      style={{
        backgroundColor: colors.table.rowEvenBg,
        color: colors.primaryText,
        borderColor: colors.panelBorder
      }}
      onClick={handleExport}
      disabled={isExporting}
    >
      <Download size={14} style={{ color: colors.secondaryText }} />
      <span>{isExporting ? "Exporting..." : "Export PDF"}</span>
    </Button>
  );
}