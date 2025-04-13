"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, LineChart as LineChartIcon, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeaseData, generateProjectedRentData, formatCurrency } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

interface RentScheduleSectionProps {
  leaseData: LeaseData;
}

export function RentScheduleSection({ leaseData }: RentScheduleSectionProps) {
  // Generate chart data
  const projectedRentData = generateProjectedRentData(leaseData);
  
  // Calculate current year for the table
  const currentYear = new Date().getFullYear();
  
  // State for table view options
  const [viewAllYears, setViewAllYears] = useState(false);
  
  // Filtered data for table display
  const displayData = viewAllYears 
    ? projectedRentData 
    : projectedRentData.filter((_, idx) => idx === 0 || idx === 4 || idx === 9 || idx === 12);

  return (
    <div className="space-y-6">
      {/* Rent Schedule Table */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-blue-500" />
            Rent Schedule
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewAllYears(!viewAllYears)}
          >
            {viewAllYears ? 'Show Key Years' : 'Show All Years'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Lease Year</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Warehouse Rent PSF</TableHead>
                  <TableHead className="text-right">Parking Rent PSF</TableHead>
                  <TableHead className="text-right">Annual Rent</TableHead>
                  <TableHead className="text-right">Monthly Rent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((data, index) => {
                  const actualIndex = viewAllYears ? index : 
                    index === 0 ? 0 : 
                    index === 1 ? 4 : 
                    index === 2 ? 9 : 
                    12;
                  const year = currentYear + actualIndex;
                  const annualRent = (data.warehouseRent * leaseData.property.components[0].sf) + 
                                    (data.parkingRent * leaseData.property.components[1].sf);
                  const monthlyRent = annualRent / 12;
             
                  return (
                    <TableRow key={index} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                     
                        <Badge variant={
                          actualIndex === 0 ? "secondary" : 
                          actualIndex === projectedRentData.length - 1 ? "destructive" : 
                          "default"
                        } className="whitespace-nowrap">
                          Year {actualIndex + 1}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{year}</TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(data.warehouseRent)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(data.parkingRent)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold text-blue-600">
                        {formatCurrency(annualRent, 0)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(monthlyRent, 0)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {!viewAllYears && (
            <div className="text-center mt-2 text-xs text-muted-foreground">
              Showing selected years. Click &quot;Show All Years&quot; to view complete schedule.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Rent Projection Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Rent Projection Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={projectedRentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="year" 
                  label={{ 
                    value: 'Lease Year', 
                    position: 'insideBottom', 
                    offset: -15,
                    style: { fontSize: '12px' }
                  }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  label={{ 
                    value: 'Rent PSF ($)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    style: { fontSize: '12px' } 
                  }}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(Number(value)), 'Rent PSF']}
                  labelFormatter={(value) => `Year ${value}`}
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
                    fontSize: 11 
                  }} 
                  stroke="#94a3b8" 
                  strokeDasharray="3 3" 
                />
                <Line 
                  type="monotone" 
                  dataKey="warehouseRent" 
                  name="Warehouse (Actual)" 
                  stroke="#2563eb" 
                  strokeWidth={2.5}
                  dot={{ fill: "#2563eb", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="parkingRent" 
                  name="Parking (Actual)" 
                  stroke="#16a34a" 
                  strokeWidth={2.5}
                  dot={{ fill: "#16a34a", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="marketRentWarehouse" 
                  name="Warehouse (Market)" 
                  stroke="#93c5fd" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#93c5fd", r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="marketRentParking" 
                  name="Parking (Market)" 
                  stroke="#86efac" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#86efac", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Market Rent Analysis */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
            <InfoIcon className="h-5 w-5 text-blue-600" />
            Market Rent Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-900">
          <p className="mb-3">
            Based on current market conditions in the Brooklyn logistics submarket, the lease is 
            projected to be <span className="font-semibold">approximately 30% below market at the end of the initial term</span>. The 
            charts above illustrate the growing spread between contract rent and market rent over 
            the lease term.
          </p>
          <p>
            Amazon&apos;s lease terms were negotiated in 2019, and since then, average Class A rents 
            have increased significantly to $40+ PSF in the NYC boroughs. This presents a strong 
            mark-to-market opportunity at lease expiration, with potential for substantial income growth.
          </p>
          
          {/* Key metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wide mb-1">Current Warehouse PSF</div>
                <div className="text-xl font-bold">{formatCurrency(projectedRentData[0].warehouseRent)}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wide mb-1">Year 13 Warehouse PSF</div>
                <div className="text-xl font-bold">{formatCurrency(projectedRentData[12].warehouseRent)}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wide mb-1">Projected Market PSF (Year 13)</div>
                <div className="text-xl font-bold text-blue-600">{formatCurrency(projectedRentData[12].marketRentWarehouse)}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wide mb-1">Est. Mark-to-Market</div>
                <div className="text-xl font-bold text-green-600 flex items-center">
                  +{leaseData.financials.markToMarket}
                  <TrendingUp className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}