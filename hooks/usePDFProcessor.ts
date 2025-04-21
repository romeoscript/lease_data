'use client';

import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LeaseData } from '@/lib/types';

// Interfaces for the hook
export interface ExtractedField {
  name: string;
  confidence: number;
  source: string;
  method: string;
}

export interface ExtractionMetadata {
  confidence: number;
  warnings: string[];
  missingFields: string[];
  needsReview: boolean;
  extractedFields: ExtractedField[];
  processedAt: string;
}

export interface FileInfo {
  fileName: string;
  fileUrl?: string;
  fileSize?: number;
  uploadedAt?: string;
}

interface PDFProcessorOptions {
  maxFileSizeMB?: number;
  apiEndpoint?: string;
  onSuccess?: (data: LeaseData, metadata?: ExtractionMetadata, fileInfo?: FileInfo) => void;
}

export function usePDFProcessor({
  maxFileSizeMB = 10,
  apiEndpoint = '/api/process-pdf',
  onSuccess
}: PDFProcessorOptions) {
  // State
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [extractedData, setExtractedData] = useState<LeaseData | null>(null);
  const [extractionWarnings, setExtractionWarnings] = useState<string[]>([]);
  const [extractionMetadata, setExtractionMetadata] = useState<ExtractionMetadata | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Refs
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);
  
  // File validation
  const validateFile = (selectedFile: File): boolean => {
    // Check file type
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return false;
    }
    
    // Check file size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxFileSizeMB) {
      setError(`File size exceeds maximum allowed (${maxFileSizeMB}MB)`);
      return false;
    }
    
    return true;
  };
  
  // Progress simulation
  const startProgressSimulation = () => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Reset progress
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        // Progressive slowdown
        const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 2 : 1;
        return Math.min(prev + increment, 95);
      });
    }, 100);
    
    progressIntervalRef.current = interval;
    return () => clearInterval(interval);
  };
  
  // Event handlers
  const handleFileSelect = (selectedFile: File) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
      setIsSuccess(false);
      setExtractedData(null);
      setExtractionWarnings([]);
      setExtractionMetadata(null);
      setProgress(0);
      setShowDetails(false);
    } else {
      setFile(null);
    }
  };
  
  const handleFileRemove = () => {
    setFile(null);
  };
  
  const resetState = () => {
    setFile(null);
    setError(null);
    setIsSuccess(false);
    setExtractedData(null);
    setExtractionWarnings([]);
    setExtractionMetadata(null);
    setProgress(0);
    setShowDetails(false);
    setRetryCount(0);
  };
  
  const handleRetry = () => {
    if (!file) return;
    setRetryCount(prev => prev + 1);
    setError(null);
    processFile(file);
  };
  
  // API interaction
  const processFile = async (fileToProcess: File) => {
    if (!fileToProcess) return;

    setLoading(true);
    setError(null);
    
    // Start progress simulation
    const clearProgressInterval = startProgressSimulation();
    
    // Unique ID for toast tracking
    const requestId = `pdf-process-${Date.now()}`;
    toast.loading('Processing PDF...', { id: requestId });
    
    try {
      const formData = new FormData();
      formData.append('file', fileToProcess);

      // Handle request timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        setProgress(100); // Complete progress
        
        if (!response.ok) {
          await handleErrorResponse(response, requestId);
          return;
        }
        
        const data = await response.json();
        
        if (data.success && data.leaseData) {
          // Store extracted data
          setExtractedData(data.leaseData);
          
          // Store extraction metadata
          if (data.extractionMetadata) {
            setExtractionMetadata(data.extractionMetadata);
            setExtractionWarnings(data.extractionMetadata.warnings || []);
          }
          
          setIsSuccess(true);
          
          // Call success callback
          if (onSuccess) {
            const fileInfo: FileInfo = {
              fileName: fileToProcess.name,
              fileSize: fileToProcess.size,
              uploadedAt: new Date().toISOString()
            };
            
            onSuccess(data.leaseData, data.extractionMetadata, fileInfo);
          }
          
          toast.dismiss(requestId);
          
          // Show appropriate success message
          if (data.extractionMetadata?.warnings?.length > 0) {
            toast.success('Data extracted with some warnings', {
              icon: '⚠️',
              duration: 4000
            });
          } else {
            toast.success('Data extracted successfully!', {
              duration: 3000
            });
          }
        } else {
          toast.dismiss(requestId);
          toast.error('Unexpected response format', { id: 'format-error' });
          setError('The server returned an unexpected response format. Please try again or contact support.');
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        // Handle abort errors (timeout)
        if (fetchError.name === 'AbortError') {
          toast.dismiss(requestId);
          toast.error('Request timed out', { id: 'timeout-error' });
          setError('The request took too long to complete. Please try again or check your network connection.');
          return;
        }
        
        // Handle network errors
        if (fetchError instanceof TypeError && fetchError.message.includes('network')) {
          toast.dismiss(requestId);
          toast.error('Network error', { id: 'network-error' });
          setError('Could not connect to the server. Please check your internet connection and try again.');
          return;
        }
        
        // Generic error
        toast.dismiss(requestId);
        toast.error('Failed to process PDF');
        setError(fetchError.message || 'An unexpected error occurred');
      }
    } catch (err: any) {
      toast.dismiss(requestId);
      toast.error('Failed to extract data from PDF');
      setError(err.message || 'An unexpected error occurred');
    } finally {
      clearProgressInterval();
      setLoading(false);
    }
  };
  
  // Error handling
  const handleErrorResponse = async (response: Response, toastId: string) => {
    let errorMessage = `Server error: ${response.status}`;
    
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (parseError) {
      console.error('Error parsing error response:', parseError);
    }
    
    toast.dismiss(toastId);
    
    // Handle specific error types
    if (errorMessage.includes('does not appear to be an Offering Memorandum')) {
      toast.error('Invalid document type', { id: 'invalid-doc-error' });
      setError('The uploaded file does not appear to be a property Offering Memorandum. Please upload a valid document.');
    } else if (errorMessage.includes('Unable to extract sufficient data')) {
      toast.error('Insufficient data extracted', { id: 'insufficient-data-error' });
      setError('Unable to extract sufficient data from this document. Please try a different document or contact support.');
    } else {
      toast.error('Failed to process PDF', { id: 'process-error' });
      setError(errorMessage);
    }
    
    throw new Error(errorMessage);
  };
  
  return {
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
  };
}