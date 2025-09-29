import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ClaimantDashboard from '@/components/dashboards/ClaimantDashboard';
import DistrictDashboard from '@/components/dashboards/DistrictDashboard';
import CentralDashboard from '@/components/dashboards/CentralDashboard';
import PublicDashboard from '@/components/dashboards/PublicDashboard';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'claimant':
        return <ClaimantDashboard />;
      case 'district':
        return <DistrictDashboard />;
      case 'central':
        return <CentralDashboard />;
      case 'public':
        return <PublicDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return <div className="min-h-screen bg-background">{renderDashboard()}</div>;
};

export default Dashboard;