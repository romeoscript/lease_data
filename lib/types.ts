
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
  
  // src/lib/data.ts
 