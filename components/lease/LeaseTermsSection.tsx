"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LeaseData, generateProjectedRentData } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, User, Calendar, DollarSign, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LeaseTermsSectionProps {
  leaseData: LeaseData;
}

export function LeaseTermsSection({ leaseData }: LeaseTermsSectionProps) {
  // Generate chart data
  const projectedRentData = generateProjectedRentData(leaseData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Tenant Information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Tenant Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-muted-foreground">Tenant</span>
              <span className="font-medium">{leaseData.tenant.name}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-muted-foreground">Guarantor</span>
              <span className="font-medium">{leaseData.tenant.guarantor}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-muted-foreground">Credit Rating</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                {leaseData.tenant.creditRating}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Market Cap</span>
              <span className="font-medium">{leaseData.tenant.marketCap}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lease Dates */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Lease Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-muted-foreground">Lease Commencement (LCD)</span>
              <span className="font-medium">{leaseData.dates.leaseCommencementDate}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-muted-foreground">Lease Expiration (LXD)</span>
              <span className="font-medium">{leaseData.dates.leaseExpirationDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Remaining Term</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                {leaseData.dates.remainingTerm}
              </Badge>
            </div>
            {leaseData.dates.remainingTerm.includes("1") && (
              <div className="mt-2 bg-amber-50 text-amber-800 p-3 rounded-md border border-amber-200 text-sm flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" />
                <span>
                  Lease roll within 12 months
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rental Structure */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            Rental Structure by Component
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaseData.property.components.map((component, index) => (
              <div key={index} className={`pb-3 ${index < leaseData.property.components.length - 1 ? 'border-b mb-3' : ''}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{component.type}</span>
                  <Badge variant="secondary">{component.sf.toLocaleString()} SF</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Annual Rent</span>
                    <div className="font-medium">{formatCurrency(component.rent)}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Rent PSF</span>
                    <div className="font-medium">{formatCurrency(component.rentPSF)}</div>
                  </div>
                </div>
              </div>
            ))}
            <Separator className="my-3" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-muted-foreground">Total Annual Rent</span>
                <div className="font-semibold text-lg">{formatCurrency(leaseData.financials.annualRent)}</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Weighted Avg Rent PSF</span>
                <div className="font-semibold text-lg">{formatCurrency(leaseData.financials.weightedAverageRentPSF)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rent Escalations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Rent Escalations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-muted-foreground">Annual Increases</span>
              <Badge>{leaseData.financials.annualEscalations}</Badge>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-muted-foreground">Est. Mark-to-Market at Expiry</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                {leaseData.financials.markToMarket}
              </Badge>
            </div>
            <div className="h-60 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projectedRentData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="year" 
                    label={{ 
                      value: 'Year', 
                      position: 'insideBottom', 
                      offset: -15,
                      style: { fontSize: '12px' }
                    }}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    domain={[0, 60]}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value as number), 'Rent PSF']}
                    labelFormatter={(value) => `Year ${value}`}
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
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: "#2563eb", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="parkingRent" 
                    name="Parking" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    dot={{ fill: "#16a34a", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-2 text-xs text-muted-foreground">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-blue-600 mr-1"></div>
                <span>Warehouse Space ($36.92 PSF initial)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-600 mr-1"></div>
                <span>Parking ($12.66 PSF initial)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}