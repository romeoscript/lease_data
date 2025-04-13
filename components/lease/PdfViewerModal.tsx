"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from "lucide-react";
import { colors } from "@/utils/styleConstants";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfPath: string;
  documentTitle: string;
}

export default function PdfViewerModal({
  isOpen,
  onClose,
  pdfPath,
  documentTitle,
}: PdfViewerModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    if (zoom < 2) {
      setZoom(zoom + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      setZoom(zoom - 0.1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[90vw] h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle>{documentTitle}</DialogTitle>
            {/* <Button size="icon" variant="ghost" onClick={onClose}>
              <X size={18} />
            </Button> */}
          </div>
          <DialogDescription>
            <div className="flex mt-2 justify-between items-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage <= 1}>
                  <ArrowLeft size={16} />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages || '?'}
                </span>
                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage >= totalPages}>
                  <ArrowRight size={16} />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut size={16} />
                </Button>
                <span className="text-sm">{Math.round(zoom * 100)}%</span>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn size={16} />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(pdfPath, '_blank')}
                  className="gap-1"
                  style={{
                    backgroundColor: colors.table.rowEvenBg,
                    color: colors.primaryText,
                    borderColor: colors.panelBorder
                  }}
                >
                  <Download size={16} style={{ color: colors.secondaryText }} />
                 
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-grow overflow-auto bg-gray-100 p-4 flex justify-center">
          <iframe
            src={pdfPath}
            className="w-full h-full bg-white shadow-lg"
            onLoad={(e) => {
             
              if (totalPages === 0) {
                setTotalPages(19); 
              }
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}