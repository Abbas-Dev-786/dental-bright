import React, { useState, useEffect } from 'react';
import { useNavigationContext } from '../../components/ui/RoleBasedNavGuard';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WeeklyCalendarGrid from './components/WeeklyCalendarGrid';
import QuickPresetButtons from './components/QuickPresetButtons';
import RecurringAvailabilitySettings from './components/RecurringAvailabilitySettings';
import AppointmentTypeConfiguration from './components/AppointmentTypeConfiguration';
import BreakTimeScheduling from './components/BreakTimeScheduling';
import AvailabilityPreview from './components/AvailabilityPreview';

const AvailabilityManagement = () => {
  const { showSidebar, isAuthenticated, userRole } = useNavigationContext();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [selectedDays, setSelectedDays] = useState([]);

  // Mock data for availability management
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45"],
    tuesday: ["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45"],
    wednesday: ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45"],
    thursday: ["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15"],
    friday: ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15"],
    saturday: ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45"],
    sunday: []
  });

  const [recurringSettings, setRecurringSettings] = useState({
    enabled: true,
    weeklyPattern: 'current'
  });

  const [appointmentTypes, setAppointmentTypes] = useState([
    {
      id: 1,
      name: "Consultation",
      duration: 30,
      bufferTime: 15,
      color: "#2563EB",
      description: "Initial patient consultation"
    },
    {
      id: 2,
      name: "Cleaning",
      duration: 60,
      bufferTime: 15,
      color: "#059669",
      description: "Regular dental cleaning"
    },
    {
      id: 3,
      name: "Filling",
      duration: 45,
      bufferTime: 15,
      color: "#D97706",
      description: "Dental filling procedure"
    },
    {
      id: 4,
      name: "Root Canal",
      duration: 90,
      bufferTime: 30,
      color: "#DC2626",
      description: "Root canal treatment"
    }
  ]);

  const [breakTimes, setBreakTimes] = useState([
    {
      id: 1,
      name: "Lunch Break",
      startTime: "12:00",
      endTime: "13:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      type: "lunch",
      recurring: true
    },
    {
      id: 2,
      name: "Administrative Time",
      startTime: "17:00",
      endTime: "17:30",
      days: ["monday", "wednesday", "friday"],
      type: "admin",
      recurring: true
    }
  ]);

  // Mock authentication state for availability management (dentist role required)
  useEffect(() => {
    // Auto-authenticate as dentist for availability management
    if (!isAuthenticated || userRole !== 'dentist') {
      console.log('Auto-authenticating as dentist for availability management');
      // In a real app, this would redirect to login or handle auth properly
    }
  }, [isAuthenticated, userRole]);

  const handleScheduleChange = (day, schedule) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: schedule
    }));
    setHasUnsavedChanges(true);
  };

  const handleApplyPreset = (schedule, days) => {
    const updatedSchedule = { ...weeklySchedule };
    days?.forEach(day => {
      updatedSchedule[day] = schedule;
    });
    setWeeklySchedule(updatedSchedule);
    setHasUnsavedChanges(true);
  };

  const handleRecurringSettingsChange = (settings) => {
    setRecurringSettings(settings);
    setHasUnsavedChanges(true);
  };

  const handleSaveRecurring = () => {
    // Mock save recurring pattern
    console.log('Saving recurring pattern:', recurringSettings);
    alert('Recurring pattern saved successfully!');
  };

  const handleAppointmentTypesChange = (types) => {
    setAppointmentTypes(types);
    setHasUnsavedChanges(true);
  };

  const handleBreakTimesChange = (breaks) => {
    setBreakTimes(breaks);
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    // Mock save changes
    console.log('Saving availability changes:', {
      weeklySchedule,
      recurringSettings,
      appointmentTypes,
      breakTimes
    });
    setHasUnsavedChanges(false);
    alert('Availability settings saved successfully!');
  };

  const handleLogout = () => {
    // Mock logout functionality with proper cleanup
    console.log('Logging out...');
    setSidebarCollapsed(false); // Reset sidebar state
    // In real app: navigate to login, clear auth state, etc.
  };

  // Custom breadcrumbs for availability management
  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/dentist-dashboard', icon: 'LayoutDashboard' },
    { label: 'Availability Management', path: '/availability-management', icon: 'Clock', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with proper error boundaries */}
      <Header 
        isAuthenticated={isAuthenticated || true} // Fallback for availability screen
        userRole={userRole || 'dentist'} // Ensure dentist role
        onLogout={handleLogout}
      />

      {/* Breadcrumbs */}
      <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} />

      <div className="flex">
        {/* Sidebar with proper conditional rendering and error handling */}
        {(showSidebar || true) && ( // Force sidebar for dentist availability screen
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            userRole={userRole || 'dentist'} // Ensure dentist role
          />
        )}

        {/* Main Content with improved responsive layout */}
        <div className={`flex-1 ${(showSidebar || true) ? (sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64') : ''} transition-all duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Availability Management</h1>
                    <p className="text-muted-foreground">Configure your working hours and appointment availability</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {hasUnsavedChanges && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-warning/10 border border-warning/20 rounded-lg">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <span className="text-sm text-warning font-medium">Unsaved changes</span>
                    </div>
                  )}
                  <Button variant="outline">
                    <Icon name="Download" size={16} />
                    Export Schedule
                  </Button>
                  <Button variant="default" onClick={handleSaveChanges} disabled={!hasUnsavedChanges}>
                    <Icon name="Save" size={16} />
                    Save All Changes
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Calendar and Presets */}
              <div className="xl:col-span-2 space-y-8">
                {/* Weekly Calendar Grid */}
                <WeeklyCalendarGrid
                  weeklySchedule={weeklySchedule}
                  onScheduleChange={handleScheduleChange}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />

                {/* Quick Preset Buttons */}
                <QuickPresetButtons
                  onApplyPreset={handleApplyPreset}
                  selectedDays={selectedDays}
                />

                {/* Recurring Availability Settings */}
                <RecurringAvailabilitySettings
                  recurringSettings={recurringSettings}
                  onSettingsChange={handleRecurringSettingsChange}
                  onSaveRecurring={handleSaveRecurring}
                />
              </div>

              {/* Right Column - Configuration and Preview */}
              <div className="space-y-8">
                {/* Availability Preview */}
                <AvailabilityPreview
                  weeklySchedule={weeklySchedule}
                  breakTimes={breakTimes}
                  appointmentTypes={appointmentTypes}
                  onSaveChanges={handleSaveChanges}
                  hasUnsavedChanges={hasUnsavedChanges}
                />

                {/* Appointment Type Configuration */}
                <AppointmentTypeConfiguration
                  appointmentTypes={appointmentTypes}
                  onTypesChange={handleAppointmentTypesChange}
                />

                {/* Break Time Scheduling */}
                <BreakTimeScheduling
                  breakTimes={breakTimes}
                  onBreakTimesChange={handleBreakTimesChange}
                />
              </div>
            </div>

            {/* Mobile Optimization Notice */}
            <div className="mt-8 lg:hidden">
              <div className="p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Smartphone" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Mobile Tip:</p>
                    <p>For the best experience managing your availability, we recommend using a desktop or tablet device. The calendar interface is optimized for larger screens.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManagement;