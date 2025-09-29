import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import MapViewer from '@/components/MapViewer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Users, 
  FileText,
  Building,
  Download,
  Filter
} from 'lucide-react';

interface DistrictStats {
  name: string;
  totalClaims: number;
  approvedClaims: number;
  pendingClaims: number;
  rejectedClaims: number;
  completionRate: number;
  avgProcessingDays: number;
}

const CentralDashboard = () => {
  const { user } = useAuth();
  const [selectedMetric, setSelectedMetric] = useState<string>('claims');

  // Sample nationwide statistics
  const districtStats: DistrictStats[] = [
    {
      name: 'Bastar',
      totalClaims: 450,
      approvedClaims: 380,
      pendingClaims: 50,
      rejectedClaims: 20,
      completionRate: 89,
      avgProcessingDays: 18
    },
    {
      name: 'Kondagaon',
      totalClaims: 320,
      approvedClaims: 280,
      pendingClaims: 30,
      rejectedClaims: 10,
      completionRate: 91,
      avgProcessingDays: 15
    },
    {
      name: 'Kanker',
      totalClaims: 280,
      approvedClaims: 220,
      pendingClaims: 45,
      rejectedClaims: 15,
      completionRate: 84,
      avgProcessingDays: 22
    },
    {
      name: 'Jagdalpur',
      totalClaims: 380,
      approvedClaims: 300,
      pendingClaims: 60,
      rejectedClaims: 20,
      completionRate: 84,
      avgProcessingDays: 20
    }
  ];

  const totalClaims = districtStats.reduce((sum, d) => sum + d.totalClaims, 0);
  const totalApproved = districtStats.reduce((sum, d) => sum + d.approvedClaims, 0);
  const totalPending = districtStats.reduce((sum, d) => sum + d.pendingClaims, 0);
  const totalRejected = districtStats.reduce((sum, d) => sum + d.rejectedClaims, 0);
  const overallCompletion = Math.round(((totalApproved + totalRejected) / totalClaims) * 100);

  const monthlyData = [
    { month: 'Jan', claims: 120, processed: 95 },
    { month: 'Feb', claims: 150, processed: 140 },
    { month: 'Mar', claims: 180, processed: 170 },
    { month: 'Apr', claims: 200, processed: 185 },
    { month: 'May', claims: 220, processed: 200 },
    { month: 'Jun', claims: 250, processed: 230 }
  ];

  return (
    <>
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Central Government Dashboard</h1>
          <p className="text-muted-foreground">
            Nationwide FRA implementation monitoring and analytics
          </p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Claims</p>
                  <p className="text-3xl font-bold">{totalClaims.toLocaleString()}</p>
                  <p className="text-xs opacity-75 mt-1">Nationwide</p>
                </div>
                <FileText className="h-10 w-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Implementation Progress</p>
                  <p className="text-2xl font-bold text-primary">{overallCompletion}%</p>
                  <p className="text-xs text-success">+5% from last month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Districts</p>
                  <p className="text-2xl font-bold text-primary">{districtStats.length}</p>
                  <p className="text-xs text-muted-foreground">States: 12</p>
                </div>
                <Building className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Processing Time</p>
                  <p className="text-2xl font-bold text-primary">19</p>
                  <p className="text-xs text-muted-foreground">Days</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">National Overview</TabsTrigger>
            <TabsTrigger value="districts">District Performance</TabsTrigger>
            <TabsTrigger value="analytics">Geographic Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports & Exports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Claims Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Claims Status Distribution</CardTitle>
                  <CardDescription>
                    Current status of all claims nationwide
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Approved ({totalApproved})</span>
                      <span>{Math.round((totalApproved / totalClaims) * 100)}%</span>
                    </div>
                    <Progress value={(totalApproved / totalClaims) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pending Review ({totalPending})</span>
                      <span>{Math.round((totalPending / totalClaims) * 100)}%</span>
                    </div>
                    <Progress value={(totalPending / totalClaims) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rejected ({totalRejected})</span>
                      <span>{Math.round((totalRejected / totalClaims) * 100)}%</span>
                    </div>
                    <Progress value={(totalRejected / totalClaims) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>
                    Claims submission and processing trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.slice(-3).map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-semibold">{data.month}</p>
                          <p className="text-sm text-muted-foreground">
                            {data.claims} claims submitted
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{data.processed}</p>
                          <p className="text-xs text-success">
                            {Math.round((data.processed / data.claims) * 100)}% processed
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="districts">
            <Card>
              <CardHeader>
                <CardTitle>District Performance Comparison</CardTitle>
                <CardDescription>
                  Detailed breakdown of implementation progress across districts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {districtStats.map((district, index) => (
                    <div key={district.name} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{district.name} District</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {district.completionRate}% complete
                          </span>
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full"
                              style={{ width: `${district.completionRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Claims</p>
                          <p className="font-bold text-lg">{district.totalClaims}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Approved</p>
                          <p className="font-bold text-lg text-success">{district.approvedClaims}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Pending</p>
                          <p className="font-bold text-lg text-warning">{district.pendingClaims}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rejected</p>
                          <p className="font-bold text-lg text-muted-foreground">{district.rejectedClaims}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Days</p>
                          <p className="font-bold text-lg">{district.avgProcessingDays}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Geographic Map */}
              <div className="lg:col-span-2">
                <MapViewer
                  height="500px"
                  showControls={true}
                />
              </div>

              {/* Map Legend & Controls */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Map Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Visualization Mode</p>
                      <div className="space-y-2">
                        <Button 
                          variant={selectedMetric === 'claims' ? 'default' : 'outline'}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedMetric('claims')}
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Claims Density
                        </Button>
                        <Button 
                          variant={selectedMetric === 'completion' ? 'default' : 'outline'}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedMetric('completion')}
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Completion Rate
                        </Button>
                        <Button 
                          variant={selectedMetric === 'processing' ? 'default' : 'outline'}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedMetric('processing')}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Processing Time
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">Legend</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-success"></div>
                          <span>High Performance</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-warning"></div>
                          <span>Average Performance</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-destructive"></div>
                          <span>Needs Attention</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Total Area (hectares)</span>
                        <span className="font-bold">12,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Villages Covered</span>
                        <span className="font-bold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Beneficiaries</span>
                        <span className="font-bold">8,920</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>
                    Export data and analytics for further analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download National Summary Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export District Performance Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Monthly Trends Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Geographic Dataset (GeoJSON)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>
                    Automated report generation and delivery
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-semibold text-sm">Weekly Progress Report</h4>
                      <p className="text-xs text-muted-foreground">Next delivery: Monday 9:00 AM</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-semibold text-sm">Monthly Analytics Summary</h4>
                      <p className="text-xs text-muted-foreground">Next delivery: 1st of next month</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-semibold text-sm">Quarterly Performance Review</h4>
                      <p className="text-xs text-muted-foreground">Next delivery: End of quarter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CentralDashboard;