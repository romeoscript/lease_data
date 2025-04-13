// src/components/lease/OptionsRecoveriesSection.tsx
import React from 'react';
import { LeaseData } from '../../utils/leaseHelpers';

interface OptionsRecoveriesSectionProps {
  leaseData: LeaseData;
}

const OptionsRecoveriesSection: React.FC<OptionsRecoveriesSectionProps> = ({ leaseData }) => {
  // Custom colors that don't rely on Tailwind classes
  const colors = {
    panelBg: '#F8FAFC',
    panelBorder: '#E2E8F0',
    headingText: '#1E293B',
    primaryText: '#334155',
    secondaryText: '#64748B',
    accent: '#0F52BA',
    accentLight: '#E6F0FF',
    riskColors: {
      low: {
        bg: '#ECFDF5',
        border: '#A7F3D0',
        title: '#047857',
        text: '#059669',
        subtext: '#10B981'
      },
      medium: {
        bg: '#FEF3C7',
        border: '#FCD34D',
        title: '#B45309',
        text: '#D97706',
        subtext: '#F59E0B'
      },
      high: {
        bg: '#FEE2E2',
        border: '#FECACA',
        title: '#B91C1C',
        text: '#DC2626',
        subtext: '#EF4444'
      }
    },
    insights: {
      bg: '#E6F0FF',
      border: '#BFDBFE',
      title: '#1E40AF',
      text: '#3B82F6'
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Renewal Options Panel */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`
      }} className="p-5">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          <h3 style={{ color: colors.headingText }} className="text-lg font-semibold">
            Renewal Options
          </h3>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '6px',
          border: `1px solid ${colors.panelBorder}`,
          marginBottom: '16px',
          padding: '16px'
        }}>
          <div style={{ color: colors.accent, fontWeight: 600, marginBottom: '8px' }}>
            Renewal Terms
          </div>
          <div style={{ 
            color: colors.primaryText,
            fontSize: '0.9375rem',
            lineHeight: 1.5,
          }}>
            <div style={{
              backgroundColor: colors.accentLight,
              borderRadius: '6px',
              padding: '10px 12px',
              fontWeight: 500
            }}>
              {leaseData.options.renewalOptions}
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '6px',
          border: `1px solid ${colors.panelBorder}`,
          marginBottom: '16px',
          padding: '16px'
        }}>
          <div style={{ color: colors.accent, fontWeight: 600, marginBottom: '8px' }}>
            Other Options
          </div>
          <div style={{ 
            color: colors.primaryText,
            fontSize: '0.9375rem',
            lineHeight: 1.5
          }}>
            <div style={{
              backgroundColor: colors.accentLight,
              borderRadius: '6px',
              padding: '10px 12px',
              fontWeight: 500
            }}>
              {leaseData.options.otherOptions}
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '6px',
          border: `1px solid ${colors.panelBorder}`,
          padding: '16px'
        }}>
          <div style={{ color: colors.accent, fontWeight: 600, marginBottom: '8px' }}>
            Option Analysis
          </div>
          <div style={{ 
            color: colors.primaryText,
            fontSize: '0.9375rem',
            lineHeight: 1.6
          }}>
            Based on current market trends and the <span style={{ fontWeight: 600, color: colors.riskColors.low.title }}>{leaseData.financials.markToMarket}</span> mark-to-market potential at lease expiration, 
            these FMV renewal options represent significant potential upside for the landlord while 
            providing Amazon with operational flexibility.
          </div>
        </div>
      </div>

      {/* Recovery Structure Panel */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`
      }} className="p-5">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h3 style={{ color: colors.headingText }} className="text-lg font-semibold">
            Recovery Structure
          </h3>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '6px',
          border: `1px solid ${colors.panelBorder}`,
          overflow: 'hidden',
          marginBottom: '16px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ 
                  padding: '12px 16px',
                  borderBottom: `1px solid ${colors.panelBorder}`,
                  color: colors.secondaryText,
                  width: '60%'
                }}>Real Estate Taxes</td>
                <td style={{ 
                  padding: '12px 16px',
                  borderBottom: `1px solid ${colors.panelBorder}`,
                  fontWeight: 500,
                  color: colors.primaryText,
                  textAlign: 'right'
                }}>
                  <span style={{
                    backgroundColor: colors.riskColors.low.bg,
                    color: colors.riskColors.low.title,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    {leaseData.recoveryStructure.realEstateTaxes}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px 16px',
                  borderBottom: `1px solid ${colors.panelBorder}`,
                  color: colors.secondaryText
                }}>CAM (Common Area Maintenance)</td>
                <td style={{ 
                  padding: '12px 16px',
                  borderBottom: `1px solid ${colors.panelBorder}`,
                  fontWeight: 500,
                  color: colors.primaryText,
                  textAlign: 'right'
                }}>
                  <span style={{
                    backgroundColor: colors.riskColors.low.bg,
                    color: colors.riskColors.low.title,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    {leaseData.recoveryStructure.CAM}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px 16px',
                  borderBottom: `1px solid ${colors.panelBorder}`,
                  color: colors.secondaryText
                }}>Insurance</td>
                <td style={{ 
                  padding: '12px 16px',
                  borderBottom: `1px solid ${colors.panelBorder}`,
                  fontWeight: 500,
                  color: colors.primaryText,
                  textAlign: 'right'
                }}>
                  <span style={{
                    backgroundColor: colors.accentLight,
                    color: colors.accent,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    {leaseData.recoveryStructure.insurance}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px 16px',
                  color: colors.secondaryText
                }}>Management Fee</td>
                <td style={{ 
                  padding: '12px 16px',
                  fontWeight: 500,
                  color: colors.primaryText,
                  textAlign: 'right'
                }}>
                  <span style={{
                    backgroundColor: colors.accentLight,
                    color: colors.accent,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    {leaseData.recoveryStructure.managementFee}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '6px',
          border: `1px solid ${colors.panelBorder}`,
          padding: '16px'
        }}>
          <div style={{ color: colors.accent, fontWeight: 600, marginBottom: '8px' }}>
            Recovery Analysis
          </div>
          <div style={{ 
            color: colors.primaryText,
            fontSize: '0.9375rem',
            lineHeight: 1.6
          }}>
            The lease has a modified triple-net structure with the tenant responsible for taxes and 
            CAM, while insurance and management fees are landlord's responsibility. This structure 
            is relatively standard for institutional-grade logistics assets leased to credit tenants.
          </div>
        </div>
      </div>

      {/* Lease Risk Assessment Panel */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`
      }} className="p-5 md:col-span-2">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          <h3 style={{ color: colors.headingText }} className="text-lg font-semibold">
            Lease Risk Assessment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            border: `1px solid ${colors.riskColors.low.border}`,
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: colors.riskColors.low.bg,
              padding: '12px 16px',
              borderBottom: `1px solid ${colors.riskColors.low.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ color: colors.riskColors.low.title, fontWeight: 600 }}>
                Credit Quality
              </span>
              <span style={{ 
                backgroundColor: 'white',
                color: colors.riskColors.low.title,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '99px',
                fontSize: '0.75rem'
              }}>
                Low Risk
              </span>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: '0.875rem', color: colors.primaryText, lineHeight: 1.5 }}>
                Amazon's <span style={{ fontWeight: 600 }}>{leaseData.tenant.creditRating}</span> credit rating and <span style={{ fontWeight: 600 }}>{leaseData.tenant.marketCap}</span> market cap provides exceptional tenant security
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            border: `1px solid ${colors.riskColors.low.border}`,
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: colors.riskColors.low.bg,
              padding: '12px 16px',
              borderBottom: `1px solid ${colors.riskColors.low.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ color: colors.riskColors.low.title, fontWeight: 600 }}>
                Term Length
              </span>
              <span style={{ 
                backgroundColor: 'white',
                color: colors.riskColors.low.title,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '99px',
                fontSize: '0.75rem'
              }}>
                Low Risk
              </span>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: '0.875rem', color: colors.primaryText, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600 }}>{leaseData.dates.remainingTerm}</span> remaining provides strong income security and long-term cash flow visibility
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            border: `1px solid ${colors.riskColors.low.border}`,
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: colors.riskColors.low.bg,
              padding: '12px 16px',
              borderBottom: `1px solid ${colors.riskColors.low.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ color: colors.riskColors.low.title, fontWeight: 600 }}>
                Location Quality
              </span>
              <span style={{ 
                backgroundColor: 'white',
                color: colors.riskColors.low.title,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '99px',
                fontSize: '0.75rem'
              }}>
                Low Risk
              </span>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: '0.875rem', color: colors.primaryText, lineHeight: 1.5 }}>
                Prime Brooklyn location with excellent logistics access to 2.8M consumers and critical Northeast thoroughfares
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: colors.insights.bg,
          borderRadius: '8px',
          border: `1px solid ${colors.insights.border}`,
          padding: '16px'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            color: colors.insights.title,
            fontWeight: 600,
            marginBottom: '8px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Summary Assessment
          </div>
          <div style={{ 
            color: colors.primaryText,
            fontSize: '0.9375rem',
            lineHeight: 1.6
          }}>
            This lease represents an institutional-grade investment with exceptional credit quality, 
            long-term income security, and strong embedded rent growth. The 100% FMV renewal options provide 
            potential for significant upside at the end of the initial term. Overall, this property exhibits 
            a <span style={{ fontWeight: 600, color: colors.riskColors.low.title }}>Low Risk</span> profile with attractive upside characteristics.
          </div>
        </div>
      </div>

      {/* Market Context Panel */}
      <div style={{ 
        backgroundColor: colors.panelBg, 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: `1px solid ${colors.panelBorder}`
      }} className="p-5 md:col-span-2">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <h3 style={{ color: colors.headingText }} className="text-lg font-semibold">
            Market Context
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ 
              fontSize: '0.75rem', 
              color: colors.secondaryText, 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Submarket Vacancy
            </div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: colors.riskColors.low.title,
              marginBottom: '8px'
            }}>
              5%
            </div>
            <div style={{ fontSize: '0.875rem', color: colors.secondaryText }}>
              Significantly below national averages
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ 
              fontSize: '0.75rem', 
              color: colors.secondaryText, 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Borough Avg. Rents
            </div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: colors.primaryText,
              marginBottom: '8px'
            }}>
              $40+ PSF
            </div>
            <div style={{ fontSize: '0.875rem', color: colors.secondaryText }}>
              For similar Class A logistics assets
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ 
              fontSize: '0.75rem', 
              color: colors.secondaryText, 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Supply Constraints
            </div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: colors.riskColors.low.title,
              marginBottom: '8px'
            }}>
              High
            </div>
            <div style={{ fontSize: '0.875rem', color: colors.secondaryText }}>
              Due to zoning and permitting restrictions
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '8px',
          border: `1px solid ${colors.panelBorder}`,
          padding: '16px'
        }}>
          <div style={{ 
            color: colors.secondaryText,
            fontSize: '0.9375rem',
            lineHeight: 1.6
          }}>
            <p style={{ marginBottom: '12px' }}>
              Despite moderating leasing totals nationwide, the Brooklyn submarket surrounding 280 Richards 
              stands at approximately <span style={{ fontWeight: 600, color: colors.primaryText }}>5% vacancy</span>, significantly below national averages.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Borough average taking rents continue to exceed <span style={{ fontWeight: 600, color: colors.primaryText }}>$40 PSF</span>, which includes Class A assets that are 
              older and structurally inferior to 280 Richards.
            </p>
            <p>
              Key factors contributing to constrained logistics supply in Red Hook include:
              <ul style={{ paddingLeft: '24px', marginTop: '8px' }}>
                <li style={{ marginBottom: '4px' }}>Exclusive zoning for last-mile use in M or C9 zones</li>
                <li style={{ marginBottom: '4px' }}>Declining inventory due to residential conversions (6M+ SF loss over past decade)</li>
                <li>New industrial permit introduced in May 2024 that restricts future development</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsRecoveriesSection;