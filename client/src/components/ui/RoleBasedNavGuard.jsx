import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Navigation Context
const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Navigation Provider
export const NavigationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [navigationContext, setNavigationContext] = useState('public');
  const location = useLocation();

  // Determine navigation context based on authentication and current path
  useEffect(() => {
    const bookingFlowPaths = ['/dentist-selection', '/appointment-booking', '/appointment-confirmation'];
    const dentistPaths = ['/dentist-dashboard', '/availability-management', '/appointments', '/patients', '/treatments', '/reports'];
    const publicPaths = ['/landing-page', '/', '/about', '/contact', '/login'];

    if (!isAuthenticated) {
      if (bookingFlowPaths?.includes(location?.pathname)) {
        setNavigationContext('booking');
      } else {
        setNavigationContext('public');
      }
    } else {
      if (userRole === 'dentist' && dentistPaths?.some(path => location?.pathname?.startsWith(path))) {
        setNavigationContext('dentist');
      } else if (bookingFlowPaths?.includes(location?.pathname)) {
        setNavigationContext('booking');
      } else {
        setNavigationContext('authenticated');
      }
    }
  }, [isAuthenticated, userRole, location?.pathname]);

  const login = (role = 'patient') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setNavigationContext('public');
  };

  const value = {
    isAuthenticated,
    userRole,
    navigationContext,
    login,
    logout,
    setUserRole
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// Role-based Navigation Guard Component
const RoleBasedNavGuard = ({ children, requiredRole, fallbackComponent }) => {
  const { isAuthenticated, userRole, navigationContext } = useNavigation();
  const location = useLocation();

  // Public routes that don't require authentication
  const publicRoutes = ['/landing-page', '/', '/about', '/contact', '/login', '/dentist-selection', '/appointment-booking'];
  
  // Check if current route is public
  const isPublicRoute = publicRoutes?.includes(location?.pathname);

  // If route is public, always allow access
  if (isPublicRoute) {
    return children;
  }

  // If authentication is required but user is not authenticated
  if (requiredRole && !isAuthenticated) {
    return fallbackComponent || <div>Please log in to access this page.</div>;
  }

  // If specific role is required but user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    return fallbackComponent || <div>You don't have permission to access this page.</div>;
  }

  return children;
};

// Navigation Context Detector Hook
export const useNavigationContext = () => {
  const { navigationContext, isAuthenticated, userRole } = useNavigation();
  const location = useLocation();

  const getNavigationProps = () => {
    switch (navigationContext) {
      case 'public':
        return {
          showPublicNav: true,
          showBookingProgress: false,
          showSidebar: false,
          showBreadcrumbs: false
        };
      case 'booking':
        return {
          showPublicNav: false,
          showBookingProgress: true,
          showSidebar: false,
          showBreadcrumbs: true
        };
      case 'dentist':
        return {
          showPublicNav: false,
          showBookingProgress: false,
          showSidebar: true,
          showBreadcrumbs: true
        };
      case 'authenticated':
        return {
          showPublicNav: true,
          showBookingProgress: false,
          showSidebar: false,
          showBreadcrumbs: true
        };
      default:
        return {
          showPublicNav: true,
          showBookingProgress: false,
          showSidebar: false,
          showBreadcrumbs: false
        };
    }
  };

  return {
    navigationContext,
    isAuthenticated,
    userRole,
    currentPath: location?.pathname,
    ...getNavigationProps()
  };
};

export default RoleBasedNavGuard;