import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import MapViewer from '@/components/MapViewer';
import D3PieChart from '@/components/charts/D3PieChart';
import D3BarChart from '@/components/charts/D3BarChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Upload,
  Eye
} from 'lucide-react';

interface Claim {
  id: string;
  dateSubmitted: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  village: string;
  area: number;
  documents: string[];
}

const ClaimantDashboard = () => {
  const { user } = useAuth();
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);

  // Sample claims data
  const claims: Claim[] = [
    {
      id: 'FRA001',
      dateSubmitted: '2024-01-15',
      status: 'approved',
      village: 'Kanker',
      area: 2.5,
      documents: ['Identity Proof', 'Residence Proof', 'Land Survey']
    },
    {
      id: 'FRA002',
      dateSubmitted: '2024-02-20',
      status: 'under-review',
      village: 'Bastar',
      area: 3.2,
      documents: ['Identity Proof', 'Residence Proof']
    },
    {
      id: 'FRA003',
      dateSubmitted: '2024-03-10',
      status: 'pending',
      village: 'Kondagaon',
      area: 1.8,
      documents: ['Identity Proof']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'under-review': return <Clock className="h-4 w-4 text-info" />;
      case 'pending': return <Clock className="h-4 w-4 text-warning" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      case 'under-review': return 'bg-info text-info-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const approvedClaims = claims.filter(c => c.status === 'approved').length;
  const pendingClaims = claims.filter(c => c.status === 'pending' || c.status === 'under-review').length;
  const totalArea = claims.filter(c => c.status === 'approved').reduce((sum, c) => sum + c.area, 0);

  // D3 Chart Data
  const statusData = [
    { label: 'Approved', value: approvedClaims, color: '#22c55e' },
    { label: 'Under Review', value: claims.filter(c => c.status === 'under-review').length, color: '#3b82f6' },
    { label: 'Pending', value: claims.filter(c => c.status === 'pending').length, color: '#f59e0b' },
  ];

  const villageData = [
    { label: 'Kanker', value: claims.filter(c => c.village === 'Kanker').length },
    { label: 'Bastar', value: claims.filter(c => c.village === 'Bastar').length },
    { label: 'Kondagaon', value: claims.filter(c => c.village === 'Kondagaon').length },
  ];

  return (
    <>
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Track your land claims and manage your forest rights applications</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Claims</p>
                  <p className="text-2xl font-bold">{claims.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Claims</p>
                  <p className="text-2xl font-bold text-success">{approvedClaims}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-warning">{pendingClaims}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Area (ha)</p>
                  <p className="text-2xl font-bold text-primary">{totalArea}</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* D3 Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Claims by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <D3PieChart data={statusData} width={300} height={250} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Claims by Village</CardTitle>
            </CardHeader>
            <CardContent>
              <D3BarChart data={villageData} width={350} height={250} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Claims List */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Claims</CardTitle>
                <CardDescription>
                  Track the status of your forest rights applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(claim.status)}
                        <h3 className="font-semibold">Claim {claim.id}</h3>
                      </div>
                      <Badge className={getStatusColor(claim.status)}>
                        {claim.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                      <div>
                        <p><strong>Village:</strong> {claim.village}</p>
                        <p><strong>Area:</strong> {claim.area} hectares</p>
                      </div>
                      <div>
                        <p><strong>Submitted:</strong> {new Date(claim.dateSubmitted).toLocaleDateString()}</p>
                        <p><strong>Documents:</strong> {claim.documents.length}</p>
                      </div>
                    </div>

                    <Separator className="my-3" />
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedClaim(claim.id)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>View Details</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedClaim(claim.id)}
                        className="flex items-center space-x-1"
                      >
                        <MapPin className="h-3 w-3" />
                        <span>View on Map</span>
                      </Button>
                    </div>
                  </div>
                ))}

                {/* New Claim Button */}
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-3">
                        Ready to submit a new claim?
                      </p>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload New Claim
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Map Viewer */}
          <div>
            <MapViewer
              claimId={selectedClaim || 'FRA001'}
              height="600px"
              showControls={true}
            />
            {selectedClaim && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      Viewing: <strong>Claim {selectedClaim}</strong>
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedClaim(null)}
                    >
                      View All Claims
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Application Progress */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Application Process Guide</CardTitle>
            <CardDescription>
              Follow these steps to successfully submit your forest rights claim
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-success-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Step 1: Gather Required Documents</h4>
                  <p className="text-sm text-muted-foreground">
                    Collect identity proof, residence proof, and land survey documents
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Step 2: Submit Online Application</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload your documents and fill out the application form
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Step 3: Track Your Application</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor the status and respond to any requests for additional information
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ClaimantDashboard;