import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Users, 
  Building, 
  Globe, 
  ArrowRight,
  CheckCircle,
  BarChart3,
  Shield
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: MapPin,
      title: "Interactive GIS Mapping",
      description: "Visualize land claims with detailed geographic boundaries and satellite imagery"
    },
    {
      icon: BarChart3,
      title: "Decision Support System",
      description: "AI-powered recommendations for claim verification and approval processes"
    },
    {
      icon: Users,
      title: "Multi-Stakeholder Platform",
      description: "Role-based access for claimants, authorities, and public users"
    },
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Blockchain-ready audit trails with privacy-protected public data access"
    }
  ];

  const roleCards = [
    {
      role: 'claimant',
      title: 'Community/Claimant',
      description: 'Submit and track your forest rights applications',
      icon: Users,
      color: 'bg-success text-success-foreground',
      features: ['Submit Claims', 'Track Status', 'View Maps', 'Upload Documents']
    },
    {
      role: 'district',
      title: 'District Authority',
      description: 'Review and verify land claims efficiently',
      icon: Building,
      color: 'bg-info text-info-foreground',
      features: ['Claim Verification', 'DSS Analysis', 'Approval Workflow', 'Performance Analytics']
    },
    {
      role: 'central',
      title: 'Central Government',
      description: 'Monitor nationwide FRA implementation',
      icon: Globe,
      color: 'bg-primary text-primary-foreground',
      features: ['National Overview', 'District Comparison', 'Policy Analytics', 'Report Generation']
    },
    {
      role: 'public',
      title: 'Public/Researcher',
      description: 'Access open datasets and research materials',
      icon: MapPin,
      color: 'bg-accent text-accent-foreground',
      features: ['Open Data Access', 'Research Tools', 'Anonymized Maps', 'Download Datasets']
    }
  ];

  const stats = [
    { label: 'Claims Processed', value: '1,200+', icon: CheckCircle },
    { label: 'Villages Covered', value: '156', icon: MapPin },
    { label: 'Districts Active', value: '24', icon: Building },
    { label: 'Hectares Digitized', value: '12,450', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <MapPin className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              FRA Atlas & DSS
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Forest Rights Act Digital Management System
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
             A digital companion to manage FRA records, map forests, and connect benefits to people — powered by FRA Atlas, WebGIS, and DSS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Access Your Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/public">
                <Button size="lg" variant="secondary">
                  Explore Open Data
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transforming Forest Rights Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive digital platform that brings transparency, efficiency, 
              and accuracy to the Forest Rights Act implementation process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role-Based Access Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designed for Every Stakeholder
            </h2>
            <p className="text-xl text-muted-foreground">
              Tailored dashboards and features for different user roles in the FRA ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roleCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${card.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {card.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link to={`/login`}>
                        <Button className="w-full" variant="outline">
                          Access {card.title} Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Forest Rights Management?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already benefiting from our digital platform. 
            Start your journey towards transparent and efficient forest rights administration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard/public">
              <Button size="lg" variant="secondary">
                Explore Public Data
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-6 w-6" />
                <span className="text-lg font-semibold">FRA Atlas & DSS</span>
              </div>
              <p className="text-sm opacity-80">
                Empowering forest communities through digital innovation and transparent governance.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm opacity-80">
                <div><Link to="/login" className="hover:opacity-100">Login</Link></div>
                <div><Link to="/dashboard/public" className="hover:opacity-100">Public Data</Link></div>
                <div><Link to="/map" className="hover:opacity-100">Interactive Map</Link></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <div className="space-y-2 text-sm opacity-80">
                <div>Ministry of Tribal Affairs</div>
                <div>Government of India</div>
                <div>support@fra.gov.in</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
            © 2024 FRA Atlas & DSS. All rights reserved. | Ministry of Tribal Affairs, Government of India
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
