import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MapViewer from '@/components/MapViewer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Database, 
  MapPin, 
  BarChart3, 
  FileText,
  Globe,
  Search,
  Shield
} from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  description: string;
  format: string;
  size: string;
  lastUpdated: string;
  downloadCount: number;
  isPublic: boolean;
}

const PublicDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample public datasets
  const datasets: Dataset[] = [
    {
      id: 'fra-claims-2024',
      name: 'FRA Claims Summary 2024',
      description: 'Anonymized data of approved Forest Rights Act claims with geographic boundaries',
      format: 'GeoJSON',
      size: '15.2 MB',
      lastUpdated: '2024-03-15',
      downloadCount: 1247,
      isPublic: true
    },
    {
      id: 'village-boundaries',
      name: 'Village Administrative Boundaries',
      description: 'Boundary polygons for villages participating in the FRA program',
      format: 'Shapefile',
      size: '42.8 MB',
      lastUpdated: '2024-03-10',
      downloadCount: 892,
      isPublic: true
    },
    {
      id: 'forest-cover-stats',
      name: 'Forest Coverage Statistics',
      description: 'Aggregated forest coverage data by district and village',
      format: 'CSV',
      size: '2.1 MB',
      lastUpdated: '2024-03-12',
      downloadCount: 654,
      isPublic: true
    },
    {
      id: 'implementation-timeline',
      name: 'FRA Implementation Timeline',
      description: 'Historical data on FRA implementation progress across regions',
      format: 'JSON',
      size: '5.7 MB',
      lastUpdated: '2024-03-14',
      downloadCount: 423,
      isPublic: true
    }
  ];

  const publicStats = {
    totalDatasets: datasets.length,
    totalDownloads: datasets.reduce((sum, d) => sum + d.downloadCount, 0),
    lastUpdate: '2024-03-15',
    coverageArea: '12,450 hectares'
  };

  const filteredDatasets = datasets.filter(dataset =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (datasetId: string) => {
    console.log(`Downloading dataset: ${datasetId}`);
    // In a real app, this would trigger the actual download
  };

  return (
    <>
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">FRA Open Data Portal</h1>
          </div>
          <p className="text-muted-foreground">
            Access public datasets and research materials for the Forest Rights Act implementation
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Datasets</p>
                  <p className="text-2xl font-bold">{publicStats.totalDatasets}</p>
                </div>
                <Database className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold">{publicStats.totalDownloads.toLocaleString()}</p>
                </div>
                <Download className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Coverage Area</p>
                  <p className="text-2xl font-bold">{publicStats.coverageArea.split(' ')[0]}</p>
                  <p className="text-xs text-muted-foreground">hectares</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-bold">{new Date(publicStats.lastUpdate).toLocaleDateString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Public Map Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Public Geographic Viewer</span>
                </CardTitle>
                <CardDescription>
                  Explore anonymized FRA claims and village boundaries (personal information removed)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MapViewer
                  height="400px"
                  showControls={true}
                />
              </CardContent>
            </Card>

            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle>About the FRA Atlas & DSS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  The Forest Rights Act (FRA) Atlas & Decision Support System is a comprehensive digital platform 
                  designed to streamline the implementation of the Forest Rights Act, 2006. This system facilitates 
                  the digitization of land claims, provides decision support tools for authorities, and ensures 
                  transparent access to non-sensitive data for research and policy development.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-sm">Transparency</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Open access to anonymized data
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-sm">Efficiency</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Digital claim processing
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-sm">Accountability</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Real-time monitoring
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Datasets Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Available Datasets</span>
                </CardTitle>
                <CardDescription>
                  Download open datasets for research and analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search datasets..."
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Dataset List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredDatasets.map((dataset) => (
                    <div key={dataset.id} className="border border-border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{dataset.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {dataset.format}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3">
                        {dataset.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Size: {dataset.size}</span>
                        <span>{dataset.downloadCount} downloads</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Updated: {new Date(dataset.lastUpdated).toLocaleDateString()}
                        </span>
                        <Button 
                          size="sm" 
                          onClick={() => handleDownload(dataset.id)}
                          className="flex items-center space-x-1"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Usage Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Data Usage Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold">Privacy Protection</h4>
                    <p className="text-muted-foreground text-xs">
                      All personal information has been removed to protect claimant privacy.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold">Attribution Required</h4>
                    <p className="text-muted-foreground text-xs">
                      Please cite "FRA Atlas & DSS - Ministry of Tribal Affairs" in publications.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold">Commercial Use</h4>
                    <p className="text-muted-foreground text-xs">
                      Data is available for research and non-commercial use only.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Research Inquiries:</strong>
                    <br />
                    <span className="text-muted-foreground">research@fra.gov.in</span>
                  </p>
                  <p>
                    <strong>Technical Support:</strong>
                    <br />
                    <span className="text-muted-foreground">support@fra.gov.in</span>
                  </p>
                  <p>
                    <strong>Data Requests:</strong>
                    <br />
                    <span className="text-muted-foreground">data@fra.gov.in</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicDashboard;