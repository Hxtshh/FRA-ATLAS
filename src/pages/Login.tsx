import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MapPin, User, Building, Globe } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('claimant');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both email and password.',
        variant: 'destructive'
      });
      return;
    }

    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: 'Login Successful',
        description: `Welcome to FRA Atlas & DSS!`
      });
      navigate(`/dashboard/${role}`);
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials or role mismatch. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const roleOptions = [
    {
      value: 'claimant' as UserRole,
      label: 'Community/Claimant',
      icon: User,
      description: 'Submit and track land claims',
      email: 'claimant@fra.gov'
    },
    {
      value: 'district' as UserRole,
      label: 'District/State Authority',
      icon: Building,
      description: 'Review and verify claims',
      email: 'district@fra.gov'
    },
    {
      value: 'central' as UserRole,
      label: 'Central Government/MoTA',
      icon: Globe,
      description: 'Monitor nationwide implementation',
      email: 'central@fra.gov'
    },
    {
      value: 'public' as UserRole,
      label: 'Public/Researcher',
      icon: MapPin,
      description: 'Access open data and research',
      email: 'public@fra.gov'
    }
    
  ];




  

  const selectedRoleData = roleOptions.find(r => r.value === role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center text-primary-foreground">
          <div className="flex justify-center mb-4">
            <MapPin className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold">FRA Atlas & DSS</h1>
          <p className="text-primary-foreground/80 mt-2">
            Forest Rights Act Digital Management System
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Access Your Dashboard</CardTitle>
            <CardDescription>
              Choose your role and sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select 
                  value={role} 
                  onValueChange={(value: UserRole) => {
                    setRole(value);
                    const roleData = roleOptions.find(r => r.value === value);
                    if (roleData) {
                      setEmail(roleData.email);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {selectedRoleData && (
                  <p className="text-sm text-muted-foreground">
                    {selectedRoleData.description}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Demo Credentials</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong>Password:</strong> Use any password</p>
                <p><strong>Note:</strong> Email is auto-filled based on role selection</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;