
export const colors = {
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
    risk: {
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
    },
    warning: {
      bg: '#FEF9C3',
      border: '#FDE047',
      text: '#854D0E',
    }
  };
  
  // Format currency values consistently
  export const formatCurrency = (value: number, maximumFractionDigits: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits
    }).format(value);
  };
  
  // Format percentage values
  export const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };