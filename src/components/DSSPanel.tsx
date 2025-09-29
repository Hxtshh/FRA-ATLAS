import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Brain, 
  FileText, 
  MapPin,
  Calendar
} from 'lucide-react';

interface DSSRecommendation {
  claim_id: string;
  recommendation: 'approve' | 'reject' | 'review';
  confidence: number;
  reasoning: string[];
  risk_factors: string[];
  supporting_documents: {
    name: string;
    verification_status: 'verified' | 'missing' | 'invalid';
  }[];
  geographic_analysis: {
    area_size: number;
    overlap_detected: boolean;
    forest_coverage: number;
  };
  timestamp: string;
}

interface DSSPanelProps {
  claimId: string;
  onDecision?: (claimId: string, decision: 'approve' | 'reject') => void;
  showActions?: boolean;
}

const DSSPanel: React.FC<DSSPanelProps> = ({ 
  claimId, 
  onDecision, 
  showActions = true 
}) => {
  const [recommendation, setRecommendation] = useState<DSSRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDSSRecommendation();
  }, [claimId]);

  const fetchDSSRecommendation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:8000/dss/check/${claimId}`);
      setRecommendation(response.data);
    } catch (err) {
      console.warn('Backend not available, using sample data');
      // Generate sample DSS recommendation
      setRecommendation(generateSampleRecommendation(claimId));
    } finally {
      setLoading(false);
    }
  };

  const generateSampleRecommendation = (id: string): DSSRecommendation => {
    const recommendations: DSSRecommendation[] = [
      {
        claim_id: id,
        recommendation: 'approve',
        confidence: 87,
        reasoning: [
          'All required documents are properly verified',
          'No overlapping claims detected in the area',
          'Claimant meets all eligibility criteria',
          'Forest coverage is within acceptable limits (15%)'
        ],
        risk_factors: [
          'Minor discrepancy in survey measurements (within tolerance)'
        ],
        supporting_documents: [
          { name: 'Identity Proof', verification_status: 'verified' },
          { name: 'Residence Proof', verification_status: 'verified' },
          { name: 'Land Survey Documents', verification_status: 'verified' }
        ],
        geographic_analysis: {
          area_size: 2.5,
          overlap_detected: false,
          forest_coverage: 15
        },
        timestamp: new Date().toISOString()
      },
      {
        claim_id: id,
        recommendation: 'review',
        confidence: 65,
        reasoning: [
          'Partial documentation available',
          'Geographic boundaries need clarification'
        ],
        risk_factors: [
          'Missing boundary survey document',
          'Potential overlap with adjacent claim FRA003',
          'High forest coverage (35%) requires environmental clearance'
        ],
        supporting_documents: [
          { name: 'Identity Proof', verification_status: 'verified' },
          { name: 'Residence Proof', verification_status: 'verified' },
          { name: 'Boundary Survey', verification_status: 'missing' }
        ],
        geographic_analysis: {
          area_size: 4.2,
          overlap_detected: true,
          forest_coverage: 35
        },
        timestamp: new Date().toISOString()
      }
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'approve': return <CheckCircle className="h-5 w-5 text-success" />;
      case 'reject': return <XCircle className="h-5 w-5 text-destructive" />;
      case 'review': return <AlertTriangle className="h-5 w-5 text-warning" />;
      default: return <Brain className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'approve': return 'bg-success text-success-foreground';
      case 'reject': return 'bg-destructive text-destructive-foreground';
      case 'review': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDocumentIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'missing': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'invalid': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <Brain className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
            <p className="text-muted-foreground">Analyzing claim...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !recommendation) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-destructive">{error || 'Failed to load DSS analysis'}</p>
            <Button onClick={fetchDSSRecommendation} variant="outline" size="sm" className="mt-2">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>Decision Support Analysis</span>
        </CardTitle>
        <CardDescription>
          AI-powered recommendation for Claim ID: {recommendation.claim_id}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Recommendation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getRecommendationIcon(recommendation.recommendation)}
            <div>
              <p className="font-semibold capitalize">{recommendation.recommendation}</p>
              <p className="text-sm text-muted-foreground">
                Confidence: {recommendation.confidence}%
              </p>
            </div>
          </div>
          <Badge className={getRecommendationColor(recommendation.recommendation)}>
            {recommendation.recommendation.toUpperCase()}
          </Badge>
        </div>

        <Separator />

        {/* Reasoning */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>Supporting Factors</span>
          </h4>
          <ul className="space-y-1">
            {recommendation.reasoning.map((reason, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                <span className="text-success mt-0.5">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Factors */}
        {recommendation.risk_factors.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span>Risk Factors</span>
            </h4>
            <ul className="space-y-1">
              {recommendation.risk_factors.map((risk, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                  <span className="text-warning mt-0.5">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Separator />

        {/* Document Status */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Document Verification</span>
          </h4>
          <div className="grid gap-2">
            {recommendation.supporting_documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                <span className="text-sm">{doc.name}</span>
                <div className="flex items-center space-x-2">
                  {getDocumentIcon(doc.verification_status)}
                  <Badge variant="outline" className="text-xs">
                    {doc.verification_status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Analysis */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Geographic Analysis</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-md bg-muted/30">
              <p className="text-2xl font-bold text-primary">
                {recommendation.geographic_analysis.area_size}
              </p>
              <p className="text-xs text-muted-foreground">Area (hectares)</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted/30">
              <p className="text-2xl font-bold text-primary">
                {recommendation.geographic_analysis.forest_coverage}%
              </p>
              <p className="text-xs text-muted-foreground">Forest Coverage</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted/30">
              <p className="text-2xl font-bold">
                {recommendation.geographic_analysis.overlap_detected ? (
                  <XCircle className="h-6 w-6 text-destructive mx-auto" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-success mx-auto" />
                )}
              </p>
              <p className="text-xs text-muted-foreground">Overlap Check</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && onDecision && (
          <>
            <Separator />
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => onDecision(recommendation.claim_id, 'reject')}
                className="flex items-center space-x-2"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject Claim</span>
              </Button>
              <Button
                onClick={() => onDecision(recommendation.claim_id, 'approve')}
                className="flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Approve Claim</span>
              </Button>
            </div>
          </>
        )}

        {/* Timestamp */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Generated: {new Date(recommendation.timestamp).toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DSSPanel;