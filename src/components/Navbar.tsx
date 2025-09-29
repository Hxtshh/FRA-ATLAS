// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { MapPin, User, LogOut, BarChart3, Map } from 'lucide-react';

// const Navbar = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const location = useLocation();

//   const isActive = (path: string) => location.pathname === path;

//   const getDashboardPath = () => {
//     if (!user) return '/dashboard';
//     return `/dashboard/${user.role}`;
//   };

//   return (
//     <nav className="bg-primary text-primary-foreground shadow-elegant">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <MapPin className="h-8 w-8" />
//             <span className="font-bold text-lg">FRA Atlas & DSS</span>
//           </Link>

//           {/* Navigation Links */}
//           {isAuthenticated && (
//             <div className="hidden md:flex items-center space-x-4">
//               <Link
//                 to={getDashboardPath()}
//                 className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/80 ${
//                   isActive(getDashboardPath()) ? 'bg-primary/80' : ''
//                 }`}
//               >
//                 <BarChart3 className="h-4 w-4" />
//                 <span>Dashboard</span>
//               </Link>
              
//               <Link
//                 to="/map"
//                 className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/80 ${
//                   isActive('/map') ? 'bg-primary/80' : ''
//                 }`}
//               >
//                 <Map className="h-4 w-4" />
//                 <span>Map</span>
//               </Link>
//             </div>
//           )}

//           {/* User Menu */}
//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <div className="hidden md:flex items-center space-x-2">
//                   <User className="h-4 w-4" />
//                   <span className="text-sm">
//                     {user?.name} ({user?.role})
//                   </span>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={logout}
//                   className="text-primary-foreground hover:bg-primary/80"
//                 >
//                   <LogOut className="h-4 w-4" />
//                 </Button>
//               </>
//             ) : (
//               <Link to="/login">
//                 <Button variant="secondary" size="sm">
//                   Login
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { MapPin, User, LogOut, BarChart3, Map, Info } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    return `/dashboard/${user.role}`;
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8" />
            <span className="font-bold text-lg">FRA Atlas & DSS</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Link
                  to={getDashboardPath()}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/80 ${
                    isActive(getDashboardPath()) ? 'bg-primary/80' : ''
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                
                <Link
                  to="/map"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/80 ${
                    isActive('/map') ? 'bg-primary/80' : ''
                  }`}
                >
                  <Map className="h-4 w-4" />
                  <span>Map</span>
                </Link>
              </>
            )}

            {/* About Link (always visible) */}
            <Link
              to="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/80 ${
                isActive('/about') ? 'bg-primary/80' : ''
              }`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">
                    {user?.name} ({user?.role})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-primary-foreground hover:bg-primary/80"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
