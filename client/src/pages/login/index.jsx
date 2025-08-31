import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import LoginForm from "./components/LoginForm";
import SecurityIndicators from "./components/SecurityIndicators";
import SignupPrompt from "./components/SignupPrompt";
import Icon from "../../components/AppIcon";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("patient");

  useEffect(() => {
    // Check if there's a saved role preference
    const savedRole = localStorage.getItem("preferredRole");
    if (savedRole && (savedRole === "patient" || savedRole === "dentist")) {
      setSelectedRole(savedRole);
    }
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    localStorage.setItem("preferredRole", role);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sign In - DentalBright</title>
        <meta
          name="description"
          content="Sign in to your DentalBright account to manage appointments and access dental services."
        />
      </Helmet>
      {/* Header */}
      <Header isAuthenticated={false} onLogout={() => {}} />
      {/* Main Content */}
      <main className="flex-1">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-card">
                  <Icon name="Stethoscope" size={32} color="white" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Sign in to your DentalBright account
              </p>
            </div>

            {/* Login Form Card */}
            <div className="bg-card border border-border rounded-2xl shadow-card p-8">
              <LoginForm
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
              />

              {/* Security Indicators */}
              {/* <SecurityIndicators /> */}
            </div>

            {/* Signup Prompt */}
            {/* <SignupPrompt selectedRole={selectedRole} /> */}

            {/* Quick Access Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Quick access for demo purposes:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  to="/dentist-selection"
                  className="flex-1 text-xs text-primary hover:text-primary/80 transition-colors duration-200 py-2 px-3 bg-primary/5 rounded-md"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Stethoscope" size={14} color="white" />
              </div>
              <span className="text-sm font-medium text-foreground">
                DentalBright
              </span>
            </div>

            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors duration-200">
                Help Center
              </button>
              <button className="hover:text-foreground transition-colors duration-200">
                Contact Support
              </button>
              <span>© {new Date()?.getFullYear()} DentalBright</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
