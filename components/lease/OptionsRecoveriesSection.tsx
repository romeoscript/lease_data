// src/components/lease/OptionsRecoveriesSection.tsx
import React from 'react';
import { LeaseData } from '../../utils/leaseHelpers';

interface OptionsRecoveriesSectionProps {
  leaseData: LeaseData;
}

const OptionsRecoveriesSection: React.FC<OptionsRecoveriesSectionProps> = ({ leaseData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Renewal Options</h3>
        <div className="space-y-3">
          <div className="py-2">
            <div className="font-medium text-gray-800 mb-2">Renewal Terms</div>
            <div className="text-gray-600">{leaseData.options.renewalOptions}</div>
          </div>
          <div className="py-2">
            <div className="font-medium text-gray-800 mb-2">Other Options</div>
            <div className="text-gray-600">{leaseData.options.otherOptions}</div>
          </div>
          <div className="py-2 mt-4">
            <div className="font-medium text-gray-800 mb-2">Option Analysis</div>
            <div className="text-gray-600">
              Based on current market trends and the {leaseData.financials.markToMarket} mark-to-market potential at lease expiration, 
              these FMV renewal options represent significant potential upside for the landlord while 
              providing Amazon with operational flexibility.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Recovery Structure</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Real Estate Taxes</span>
            <span className="font-medium">{leaseData.recoveryStructure.realEstateTaxes}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">CAM (Common Area Maintenance)</span>
            <span className="font-medium">{leaseData.recoveryStructure.CAM}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Insurance</span>
            <span className="font-medium">{leaseData.recoveryStructure.insurance}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Management Fee</span>
            <span className="font-medium">{leaseData.recoveryStructure.managementFee}</span>
          </div>
          <div className="mt-4 py-2">
            <div className="font-medium text-gray-800 mb-2">Recovery Analysis</div>
            <div className="text-gray-600">
              The lease has a modified triple-net structure with the tenant responsible for taxes and 
              CAM, while insurance and management fees are landlord's responsibility. This structure 
              is relatively standard for institutional-grade logistics assets leased to credit tenants.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
        <h3 className="font-semibold text-gray-800 mb-4">Lease Risk Assessment</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-3 rounded-md border border-green-200">
            <div className="font-medium text-green-800 mb-1">Low Risk</div>
            <div className="text-green-700 text-sm">Credit Quality</div>
            <div className="text-green-600 text-xs mt-1">Amazon's {leaseData.tenant.creditRating} credit rating and {leaseData.tenant.marketCap} market cap provides exceptional tenant security</div>
          </div>
          <div className="bg-green-50 p-3 rounded-md border border-green-200">
            <div className="font-medium text-green-800 mb-1">Low Risk</div>
            <div className="text-green-700 text-sm">Term Length</div>
            <div className="text-green-600 text-xs mt-1">{leaseData.dates.remainingTerm} remaining provides strong income security</div>
          </div>
          <div className="bg-green-50 p-3 rounded-md border border-green-200">
            <div className="font-medium text-green-800 mb-1">Low Risk</div>
            <div className="text-green-700 text-sm">Location Quality</div>
            <div className="text-green-600 text-xs mt-1">Prime Brooklyn location with excellent logistics access</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200 md:col-span-3">
            <div className="font-medium text-blue-800 mb-1">Summary Assessment</div>
            <div className="text-blue-700 text-sm">
              This lease represents an institutional-grade investment with exceptional credit quality, 
              long-term income security, and strong embedded rent growth. The 100% FMV renewal options provide 
              potential for significant upside at the end of the initial term.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg md:col-span-2 mt-4">
        <h3 className="font-semibold text-gray-800 mb-4">Market Context</h3>
        <div className="text-gray-600">
          <p className="mb-2">
            Despite moderating leasing totals nationwide, the Brooklyn submarket surrounding 280 Richards 
            stands at approximately 5% vacancy, significantly below national averages.
          </p>
          <p className="mb-2">
            Borough average taking rents continue to exceed $40 PSF, which includes Class A assets that are 
            older and structurally inferior to 280 Richards.
          </p>
          <p>
            Key factors contributing to constrained logistics supply in Red Hook include exclusive zoning 
            for last-mile use in M or C9 zones, declining inventory due to residential conversions, and 
            a new industrial permit introduced in May 2024 that restricts future development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OptionsRecoveriesSection;