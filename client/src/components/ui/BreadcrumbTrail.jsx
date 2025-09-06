import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const BreadcrumbTrail = ({ customBreadcrumbs }) => {
  const location = useLocation();

  // Default breadcrumb mapping
  const defaultBreadcrumbMap = {
    "/": { label: "Home", icon: "Home" },
    // "/": { label: "Home", icon: "Home" },
    "/dentist-selection": { label: "Find Dentist", icon: "Search" },
    "/appointment-booking": { label: "Book Appointment", icon: "Calendar" },
    "/appointment-confirmation": { label: "Confirmation", icon: "CheckCircle" },
    "/dentist-dashboard": { label: "Dashboard", icon: "LayoutDashboard" },
    "/availability-management": { label: "Availability", icon: "Clock" },
    "/appointments": { label: "Appointments", icon: "Calendar" },
    "/patients": { label: "Patients", icon: "Users" },
    "/treatments": { label: "Treatments", icon: "Activity" },
    "/reports": { label: "Reports", icon: "BarChart3" },
    "/settings": { label: "Settings", icon: "Settings" },
    "/help": { label: "Help & Support", icon: "HelpCircle" },
    "/login": { label: "Login", icon: "LogIn" },
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname
      ?.split("/")
      ?.filter((segment) => segment);
    const breadcrumbs = [];

    // Always start with home for authenticated pages
    if (location?.pathname !== "/landing-page" && location?.pathname !== "/") {
      breadcrumbs?.push({
        label: "Home",
        path: "/landing-page",
        icon: "Home",
      });
    }

    // Build breadcrumbs from path segments
    let currentPath = "";
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const breadcrumbInfo = defaultBreadcrumbMap?.[currentPath];

      if (breadcrumbInfo) {
        breadcrumbs?.push({
          label: breadcrumbInfo?.label,
          path: currentPath,
          icon: breadcrumbInfo?.icon,
          isLast: index === pathSegments?.length - 1,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on landing page or if only one item
  if (
    location?.pathname === "/landing-page" ||
    location?.pathname === "/" ||
    breadcrumbs?.length <= 1
  ) {
    return null;
  }

  return (
    <nav
      className="bg-background border-b border-border hidden md:block"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs?.map((breadcrumb, index) => (
            <li key={breadcrumb?.path + index} className="flex items-center">
              {index > 0 && (
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="text-muted-foreground mx-2"
                />
              )}

              {breadcrumb?.isLast ? (
                <span className="flex items-center space-x-1 text-foreground font-medium">
                  <Icon
                    name={breadcrumb?.icon}
                    size={16}
                    className="text-primary"
                  />
                  <span>{breadcrumb?.label}</span>
                </span>
              ) : (
                <Link
                  to={breadcrumb?.path}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon name={breadcrumb?.icon} size={16} />
                  <span>{breadcrumb?.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbTrail;
