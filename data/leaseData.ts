import { LeaseData } from '../utils/leaseHelpers';


export const amazonLeaseData: LeaseData = {
  tenant: {
    name: "Amazon.com Services LLC",
    guarantor: "Amazon.com, Inc.",
    creditRating: "AA (S&P)",
    marketCap: "$1.95 TN"
  },
  property: {
    name: "280 Richards",
    location: "Brooklyn, New York City",
    size: "312,000 SF",
    components: [
      { type: "Ground Floor (Warehouse / Mezz.)", sf: 151000, rent: 5575556, rentPSF: 36.92 },
      { type: "Rooftop Parking", sf: 161000, rent: 2038217, rentPSF: 12.66 }
    ]
  },
  dates: {
    leaseCommencementDate: "May 2022",
    leaseExpirationDate: "Sep 2037",
    remainingTerm: "13 years"
  },
  financials: {
    annualRent: 7613773,
    weightedAverageRentPSF: 24.40,
    annualEscalations: "3%",
    markToMarket: "30%+"
  },
  options: {
    renewalOptions: "Four 5-year renewal options at 100% FMV",
    otherOptions: "One-Time ROFO (Right of First Offer)"
  },
  recoveryStructure: {
    realEstateTaxes: "100% Recovery",
    CAM: "100% Recovery",
    insurance: "Incurred by Ownership",
    managementFee: "Incurred by Ownership"
  }
};

export default amazonLeaseData;