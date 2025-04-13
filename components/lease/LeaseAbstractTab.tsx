// src/components/lease/LeaseAbstractTab.tsx
'use client'
import React, { useState } from 'react';
import LeaseTermsSection from './LeaseTermsSection';
import RentScheduleSection from './RentScheduleSection';
import OptionsRecoveriesSection from './OptionsRecoveriesSection';
import amazonLeaseData from '../../data/leaseData';

const LeaseAbstractTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('leaseTerms');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button 
          className={`pb-2 px-1 ${activeSection === 'leaseTerms' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveSection('leaseTerms')}
        >
          Lease Terms
        </button>
        <button 
          className={`pb-2 px-1 ${activeSection === 'rentSchedule' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveSection('rentSchedule')}
        >
          Rent Schedule
        </button>
        <button 
          className={`pb-2 px-1 ${activeSection === 'options' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveSection('options')}
        >
          Options & Recoveries
        </button>
      </div>

      {/* Content Sections */}
      {activeSection === 'leaseTerms' && <LeaseTermsSection leaseData={amazonLeaseData} />}
      {activeSection === 'rentSchedule' && <RentScheduleSection leaseData={amazonLeaseData} />}
      {activeSection === 'options' && <OptionsRecoveriesSection leaseData={amazonLeaseData} />}

      {/* Source and Export Options */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200 pt-4">
        <div>
          <span>Source: </span>
          <a href="#" className="text-blue-600 hover:underline">280 Richards - OM.pdf</a>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaseAbstractTab;