'use client';

import { useRef } from 'react';
import { LeaseData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { usePDFProcessor, ExtractionMetadata, FileInfo } from '@/hooks/usePDFProcessor';
import { UploadArea } from './UploadArea';
import { ResultsView } from './ResultsView';

interface PDFUploaderProps {
  onDataExtracted?: (
    data: LeaseData, 
    metadata?: ExtractionMetadata,
    fileInfo?: FileInfo
  ) => void;
  maxFileSizeMB?: number;
  allowRetry?: boolean;
  apiEndpoint?: string;
}

export function PDFUploader({ 
  onDataExtracted, 
  maxFileSizeMB = 10, 
  allowRetry = true,
  apiEndpoint = '/api/process-pdf'
}: PDFUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    file,
    loading,
    progress,
    error,
    retryCount,
    isSuccess,
    extractedData,
    extractionWarnings,
    extractionMetadata,
    showDetails,
    setShowDetails,
    handleFileSelect,
    handleFileRemove,
    processFile,
    handleRetry,
    resetState
  } = usePDFProcessor({
    maxFileSizeMB,
    apiEndpoint,
    onSuccess: (data, metadata, fileInfo) => {
      onDataExtracted?.(data, metadata, fileInfo);
    }
  });

  return (
    <Card className="mt-6 border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          Upload Offering Memorandum
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <ResultsView
            propertyName={extractedData?.property?.name || null}
            warnings={extractionWarnings}
            metadata={extractionMetadata}
            showDetails={showDetails}
            onToggleDetails={() => setShowDetails(!showDetails)}
            onProcessAnother={resetState}
            onReplaceFile={() => fileInputRef.current?.click()}
            hasFile={!!file}
          />
        ) : (
          <UploadArea
            file={file}
            loading={loading}
            progress={progress}
            error={error}
            retryCount={retryCount}
            allowRetry={allowRetry}
            // fileInputRef={fileInputRef}
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            onProcessFile={processFile}
            onRetry={handleRetry}
          />
        )}
      </CardContent>
    </Card>
  );
}