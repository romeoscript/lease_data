'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { ExtractionMetadata } from '@/hooks/usePDFProcessor';


interface ResultsViewProps {
  propertyName: string | null;
  warnings: string[];
  metadata: ExtractionMetadata | null;
  showDetails: boolean;
  onToggleDetails: () => void;
  onProcessAnother: () => void;
  onReplaceFile: () => void;
  hasFile: boolean;
}

export function ResultsView({
  propertyName,
  warnings,
  metadata,
  showDetails,
  onToggleDetails,
  onProcessAnother,
  onReplaceFile,
  hasFile
}: ResultsViewProps) {
  // Helper functions
  const formatConfidence = (value: number): string => {
    return `${Math.round(value * 100)}%`;
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 0.8) return { label: 'High', color: 'bg-green-500' };
    if (confidence >= 0.6) return { label: 'Moderate', color: 'bg-yellow-500' };
    if (confidence >= 0.4) return { label: 'Low', color: 'bg-orange-500' };
    return { label: 'Very Low', color: 'bg-red-500' };
  };
  
  const getConfidenceColor = (confidence: number): string => {
    if (confidence > 0.7) return 'bg-green-50 text-green-700';
    if (confidence > 0.4) return 'bg-yellow-50 text-yellow-700';
    return 'bg-red-50 text-red-700';
  };

  return (
    <div className="space-y-4">
      {/* Success message */}
      <div className="bg-green-50 text-green-800 p-4 rounded-md border border-green-200">
        <div className="flex items-center mb-3">
          <Check className="h-5 w-5 mr-2 text-green-600" />
          <h3 className="font-medium text-green-900">Data Successfully Extracted</h3>
        </div>
        
        {propertyName && (
          <p className="mb-3">
            Property data for <strong>{propertyName}</strong> has been extracted and applied to the interface.
          </p>
        )}
        
        {metadata && (
          <div className="flex items-center mt-2 mb-2">
            <div className="text-sm text-green-800 mr-3">
              Extraction confidence: <strong>{formatConfidence(metadata.confidence)}</strong>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              getConfidenceLevel(metadata.confidence).color
            } text-white`}>
              {getConfidenceLevel(metadata.confidence).label}
            </div>
          </div>
        )}
        
        {/* Warnings section */}
        {warnings.length > 0 && (
          <div className="mt-3 mb-2">
            <button
              onClick={onToggleDetails}
              className="text-blue-600 hover:underline text-sm flex items-center"
            >
              <AlertTriangle size={16} className="mr-1 text-amber-500" />
              {showDetails ? 'Hide' : 'Show'} extraction warnings ({warnings.length})
            </button>
            
            {showDetails && (
              <div className="mt-2 bg-amber-50 p-3 rounded text-amber-800 text-sm border border-amber-200">
                <p className="font-medium mb-2">The following data points may need verification:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <p className="text-sm mt-3">
          You can now see the updated information in the lease details tabs above.
        </p>
        
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onProcessAnother}
          >
            Process Another PDF
          </Button>
          {hasFile && (
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600"
              onClick={onReplaceFile}
            >
              Replace with Different File
            </Button>
          )}
        </div>
      </div>
      
      {/* Extraction details */}
      {metadata && (
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader className="py-3">
            <CardTitle className="text-sm flex items-center">
              <Info className="h-4 w-4 mr-2 text-blue-500" />
              Extraction Details
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-sm space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500">Processed at:</span>
                  <div>{new Date(metadata.processedAt).toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-slate-500">Missing fields:</span>
                  <div>
                    {metadata.missingFields.length === 0 ? (
                      <span className="text-green-600">None</span>
                    ) : (
                      <span>{metadata.missingFields.join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <span className="text-slate-500 block mb-1">Field Extraction Confidence:</span>
                <div className="space-y-2">
                  {metadata.extractedFields.map((field, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-1/3 text-slate-700">{field.name}:</div>
                      <div className="w-1/3">
                        <Progress value={field.confidence * 100} className="h-2" />
                      </div>
                      <div className="w-1/3 pl-3 text-xs">
                        <Badge 
                          variant="outline" 
                          className={getConfidenceColor(field.confidence)}
                        >
                          {formatConfidence(field.confidence)}
                        </Badge>
                        {field.source !== 'extracted' && (
                          <Badge variant="outline" className="ml-1 bg-blue-50 text-blue-700">
                            {field.source}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}