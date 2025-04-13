// src/utils/leaseHelpers.ts

// Interface for the lease data structure
export interface LeaseData {
    tenant: {
      name: string;
      guarantor: string;
      creditRating: string;
      marketCap: string;
    };
    property: {
      name: string;
      location: string;
      size: string;
      components: {
        type: string;
        sf: number;
        rent: number;
        rentPSF: number;
      }[];
    };
    dates: {
      leaseCommencementDate: string;
      leaseExpirationDate: string;
      remainingTerm: string;
    };
    financials: {
      annualRent: number;
      weightedAverageRentPSF: number;
      annualEscalations: string;
      markToMarket: string;
    };
    options: {
      renewalOptions: string;
      otherOptions: string;
    };
    recoveryStructure: {
      realEstateTaxes: string;
      CAM: string;
      insurance: string;
      managementFee: string;
    };
  }
  
  // Generate projected rent data for the charts
  export const generateProjectedRentData = (leaseData: LeaseData, years: number = 13) => {
    return Array.from({ length: years }, (_, i) => {
      return {
        year: i + 1,
        warehouseRent: Math.round(leaseData.property.components[0].rentPSF * Math.pow(1.03, i) * 100) / 100,
        parkingRent: Math.round(leaseData.property.components[1].rentPSF * Math.pow(1.03, i) * 100) / 100,
        marketRentWarehouse: 40 * Math.pow(1.03, i),
        marketRentParking: 20 * Math.pow(1.03, i)
      };
    });
  };
  
  // Calculate annual and monthly rent for a specific year
  export const calculateRentForYear = (leaseData: LeaseData, yearIndex: number) => {
    const escalationRate = parseFloat(leaseData.financials.annualEscalations) / 100;
    
    // Calculate the escalated rent for each component
    const warehouseRent = leaseData.property.components[0].rentPSF * Math.pow(1 + escalationRate, yearIndex);
    const warehouseTotalRent = warehouseRent * leaseData.property.components[0].sf;
    
    const parkingRent = leaseData.property.components[1].rentPSF * Math.pow(1 + escalationRate, yearIndex);
    const parkingTotalRent = parkingRent * leaseData.property.components[1].sf;
    
    const annualRent = warehouseTotalRent + parkingTotalRent;
    const monthlyRent = annualRent / 12;
    
    return {
      warehouseRentPSF: warehouseRent,
      parkingRentPSF: parkingRent,
      annualRent,
      monthlyRent
    };
  };
  
  // Format currency values
  export const formatCurrency = (value: number, maximumFractionDigits: number = 2) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits
    });
  };
  
  // Format percentage values
  export const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Calculate days remaining until lease expiration
  export const calculateDaysRemaining = (expirationDate: string) => {
    const expiry = new Date(expirationDate);
    const today = new Date();
    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Determine risk level based on time remaining
  export const determineRiskLevel = (daysRemaining: number) => {
    if (daysRemaining <= 365) {
      return 'high';
    } else if (daysRemaining <= 730) {
      return 'medium';
    } else {
      return 'low';
    }
  };