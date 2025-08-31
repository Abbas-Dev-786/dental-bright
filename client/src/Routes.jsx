import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { NavigationProvider } from "./components/ui/RoleBasedNavGuard";
import NotFound from "pages/NotFound";
import AppointmentBooking from "./pages/appointment-booking";
import Login from "./pages/login";
import LandingPage from "./pages/landing-page";
import AvailabilityManagement from "./pages/availability-management";
import DentistSelection from "./pages/dentist-selection";
import DentistDashboard from "./pages/dentist-dashboard";
import CallMe from "pages/call-me";
import BookingSuccess from "pages/booking-success";

const Routes = () => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/appointment-booking/:id"
              element={<AppointmentBooking />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/call-me" element={<CallMe />} />
            <Route
              path="/availability-management"
              element={<AvailabilityManagement />}
            />
             <Route
              path="/booking-success"
              element={<BookingSuccess />}
            />
            <Route path="/dentist-selection" element={<DentistSelection />} />
            <Route path="/dentist-dashboard" element={<DentistDashboard />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </NavigationProvider>
    </BrowserRouter>
  );
};

export default Routes;
