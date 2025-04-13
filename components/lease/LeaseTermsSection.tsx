
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { LeaseData, generateProjectedRentData } from '../../utils/leaseHelpers';

interface LeaseTermsSectionProps {
  leaseData: LeaseData;
}

const LeaseTermsSection: React.FC<LeaseTermsSectionProps> = ({ leaseData }) => {

  const projectedRentData = generateProjectedRentData(leaseData);
  
 
  const colors = {
    panelBg: '#F8FAFC',
    panelBorder: '#E2E8F0',
    headingText: '#1E293B',
    primaryText: '#334155',
    secondaryText: '#64748B',
    accent: '#0F52BA',
    accentLight: '#E6F0FF',
    chart: {
      warehouse: '#0F52BA',
      parking: '#16A34A',
      grid: '#E2E8F0',
    },
    warning: {
      bg: '#FEF9C3',
      border: '#FDE047',
      text: '#854D0E',
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`
      }} className="p-5">
        <h3 style={{ color: colors.headingText }} className="text-lg font-semibold mb-4">
          Tenant Information
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: colors.panelBorder }}>
            <span style={{ color: colors.secondaryText }}>Tenant</span>
            <span style={{ color: colors.primaryText, fontWeight: 500 }}>{leaseData.tenant.name}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: colors.panelBorder }}>
            <span style={{ color: colors.secondaryText }}>Guarantor</span>
            <span style={{ color: colors.primaryText, fontWeight: 500 }}>{leaseData.tenant.guarantor}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: colors.panelBorder }}>
            <span style={{ color: colors.secondaryText }}>Credit Rating</span>
            <div className="flex items-center">
              <span style={{ 
                backgroundColor: '#E5F7ED', 
                color: '#047857',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.875rem'
              }}>
                {leaseData.tenant.creditRating}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: colors.secondaryText }}>Market Cap</span>
            <span style={{ color: colors.primaryText, fontWeight: 500 }}>{leaseData.tenant.marketCap}</span>
          </div>
        </div>
      </div>

      {/* Lease Dates Panel */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`
      }} className="p-5">
        <h3 style={{ color: colors.headingText }} className="text-lg font-semibold mb-4">
          Lease Dates
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: colors.panelBorder }}>
            <span style={{ color: colors.secondaryText }}>Lease Commencement (LCD)</span>
            <span style={{ color: colors.primaryText, fontWeight: 500 }}>{leaseData.dates.leaseCommencementDate}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: colors.panelBorder }}>
            <span style={{ color: colors.secondaryText }}>Lease Expiration (LXD)</span>
            <span style={{ color: colors.primaryText, fontWeight: 500 }}>{leaseData.dates.leaseExpirationDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: colors.secondaryText }}>Remaining Term</span>
            <div className="flex items-center">
              <span style={{ 
                backgroundColor: '#E5F7ED', 
                color: '#047857',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.875rem'
              }}>
                {leaseData.dates.remainingTerm}
              </span>
            </div>
          </div>
          {leaseData.dates.remainingTerm.includes("1") && (
            <div style={{ 
              backgroundColor: colors.warning.bg,
              borderColor: colors.warning.border,
              borderWidth: '1px',
              borderRadius: '6px',
              padding: '10px 12px',
              marginTop: '12px'
            }}>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.warning.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span style={{ color: colors.warning.text, fontWeight: 500, fontSize: '0.875rem' }}>
                  Lease roll within 12 months
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rental Structure Panel */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`
      }} className="p-5">
        <h3 style={{ color: colors.headingText }} className="text-lg font-semibold mb-4">
          Rental Structure by Component
        </h3>
        <div className="space-y-4">
          {leaseData.property.components.map((component, index) => (
            <div key={index} className="pb-3 mb-2" style={{ 
              borderBottom: index < leaseData.property.components.length - 1 ? `1px solid ${colors.panelBorder}` : 'none'
            }}>
              <div className="flex justify-between items-center mb-2">
                <span style={{ color: colors.primaryText, fontWeight: 500 }}>{component.type}</span>
                <span style={{ 
                  backgroundColor: colors.accentLight, 
                  color: colors.accent,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}>
                  {component.sf.toLocaleString()} SF
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span style={{ color: colors.secondaryText, fontSize: '0.75rem' }}>Annual Rent</span>
                  <div style={{ color: colors.primaryText, fontWeight: 500 }}>${component.rent.toLocaleString()}</div>
                </div>
                <div>
                  <span style={{ color: colors.secondaryText, fontSize: '0.75rem' }}>Rent PSF</span>
                  <div style={{ color: colors.primaryText, fontWeight: 500 }}>${component.rentPSF.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-3 mt-2" style={{ borderTop: `2px solid ${colors.panelBorder}` }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span style={{ color: colors.secondaryText, fontSize: '0.75rem' }}>Total Annual Rent</span>
                <div style={{ color: colors.headingText, fontWeight: 600 }}>${leaseData.financials.annualRent.toLocaleString()}</div>
              </div>
              <div>
                <span style={{ color: colors.secondaryText, fontSize: '0.75rem' }}>Weighted Avg Rent PSF</span>
                <div style={{ color: colors.headingText, fontWeight: 600 }}>${leaseData.financials.weightedAverageRentPSF.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rent Escalations Panel */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`
      }} className="p-5">
        <h3 style={{ color: colors.headingText }} className="text-lg font-semibold mb-4">
          Rent Escalations
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: colors.panelBorder }}>
            <span style={{ color: colors.secondaryText }}>Annual Increases</span>
            <span style={{ 
              backgroundColor: colors.accentLight, 
              color: colors.accent,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              {leaseData.financials.annualEscalations}
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: colors.panelBorder }}>
            <span style={{ color: colors.secondaryText }}>Est. Mark-to-Market at Expiry</span>
            <span style={{ 
              backgroundColor: '#E5F7ED', 
              color: '#047857',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              {leaseData.financials.markToMarket}
            </span>
          </div>
          <div className="mt-5">
            <div className="h-52" style={{ marginLeft: '-10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projectedRentData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
                  <XAxis 
                    dataKey="year" 
                    label={{ 
                      value: 'Year', 
                      position: 'insideBottom', 
                      offset: -15,
                      style: { fontSize: '12px', fill: colors.secondaryText }
                    }}
                    tick={{ fontSize: 11, fill: colors.secondaryText }}
                  />
                  <YAxis 
                    domain={[0, 60]}
                    tick={{ fontSize: 11, fill: colors.secondaryText }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`$${(value as number).toFixed(2)}`, 'Rent PSF']}
                    labelFormatter={(value) => `Year ${value}`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: `1px solid ${colors.panelBorder}`,
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={30} 
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="warehouseRent" 
                    name="Warehouse" 
                    stroke={colors.chart.warehouse} 
                    strokeWidth={2}
                    dot={{ fill: colors.chart.warehouse, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="parkingRent" 
                    name="Parking" 
                    stroke={colors.chart.parking} 
                    strokeWidth={2}
                    dot={{ fill: colors.chart.parking, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-2" style={{ fontSize: '0.75rem', color: colors.secondaryText }}>
              <div className="flex items-center mr-4">
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: colors.chart.warehouse,
                  marginRight: '6px'
                }}></div>
                <span>Warehouse Space ($36.92 PSF initial)</span>
              </div>
              <div className="flex items-center">
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: colors.chart.parking,
                  marginRight: '6px'
                }}></div>
                <span>Parking ($12.66 PSF initial)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseTermsSection;