'use client';

import { useState, RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileUp, RefreshCw, X, UploadCloud, 
  AlertCircle, FileX 
} from 'lucide-react';

interface UploadAreaProps {
  file: File | null;
  loading: boolean;
  progress: number;
  error: string | null;
  retryCount: number;
  allowRetry: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onProcessFile: (file: File) => void;
  onRetry: () => void;
}

export function UploadArea({
  file,
  loading,
  progress,
  error,
  retryCount,
  allowRetry,
  fileInputRef,
  onFileSelect,
  onFileRemove,
  onProcessFile,
  onRetry
}: UploadAreaProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  
  // Drag and drop handlers
  const handleDragEvents = {
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    },
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    },
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const droppedFile = e.dataTransfer.files[0];
        onFileSelect(droppedFile);
        
        // Auto-process after a short delay
        if (!loading) {
          setTimeout(() => onProcessFile(droppedFile), 500);
        }
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };
  
  // Helper function for progress message
  const getProgressStatus = (progress: number): string => {
    if (progress < 30) return 'Reading document...';
    if (progress < 60) return 'Analyzing content...';
    if (progress < 90) return 'Extracting lease data...';
    return 'Finalizing results...';
  };
  
  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div 
        className={`bg-blue-50 text-blue-800 p-4 rounded-md border ${
          isDragActive ? 'border-blue-400 border-dashed border-2' : 'border-blue-200'
        } text-sm flex items-start transition-all`}
        {...handleDragEvents}
      >
        <FileUp className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500" />
        <div>
          <p className="font-medium mb-1">Extract lease data from PDF</p>
          <p>
            {isDragActive 
              ? <span className="font-medium text-blue-700">Drop your file here!</span>
              : 'Upload an Offering Memorandum (OM) PDF to automatically extract key lease data. The system will identify tenant details, rental terms, and financial information.'}
          </p>
          {isDragActive && (
            <div className="w-full text-center mt-2">
              <UploadCloud className="h-8 w-8 mx-auto text-blue-500 animate-bounce" />
            </div>
          )}
        </div>
      </div>
      
      {/* File selection controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Select PDF File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {file && (
          <div className="flex-1 text-sm text-gray-500 overflow-hidden flex items-center">
            <span className="truncate">{file.name}</span>
            <span className="ml-2 whitespace-nowrap">({(file.size / 1024).toFixed(1)} KB)</span>
            {!loading && (
              <button
                className="ml-2 text-gray-400 hover:text-gray-600"
                onClick={onFileRemove}
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
        
        <Button 
          onClick={() => file && onProcessFile(file)}
          disabled={!file || loading}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <div className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </div>
          ) : 'Extract Data'}
        </Button>
      </div>
      
      {/* Progress indicator */}
      {loading && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Processing PDF...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {getProgressStatus(progress)}
          </p>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-800 p-3 rounded-md border border-red-200 text-sm flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              {allowRetry && file && retryCount < 3 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-4 text-xs bg-white hover:bg-red-50"
                  onClick={onRetry}
                >
                  Retry
                </Button>
              )}
            </div>
            
            {retryCount >= 3 && (
              <p className="mt-2 text-xs">
                Multiple retry attempts have failed. Please try a different file or contact support.
              </p>
            )}
            
            {error.includes('does not appear to be an Offering Memorandum') && (
              <div className="mt-2 p-2 bg-white rounded border border-red-100 flex items-center gap-2">
                <FileX size={16} className="text-red-500" />
                <span className="text-xs">
                  Try uploading a property offering document that contains lease terms, tenant information, and financial details.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}