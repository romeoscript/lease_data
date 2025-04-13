import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LeaseData } from './types';  // Import the type

// Re-export the type
export type { LeaseData };



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number, maximumFractionDigits: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits
  }).format(value);
};

export const generateProjectedRentData = (leaseData: LeaseData, years: number = 13) => {
  return Array.from({ length: years }, (_, i) => {
    return {
      year: i + 1,
      warehouseRent: +(leaseData.property.components[0].rentPSF * Math.pow(1.03, i)).toFixed(2),
      parkingRent: +(leaseData.property.components[1].rentPSF * Math.pow(1.03, i)).toFixed(2),
      marketRentWarehouse: +(40 * Math.pow(1.03, i)).toFixed(2),
      marketRentParking: +(20 * Math.pow(1.03, i)).toFixed(2)
    };
  });
};