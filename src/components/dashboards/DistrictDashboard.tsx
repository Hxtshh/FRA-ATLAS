import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import MapViewer from '@/components/MapViewer';
import DSSPanel from '@/components/DSSPanel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';

interface ClaimForReview {
  id: string;
  claimantName: string;
  village: string;
  dateSubmitted: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  area: number;
  priority: 'high' | 'medium' | 'low';
}

const DistrictDashboard = () => {
  const { user } = useAuth();
  const [selectedClaim, setSelectedClaim] = useState<string>('FRA001');
  const [filter, setFilter] = useState<string>('all');

  // Sample claims data for district review
  const claims: ClaimForReview[] = [
    {
      id: 'FRA001',
      claimantName: 'Ram Singh',
      village: 'Kanker',
      dateSubmitted: '2024-01-15',
      status: 'pending',
      area: 2.5,
      priority: 'high'
    },
    {
      id: 'FRA002',
      claimantName: 'Sita Devi',
      village: 'Bastar',
      dateSubmitted: '2024-02-20',
      status: 'under-review',
      area: 3.2,
      priority: 'medium'
    },
    {
      id: 'FRA003',
      claimantName: 'Mohan Lal',
      village: 'Kondagaon',
      dateSubmitted: '2024-03-10',
      status: 'approved',
      area: 1.8,
      priority: 'low'
    },
    {
      id: 'FRA004',
      claimantName: 'Lakshmi Bai',
      village: 'Jagdalpur',
      dateSubmitted: '2024-03-15',
      status: 'rejected',
      area: 4.1,
      priority: 'medium'
    }
  ];

  const handleDecision = (claimId: string, decision: 'approve' | 'reject') => {
    console.log(`Decision for claim ${claimId}: ${decision}`);
    // In a real app, this would make an API call
  };

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredClaims = filter === 'all' ? claims : claims.filter(c => c.status === filter);
  const pendingClaims = claims.filter(c => c.status === 'pending' || c.status === 'under-review').length;
  const approvedClaims = claims.filter(c => c.status === 'approved').length;
  const rejectedClaims = claims.filter(c => c.status === 'rejected').length;

  return (
    <>
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">District Authority Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and verify forest rights claims in {user?.district} District
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                  <p className="text-sm text-muted-foreground">Approved</p>
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
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold text-primary">
                    {Math.round(((approvedClaims + rejectedClaims) / claims.length) * 100)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="claims" className="space-y-4">
          <TabsList>
            <TabsTrigger value="claims">Claims Management</TabsTrigger>
            <TabsTrigger value="verification">Claim Verification</TabsTrigger>
            <TabsTrigger value="analytics">District Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="claims">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Claims List */}
              <Card>
                <CardHeader>
                  <CardTitle>Claims for Review</CardTitle>
                  <CardDescription>
                    Manage claims in your district jurisdiction
                  </CardDescription>
                  <div className="flex space-x-2">
                    <Button 
                      variant={filter === 'all' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setFilter('all')}
                    >
                      All
                    </Button>
                    <Button 
                      variant={filter === 'pending' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setFilter('pending')}
                    >
                      Pending
                    </Button>
                    <Button 
                      variant={filter === 'under-review' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setFilter('under-review')}
                    >
                      Under Review
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredClaims.map((claim) => (
                    <div 
                      key={claim.id} 
                      className={`border border-border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedClaim === claim.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedClaim(claim.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(claim.status)}
                          <h3 className="font-semibold">{claim.id}</h3>
                          <Badge className={getPriorityColor(claim.priority)} variant="outline">
                            {claim.priority}
                          </Badge>
                        </div>
                        <Badge className={getStatusColor(claim.status)}>
                          {claim.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p><strong>Claimant:</strong> {claim.claimantName}</p>
                          <p><strong>Village:</strong> {claim.village}</p>
                        </div>
                        <div>
                          <p><strong>Area:</strong> {claim.area} hectares</p>
                          <p><strong>Submitted:</strong> {new Date(claim.dateSubmitted).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Map Viewer */}
              <MapViewer
                claimId={selectedClaim}
                height="500px"
                showControls={true}
              />
            </div>
          </TabsContent>

          <TabsContent value="verification">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* DSS Panel */}
              <DSSPanel
                claimId={selectedClaim}
                onDecision={handleDecision}
                showActions={true}
              />

              {/* Verification Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Workflow</CardTitle>
                  <CardDescription>
                    Complete verification steps for Claim {selectedClaim}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-success/10">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <h4 className="font-semibold text-sm">Document Verification</h4>
                        <p className="text-xs text-muted-foreground">All required documents verified</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-success/10">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <h4 className="font-semibold text-sm">Geographic Analysis</h4>
                        <p className="text-xs text-muted-foreground">Boundary verification completed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-warning/10">
                      <Clock className="h-5 w-5 text-warning" />
                      <div>
                        <h4 className="font-semibold text-sm">Field Verification</h4>
                        <p className="text-xs text-muted-foreground">Pending site visit</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold mb-2">Actions Required</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Schedule Field Visit
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Request Additional Documents
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Contact Claimant
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>District Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Claims Processed</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Average Processing Time</span>
                        <span>12 days</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-success h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">24</p>
                      <p className="text-xs text-muted-foreground">Claims This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">18</p>
                      <p className="text-xs text-muted-foreground">Approved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-warning">6</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-muted-foreground">2</p>
                      <p className="text-xs text-muted-foreground">Rejected</p>
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

export default DistrictDashboard;