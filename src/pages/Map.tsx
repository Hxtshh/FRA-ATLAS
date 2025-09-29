import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import MapViewer from '@/components/MapViewer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Map as MapIcon, Search, Filter } from 'lucide-react';

const Map = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchVillage, setSearchVillage] = useState('');
  const [searchClaim, setSearchClaim] = useState('');
  const [currentFilter, setCurrentFilter] = useState<{
    villageId?: string;
    claimId?: string;
  }>({});

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleVillageSearch = () => {
    if (searchVillage.trim()) {
      setCurrentFilter({ villageId: searchVillage.trim() });
      setSearchClaim('');
    }
  };

  const handleClaimSearch = () => {
    if (searchClaim.trim()) {
      setCurrentFilter({ claimId: searchClaim.trim() });
      setSearchVillage('');
    }
  };

  const clearFilters = () => {
    setCurrentFilter({});
    setSearchVillage('');
    setSearchClaim('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <MapIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Interactive Map Viewer</h1>
          </div>
          <p className="text-muted-foreground">
            Explore FRA claims and geographic data across different regions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Map Controls</span>
                </CardTitle>
                <CardDescription>
                  Search and filter geographic data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Village Search */}
                <div className="space-y-2">
                  <Label htmlFor="village-search">Search by Village</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="village-search"
                      placeholder="Enter village ID"
                      value={searchVillage}
                      onChange={(e) => setSearchVillage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleVillageSearch()}
                    />
                    <Button 
                      size="sm" 
                      onClick={handleVillageSearch}
                      disabled={!searchVillage.trim()}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Claim Search */}
                <div className="space-y-2">
                  <Label htmlFor="claim-search">Search by Claim ID</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="claim-search"
                      placeholder="Enter claim ID"
                      value={searchClaim}
                      onChange={(e) => setSearchClaim(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleClaimSearch()}
                    />
                    <Button 
                      size="sm" 
                      onClick={handleClaimSearch}
                      disabled={!searchClaim.trim()}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Active Filters */}
                {(currentFilter.villageId || currentFilter.claimId) && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Active Filters</Label>
                      <div className="space-y-1">
                        {currentFilter.villageId && (
                          <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                            Village: {currentFilter.villageId}
                          </div>
                        )}
                        {currentFilter.claimId && (
                          <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                            Claim: {currentFilter.claimId}
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearFilters}
                        className="w-full"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </>
                )}

                {/* Role-based Information */}
                <Separator />
                <div className="space-y-2">
                  <Label>User Information</Label>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Role:</strong> {user?.role}</p>
                    <p><strong>Name:</strong> {user?.name}</p>
                    {user?.district && (
                      <p><strong>District:</strong> {user.district}</p>
                    )}
                  </div>
                </div>

                {/* Sample Data Info */}
                <Separator />
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold mb-1">Demo Mode</p>
                  <p>This map shows sample data. In production, it would connect to the backend API to load real GeoJSON data.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Viewer */}
          <div className="lg:col-span-3">
            <MapViewer
              villageId={currentFilter.villageId}
              claimId={currentFilter.claimId}
              height="600px"
              showControls={true}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1">Base Maps</h3>
              <p className="text-xs text-muted-foreground">
                Switch between OpenStreetMap and Satellite imagery for different perspectives.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1">Interactive Features</h3>
              <p className="text-xs text-muted-foreground">
                Click on land parcels to view claim details, status, and claimant information.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1">Data Sources</h3>
              <p className="text-xs text-muted-foreground">
                Geographic data is loaded from the backend API based on village or claim IDs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Map;