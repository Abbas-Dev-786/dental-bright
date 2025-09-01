import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Sidebar = ({
  isCollapsed = false,
  onToggleCollapse,
  userRole = "dentist",
}) => {
  const location = useLocation();

  // Enhanced path checking with fallback
  const isActivePath = (path) => {
    if (!location?.pathname || !path) return false;
    return location?.pathname === path;
  };

  // Dentist navigation items
  const dentistNavItems = [
    {
      label: "Dashboard",
      path: "/dentist-dashboard",
      icon: "LayoutDashboard",
      description: "Overview and analytics",
    },
    // {
    //   label: "Appointments",
    //   path: "/appointments",
    //   icon: "Calendar",
    //   description: "Manage appointments",
    // },
    // {
    //   label: "Availability",
    //   path: "/availability-management",
    //   icon: "Clock",
    //   description: "Set working hours",
    // },
  ];

  // Secondary navigation items
  const secondaryNavItems = [
    // {
    //   label: "Settings",
    //   path: "/settings",
    //   icon: "Settings",
    //   description: "Account settings",
    // },
    // {
    //   label: "Help & Support",
    //   path: "/help",
    //   icon: "HelpCircle",
    //   description: "Get assistance",
    // },
  ];

  const Logo = () => (
    <Link
      to="/dentist-dashboard"
      className="flex items-center space-x-3 px-4 py-4"
    >
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon name="Stethoscope" size={20} color="white" />
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-foreground">
            DentalBright
          </span>
          <span className="text-xs text-muted-foreground">
            Professional Dashboard
          </span>
        </div>
      )}
    </Link>
  );

  // Enhanced NavItem component with better error handling
  const NavItem = ({ item, isSecondary = false }) => {
    if (!item?.path || !item?.label) {
      return null; // Skip invalid items
    }

    return (
      <Link
        to={item?.path}
        className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-md transition-all duration-200 group ${
          isActivePath(item?.path)
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        title={isCollapsed ? item?.label : ""}
      >
        <Icon
          name={item?.icon || "Circle"}
          size={20}
          className={`flex-shrink-0 ${
            isActivePath(item?.path) ? "text-primary-foreground" : ""
          }`}
        />
        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{item?.label}</span>
            {item?.description && (
              <span
                className={`text-xs truncate ${
                  isActivePath(item?.path)
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {item?.description}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div
      className={`lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block ${
        isCollapsed ? "lg:w-16" : "lg:w-64"
      } transition-all duration-300`}
    >
      <div className="flex h-full flex-col bg-card border-r border-border shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border">
          <Logo />
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  if (onToggleCollapse) {
                    onToggleCollapse();
                  }
                } catch (error) {
                  console.error("Sidebar toggle error:", error);
                }
              }}
              className="mr-2 p-2"
              aria-label="Collapse sidebar"
            >
              <Icon name="PanelLeftClose" size={16} />
            </Button>
          )}
          {isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  if (onToggleCollapse) {
                    onToggleCollapse();
                  }
                } catch (error) {
                  console.error("Sidebar expand error:", error);
                }
              }}
              className="absolute top-4 -right-3 bg-background border border-border rounded-full p-1 shadow-sm z-10"
              aria-label="Expand sidebar"
            >
              <Icon name="PanelLeftOpen" size={14} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Primary Navigation */}
          <div className="space-y-1">
            {dentistNavItems?.filter(Boolean)?.map((item) => (
              <NavItem key={item?.path || item?.label} item={item} />
            ))}
          </div>

          {/* Divider */}
          {/* <div className="my-6 mx-4 border-t border-border" /> */}

          {/* Secondary Navigation */}
          <div className="space-y-1">
            {secondaryNavItems?.filter(Boolean)?.map((item) => (
              <NavItem
                key={item?.path || item?.label}
                item={item}
                isSecondary
              />
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-border p-4">
          <div
            className={`flex items-center space-x-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-foreground truncate">
                  Dr. Sarah Smith
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Dental Professional
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="mt-3 flex space-x-2">
              <Button variant="ghost" size="sm" className="flex-1">
                <Icon name="Settings" size={14} />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Icon name="LogOut" size={14} />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
