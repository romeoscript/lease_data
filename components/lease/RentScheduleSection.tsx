// src/components/lease/RentScheduleSection.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from 'recharts';
import { LeaseData, generateProjectedRentData, calculateRentForYear } from '../../utils/leaseHelpers';

interface RentScheduleSectionProps {
  leaseData: LeaseData;
}

const RentScheduleSection: React.FC<RentScheduleSectionProps> = ({ leaseData }) => {

  const projectedRentData = generateProjectedRentData(leaseData);
  
 
  const currentYear = new Date().getFullYear();
  

  const [viewAllYears, setViewAllYears] = useState(false);
  

  const colors = {
    panelBg: '#F8FAFC',
    panelBorder: '#E2E8F0',
    headingText: '#1E293B',
    primaryText: '#334155',
    secondaryText: '#64748B',
    accent: '#0F52BA',
    accentLight: '#E6F0FF',
    chart: {
      warehouseActual: '#0F52BA',
      parkingActual: '#16A34A',
      warehouseMarket: '#93C5FD',
      parkingMarket: '#86EFAC',
      grid: '#E2E8F0',
      reference: '#CBD5E1'
    },
    table: {
      headerBg: '#F1F5F9',
      headerText: '#475569',
      rowEvenBg: '#FFFFFF',
      rowOddBg: '#F8FAFC',
      rowBorder: '#E2E8F0',
      cellText: '#334155',
      highlightText: '#0F52BA'
    },
    insight: {
      bg: '#E6F0FF',
      border: '#BFDBFE',
      heading: '#1E40AF',
      text: '#3B82F6'
    }
  };
  
  // Filtered data for table display
  const displayData = viewAllYears 
    ? projectedRentData 
    : projectedRentData.filter((_, idx) => idx === 0 || idx === 4 || idx === 9 || idx === 12);

  // Format currency with fixed options
  const formatCurrency = (value: number, maximumFractionDigits: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits
    }).format(value);
  };

  return (
    <div>
      {/* Rent Schedule Table */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`,
        marginBottom: '24px'
      }} className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 style={{ color: colors.headingText }} className="text-lg font-semibold">
            Rent Schedule
          </h3>
          <button
            onClick={() => setViewAllYears(!viewAllYears)}
            style={{ 
              backgroundColor: colors.accentLight,
              color: colors.accent,
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            {viewAllYears ? 'Show Key Years' : 'Show All Years'}
          </button>
        </div>
        
        <div className="overflow-x-auto" style={{ borderRadius: '6px', border: `1px solid ${colors.table.rowBorder}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: colors.table.headerBg }}>
              <tr>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: colors.table.headerText,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${colors.table.rowBorder}`
                }}>
                  Lease Year
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: colors.table.headerText,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${colors.table.rowBorder}`
                }}>
                  Period
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'right', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: colors.table.headerText,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${colors.table.rowBorder}`
                }}>
                  Warehouse Rent PSF
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'right', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: colors.table.headerText,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${colors.table.rowBorder}`
                }}>
                  Parking Rent PSF
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'right', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: colors.table.headerText,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${colors.table.rowBorder}`
                }}>
                  Annual Rent
                </th>
                <th style={{ 
                  padding: '12px 16px', 
                  textAlign: 'right', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: colors.table.headerText,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${colors.table.rowBorder}`
                }}>
                  Monthly Rent
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((data, index) => {
                const year = currentYear + index;
                const annualRent = (data.warehouseRent * leaseData.property.components[0].sf) + (data.parkingRent * leaseData.property.components[1].sf);
                const monthlyRent = annualRent / 12;
                
                // Calculate market comparison data
                const marketRatio = ((data.warehouseRent / data.marketRentWarehouse) * 100).toFixed(1);
                
                return (
                  <tr 
                    key={index} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? colors.table.rowEvenBg : colors.table.rowOddBg,
                      borderBottom: `1px solid ${colors.table.rowBorder}`,
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F0F9FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? colors.table.rowEvenBg : colors.table.rowOddBg;
                    }}
                  >
                    <td style={{ 
                      padding: '14px 16px', 
                      fontSize: '0.875rem', 
                      fontWeight: 500, 
                      color: colors.table.cellText,
                      whiteSpace: 'nowrap'
                    }}>
                      <div style={{ 
                        display: 'inline-block',
                        backgroundColor: index === 0 ? '#F0FDF4' : 
                                        index === projectedRentData.length - 1 ? '#FDF2F8' : 
                                        colors.accentLight,
                        color: index === 0 ? '#047857' : 
                               index === projectedRentData.length - 1 ? '#BE185D' : 
                               colors.accent,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        Year {index + 1}
                      </div>
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      fontSize: '0.875rem', 
                      color: colors.secondaryText,
                      whiteSpace: 'nowrap'
                    }}>
                      {year}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      fontSize: '0.875rem', 
                      color: colors.primaryText,
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                      fontFamily: 'monospace'
                    }}>
                      {formatCurrency(data.warehouseRent)}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      fontSize: '0.875rem', 
                      color: colors.primaryText,
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                      fontFamily: 'monospace'
                    }}>
                      {formatCurrency(data.parkingRent)}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      fontSize: '0.875rem', 
                      fontWeight: 600, 
                      color: colors.table.highlightText,
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                      fontFamily: 'monospace'
                    }}>
                      {formatCurrency(annualRent, 0)}
                    </td>
                    <td style={{ 
                      padding: '14px 16px', 
                      fontSize: '0.875rem', 
                      color: colors.primaryText,
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                      fontFamily: 'monospace'
                    }}>
                      {formatCurrency(monthlyRent, 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!viewAllYears && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '12px', 
            fontSize: '0.75rem', 
            color: colors.secondaryText 
          }}>
            Showing selected years. Click "Show All Years" to view complete schedule.
          </div>
        )}
      </div>
      
      {/* Rent Projection Chart */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`,
        marginBottom: '24px',
        padding: '20px'
      }}>
        <h3 style={{ color: colors.headingText }} className="text-lg font-semibold mb-4">
          Rent Projection Visualization
        </h3>
        <div className="h-80" style={{ marginLeft: '-10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={projectedRentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.chart.grid} />
              <XAxis 
                dataKey="year" 
                label={{ 
                  value: 'Lease Year', 
                  position: 'insideBottom', 
                  offset: -15,
                  style: { fontSize: '12px', fill: colors.secondaryText }
                }}
                tick={{ fontSize: 11, fill: colors.secondaryText }}
              />
              <YAxis 
                label={{ 
                  value: 'Rent PSF ($)', 
                  angle: -90, 
                  position: 'insideLeft', 
                  style: { fontSize: '12px', fill: colors.secondaryText } 
                }}
                tick={{ fontSize: 11, fill: colors.secondaryText }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: any) => [formatCurrency(value as number), 'Rent PSF']}
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
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px' }}
              />
              <ReferenceLine 
                y={40} 
                label={{ 
                  value: 'Current Market Base ($40.00)', 
                  position: 'right', 
                  fill: colors.secondaryText, 
                  fontSize: 11 
                }} 
                stroke={colors.chart.reference} 
                strokeDasharray="3 3" 
              />
              <Line 
                type="monotone" 
                dataKey="warehouseRent" 
                name="Warehouse (Actual)" 
                stroke={colors.chart.warehouseActual} 
                strokeWidth={2.5}
                dot={{ fill: colors.chart.warehouseActual, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="parkingRent" 
                name="Parking (Actual)" 
                stroke={colors.chart.parkingActual} 
                strokeWidth={2.5}
                dot={{ fill: colors.chart.parkingActual, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="marketRentWarehouse" 
                name="Warehouse (Market)" 
                stroke={colors.chart.warehouseMarket} 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: colors.chart.warehouseMarket, r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="marketRentParking" 
                name="Parking (Market)" 
                stroke={colors.chart.parkingMarket} 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: colors.chart.parkingMarket, r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Market Rent Analysis */}
      <div style={{ 
        backgroundColor: colors.insight.bg, 
        borderRadius: '8px',
        border: `1px solid ${colors.insight.border}`,
        padding: '16px 20px'
      }}>
        <div className="flex items-start">
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '50%', 
            width: '28px', 
            height: '28px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
            marginRight: '12px',
            marginTop: '2px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.insight.heading} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div>
            <h3 style={{ color: colors.insight.heading, fontWeight: 600, marginBottom: '8px' }}>Market Rent Analysis</h3>
            <div style={{ color: colors.insight.text, fontSize: '0.875rem', lineHeight: 1.6 }}>
              <p className="mb-3">
                Based on current market conditions in the Brooklyn logistics submarket, the lease is 
                projected to be <span style={{ fontWeight: 600 }}>approximately 30% below market at the end of the initial term</span>. The 
                charts above illustrate the growing spread between contract rent and market rent over 
                the lease term.
              </p>
              <p>
                Amazon's lease terms were negotiated in 2019, and since then, average Class A rents 
                have increased significantly to $40+ PSF in the NYC boroughs. This presents a strong 
                mark-to-market opportunity at lease expiration, with potential for substantial income growth.
              </p>
            </div>
          </div>
        </div>
        
        {/* Key metrics summary cards */}
        <div className="grid grid-cols-4 gap-4 mt-4" style={{ borderTop: `1px solid ${colors.insight.border}`, paddingTop: '16px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '6px', 
            padding: '12px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: colors.secondaryText, marginBottom: '4px' }}>Current Warehouse PSF</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: colors.primaryText }}>{formatCurrency(projectedRentData[0].warehouseRent)}</div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '6px', 
            padding: '12px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: colors.secondaryText, marginBottom: '4px' }}>Year 13 Warehouse PSF</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: colors.primaryText }}>{formatCurrency(projectedRentData[12].warehouseRent)}</div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '6px', 
            padding: '12px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: colors.secondaryText, marginBottom: '4px' }}>Projected Market PSF (Year 13)</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: colors.insight.heading }}>{formatCurrency(projectedRentData[12].marketRentWarehouse)}</div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '6px', 
            padding: '12px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: colors.secondaryText, marginBottom: '4px' }}>Est. Mark-to-Market</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#047857' }}>+{leaseData.financials.markToMarket}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentScheduleSection;