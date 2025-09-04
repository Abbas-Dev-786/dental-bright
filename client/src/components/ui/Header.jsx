import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = ({ isAuthenticated = false, userRole = null, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fix mobile menu toggle with proper cleanup
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Enhanced path checking with fallback
  const isActivePath = (path) => {
    if (!location?.pathname) return false;
    return location?.pathname === path;
  };

  // Public navigation items
  const publicNavItems = [
    { label: "Home", path: "/", icon: "Home" },
    { label: "Find Dentist", path: "/dentist-selection", icon: "Search" },
    { label: "Call me", path: "/call-me", icon: "Phone" },
    // {
    //   label: "Book Appointment",
    //   path: "/appointment-booking",
    //   icon: "Calendar",
    // },
  ];

  // Dentist dashboard navigation items
  const dentistNavItems = [
    { label: "Dashboard", path: "/dentist-dashboard", icon: "LayoutDashboard" },
    { label: "Appointments", path: "/appointments", icon: "Calendar" },
    { label: "Availability", path: "/availability-management", icon: "Clock" },
    { label: "Patients", path: "/patients", icon: "Users" },
  ];

  // Patient booking flow navigation
  const bookingFlowPaths = ["/dentist-selection", "/appointment-booking"];
  const isBookingFlow = bookingFlowPaths?.includes(location?.pathname);

  // Enhanced navigation logic with better fallbacks
  const getNavigationItems = () => {
    if (!isAuthenticated) {
      return publicNavItems;
    }

    if (userRole === "dentist") {
      return dentistNavItems;
    }

    return publicNavItems;
  };

  const navigationItems = getNavigationItems();
  const visibleNavItems = navigationItems?.slice(0, 4) || [];
  const overflowNavItems = navigationItems?.slice(4) || [];

  const Logo = () => (
    <Link
      to="/"
      className="flex items-center space-x-2"
      onClick={closeMobileMenu}
    >
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Stethoscope" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">
        DentalBright
      </span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation with error handling */}
          <nav className="hidden md:flex items-center space-x-8">
            {visibleNavItems?.map((item) => (
              <Link
                key={item?.path || item?.label}
                to={item?.path || "/"}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={item?.icon || "Circle"} size={16} />
                <span>{item?.label || "Unknown"}</span>
              </Link>
            ))}

            {/* Overflow Menu with proper error handling */}
            {overflowNavItems?.length > 0 && (
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
                  <Icon name="MoreHorizontal" size={16} />
                  <span>More</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {overflowNavItems?.map((item) => (
                    <Link
                      key={item?.path || item?.label}
                      to={item?.path || "/"}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? "text-primary"
                          : "text-popover-foreground"
                      }`}
                    >
                      <Icon name={item?.icon || "Circle"} size={16} />
                      <span>{item?.label || "Unknown"}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Auth Actions with better error handling */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {userRole === "dentist" ? "Dr. Smith" : "Patient"}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    try {
                      if (onLogout) {
                        onLogout();
                      }
                    } catch (error) {
                      console.error("Logout error:", error);
                    }
                  }}
                >
                  <Icon name="LogOut" size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/appointment-booking">
                  <Button variant="default" size="sm">
                    Book Now
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with improved accessibility */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-modal relative z-40">
          <div className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path || item?.label}
                to={item?.path || "/"}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={item?.icon || "Circle"} size={20} />
                <span>{item?.label || "Unknown"}</span>
              </Link>
            ))}

            {/* Mobile Auth Actions */}
            <div className="pt-4 border-t border-border">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {userRole === "dentist" ? "Dr. Smith" : "Patient"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {userRole === "dentist"
                          ? "Dental Professional"
                          : "Patient Account"}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      try {
                        if (onLogout) {
                          onLogout();
                        }
                        closeMobileMenu();
                      } catch (error) {
                        console.error("Mobile logout error:", error);
                      }
                    }}
                  >
                    <Icon name="LogOut" size={16} />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button variant="ghost" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/appointment-booking" onClick={closeMobileMenu}>
                    <Button variant="default" fullWidth>
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
