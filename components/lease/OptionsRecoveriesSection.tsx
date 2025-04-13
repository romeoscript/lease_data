"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LeaseData } from "@/lib/utils";
import { 
  RefreshCw, 
  Package, 
  FileText, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  MapPin 
} from "lucide-react";

interface OptionsRecoveriesSectionProps {
  leaseData: LeaseData;
}

export function OptionsRecoveriesSection({ leaseData }: OptionsRecoveriesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Renewal Options Panel */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-blue-500" />
            Renewal Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Card className="bg-slate-50">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm text-blue-600">Renewal Terms</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-blue-50 text-blue-800 p-3 rounded-md font-medium text-sm">
                  {leaseData.options.renewalOptions}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm text-blue-600">Other Options</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-blue-50 text-blue-800 p-3 rounded-md font-medium text-sm">
                  {leaseData.options.otherOptions}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm text-blue-600">Option Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Based on current market trends and the <span className="font-semibold text-green-700">{leaseData.financials.markToMarket}</span> mark-to-market potential at lease expiration, 
                  these FMV renewal options represent significant potential upside for the landlord while 
                  providing Amazon with operational flexibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Structure Panel */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-500" />
            Recovery Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Real Estate Taxes</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                    {leaseData.recoveryStructure.realEstateTaxes}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">CAM (Common Area Maintenance)</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                    {leaseData.recoveryStructure.CAM}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Insurance</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">
                    {leaseData.recoveryStructure.insurance}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Management Fee</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">
                    {leaseData.recoveryStructure.managementFee}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Card className="bg-slate-50 mt-4">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm text-blue-600">Recovery Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 text-sm leading-relaxed">
                The lease has a modified triple-net structure with the tenant responsible for taxes and 
                CAM, while insurance and management fees are landlord's responsibility. This structure 
                is relatively standard for institutional-grade logistics assets leased to credit tenants.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Lease Risk Assessment Panel */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Lease Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-1 pt-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm text-green-800 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    Credit Quality
                  </CardTitle>
                  <Badge variant="outline" className="bg-white text-green-700">Low Risk</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-1">
                <p className="text-sm text-green-800">
                  Amazon's <span className="font-semibold">{leaseData.tenant.creditRating}</span> credit rating and <span className="font-semibold">{leaseData.tenant.marketCap}</span> market cap provides exceptional tenant security
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-1 pt-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm text-green-800 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Term Length
                  </CardTitle>
                  <Badge variant="outline" className="bg-white text-green-700">Low Risk</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-1">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">{leaseData.dates.remainingTerm}</span> remaining provides strong income security and long-term cash flow visibility
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-1 pt-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm text-green-800 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Location Quality
                  </CardTitle>
                  <Badge variant="outline" className="bg-white text-green-700">Low Risk</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-1">
                <p className="text-sm text-green-800">
                  Prime Brooklyn location with excellent logistics access to 2.8M consumers and critical Northeast thoroughfares
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-1 pt-4 flex flex-row items-start">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <CardTitle className="text-blue-800">Summary Assessment</CardTitle>
                <CardDescription className="text-blue-700 mt-2">
                  This lease represents an institutional-grade investment with exceptional credit quality, 
                  long-term income security, and strong embedded rent growth. The 100% FMV renewal options provide 
                  potential for significant upside at the end of the initial term. Overall, this property exhibits 
                  a <span className="font-semibold text-green-700">Low Risk</span> profile with attractive upside characteristics.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>

      {/* Market Context Panel */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Market Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="bg-white shadow-sm">
              <CardContent className="pt-6">
                <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wide mb-1">Submarket Vacancy</div>
                <div className="text-2xl font-bold text-green-600">5%</div>
                <div className="text-sm text-muted-foreground mt-1">Significantly below national averages</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="pt-6">
                <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wide mb-1">Borough Avg. Rents</div>
                <div className="text-2xl font-bold">$40+ PSF</div>
                <div className="text-sm text-muted-foreground mt-1">For similar Class A logistics assets</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardContent className="pt-6">
                <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wide mb-1">Supply Constraints</div>
                <div className="text-2xl font-bold text-green-600">High</div>
                <div className="text-sm text-muted-foreground mt-1">Due to zoning and permitting restrictions</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardContent className="py-4">
              <div className="text-sm text-muted-foreground space-y-3">
                <p>
                  Despite moderating leasing totals nationwide, the Brooklyn submarket surrounding 280 Richards 
                  stands at approximately <span className="font-semibold text-gray-700">5% vacancy</span>, significantly below national averages.
                </p>
                <p>
                  Borough average taking rents continue to exceed <span className="font-semibold text-gray-700">$40 PSF</span>, which includes Class A assets that are 
                  older and structurally inferior to 280 Richards.
                </p>
                <p>
                  Key factors contributing to constrained logistics supply in Red Hook include:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Exclusive zoning for last-mile use in M or C9 zones</li>
                  <li>Declining inventory due to residential conversions (6M+ SF loss over past decade)</li>
                  <li>New industrial permit introduced in May 2024 that restricts future development</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}