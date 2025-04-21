'use client';
import { useState } from 'react';
import Head from 'next/head';
import LeaseAbstractTab from '@/components/lease/LeaseAbstractTab';
import { Toaster } from 'react-hot-toast';
import { colors } from "@/utils/styleConstants";
import { PDFUploader } from '@/components/PDFUploader';
import { amazonLeaseData } from '@/lib/data';
import { LeaseData } from '@/lib/types';

interface ExtractionMetadata {
  confidence: number;
  warnings: string[];
  missingFields: string[];
  needsReview: boolean;
  extractedFields: Array<{
    name: string;
    confidence: number;
    source: string;
    method: string;
  }>;
  processedAt: string;
}

export default function Home() {
  const [leaseData, setLeaseData] = useState<LeaseData>(amazonLeaseData);
  const [propertyName, setPropertyName] = useState("280 Richards, Brooklyn, NY");
  const [sourceDocument, setSourceDocument] = useState({
    fileName: "280 Richards - OM.pdf",
    filePath: "/280-Richards-OM.pdf"
  });

  const handleDataExtracted = (extractedData: LeaseData, metadata?: ExtractionMetadata, fileInfo?: {fileName: string, fileUrl?: string}) => {
    // Update the lease data
    setLeaseData(extractedData);
    
    // Update the property name displayed at the top
    if (extractedData.property.address) {
      setPropertyName(extractedData.property.address);
    } else if (extractedData.property.name) {
      setPropertyName(`${extractedData.property.name}, ${extractedData.property.location}`);
    }
    
    // Update the source document info
    if (fileInfo && fileInfo.fileName) {
      setSourceDocument({
        fileName: fileInfo.fileName,
        filePath: fileInfo.fileUrl || "/280-Richards-OM.pdf"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Deal Screening - {propertyName}</title>
        <meta name="description" content="Starboard AI Lease Abstract Tab" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">{propertyName}</h1>
          <p className="text-gray-600">Deal Screening Overview - Lease Abstract</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-4 border-b border-gray-200">
          <button className="pb-2 px-1 text-gray-500">
            Overview
          </button>
          <button className="pb-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
            Lease
          </button>
          <button className="pb-2 px-1 text-gray-500">
            Pipeline
          </button>
          <button className="pb-2 px-1 text-gray-500">
            Settings
          </button>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow">
          <LeaseAbstractTab leaseData={leaseData} sourceDocument={sourceDocument} />
        </div>

        <PDFUploader onDataExtracted={handleDataExtracted} />
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© 2025 Starboard AI - Technical Interview Exercise</p>
      </footer>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: colors.primaryText,
            color: '#ffffff',
          },
          success: {
            style: {
              background: colors.risk.low.text,
              color: '#ffffff',
            },
          },
          error: {
            style: {
              background: colors.risk.high.text,
              color: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}