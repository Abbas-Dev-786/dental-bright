import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import StatsCard from "./components/StatsCard";
import TodaySchedule from "./components/TodaySchedule";
import AppointmentTable from "./components/AppointmentTable";
import CalendarView from "./components/CalendarView";
import NotificationCenter from "./components/NotificationCenter";
import PatientModal from "./components/PatientModal";
import Button from "../../components/ui/Button";

const DentistDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [activeView, setActiveView] = useState("overview");

  // Mock data for today's appointments
  const todayAppointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientId: "P001",
      phone: "(555) 123-4567",
      time: "9:00 AM",
      type: "cleaning",
      status: "confirmed",
      notes:
        "Regular cleaning and checkup. Patient has been experiencing slight sensitivity.",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      patientId: "P002",
      phone: "(555) 234-5678",
      time: "10:30 AM",
      type: "checkup",
      status: "pending",
      notes: "Follow-up appointment for cavity treatment.",
    },
    {
      id: 3,
      patientName: "Emily Rodriguez",
      patientId: "P003",
      phone: "(555) 345-6789",
      time: "2:00 PM",
      type: "filling",
      status: "confirmed",
      notes: "Composite filling for upper left molar.",
    },
    {
      id: 4,
      patientName: "David Wilson",
      patientId: "P004",
      phone: "(555) 456-7890",
      time: "3:30 PM",
      type: "extraction",
      status: "pending",
      notes: "Wisdom tooth extraction. Patient is anxious about the procedure.",
    },
  ];

  // Mock data for all appointments
  const allAppointments = [
    ...todayAppointments?.map((apt) => ({
      ...apt,
      date: new Date()?.toISOString()?.split("T")?.[0],
    })),
    {
      id: 5,
      patientName: "Lisa Thompson",
      patientId: "P005",
      phone: "(555) 567-8901",
      date: "2025-08-28",
      time: "9:00 AM",
      type: "cleaning",
      status: "confirmed",
      duration: "60 min",
      notes: "Regular cleaning appointment",
    },
    {
      id: 6,
      patientName: "Robert Brown",
      patientId: "P006",
      phone: "(555) 678-9012",
      date: "2025-08-28",
      time: "11:00 AM",
      type: "checkup",
      status: "pending",
      duration: "30 min",
      notes: "Annual checkup",
    },
    {
      id: 7,
      patientName: "Jennifer Davis",
      patientId: "P007",
      phone: "(555) 789-0123",
      date: "2025-08-29",
      time: "10:00 AM",
      type: "filling",
      status: "confirmed",
      duration: "45 min",
      notes: "Cavity filling on lower right side",
    },
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "appointment_request",
      title: "New Appointment Request",
      message:
        "John Smith has requested an appointment for teeth cleaning on August 30th at 2:00 PM.",
      timestamp: new Date(Date.now() - 300000),
      read: false,
      priority: "normal",
      actions: [
        {
          label: "Accept",
          action: "accept",
          variant: "default",
          icon: "Check",
        },
        { label: "Decline", action: "decline", variant: "outline", icon: "X" },
      ],
    },
    {
      id: 2,
      type: "cancellation",
      title: "Appointment Cancelled",
      message:
        "Maria Garcia has cancelled her appointment scheduled for today at 4:00 PM.",
      timestamp: new Date(Date.now() - 900000),
      read: false,
      priority: "high",
      actions: [
        {
          label: "Reschedule",
          action: "reschedule",
          variant: "outline",
          icon: "Calendar",
        },
      ],
    },
    {
      id: 3,
      type: "reschedule",
      title: "Reschedule Request",
      message:
        "Tom Wilson wants to reschedule his appointment from August 29th to August 31st.",
      timestamp: new Date(Date.now() - 1800000),
      read: true,
      priority: "normal",
      actions: [
        {
          label: "Approve",
          action: "approve",
          variant: "default",
          icon: "Check",
        },
        {
          label: "Suggest Alternative",
          action: "suggest",
          variant: "outline",
          icon: "Calendar",
        },
      ],
    },
    {
      id: 4,
      type: "message",
      title: "Patient Message",
      message:
        "Anna Lee has sent a message regarding post-treatment care instructions.",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      priority: "normal",
      actions: [
        {
          label: "Reply",
          action: "reply",
          variant: "outline",
          icon: "MessageCircle",
        },
      ],
    },
  ];

  // Mock patient data
  const patients = {
    P001: {
      id: "P001",
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.johnson@email.com",
      address: "123 Main St, Anytown, ST 12345",
      age: 32,
      bloodType: "O+",
      allergies: ["Penicillin"],
      emergencyContact: {
        name: "John Johnson",
        phone: "(555) 123-4568",
      },
      visitHistory: [
        {
          id: 1,
          date: "2025-02-15",
          treatment: "Regular Cleaning",
          status: "completed",
          duration: "60 min",
          cost: "150",
          notes: "No issues found. Recommended regular flossing.",
        },
        {
          id: 2,
          date: "2024-08-20",
          treatment: "Cavity Filling",
          status: "completed",
          duration: "45 min",
          cost: "200",
          notes: "Composite filling on upper right molar.",
        },
      ],
      treatments: [
        {
          id: 1,
          name: "Orthodontic Treatment",
          description: "Braces for teeth alignment",
          status: "in-progress",
          startDate: "2025-01-15",
          endDate: null,
        },
      ],
      notes: [
        {
          id: 1,
          date: "2025-08-27",
          author: "Sarah Smith",
          content:
            "Patient reports sensitivity to cold. Recommended sensitive toothpaste.",
        },
      ],
    },
  };

  // Stats data
  const statsData = [
    {
      title: "Today's Appointments",
      value: todayAppointments?.length?.toString(),
      change: "+2 from yesterday",
      changeType: "positive",
      icon: "Calendar",
      color: "primary",
    },
    {
      title: "Pending Confirmations",
      value: todayAppointments
        ?.filter((apt) => apt?.status === "pending")
        ?.length?.toString(),
      change: "-1 from yesterday",
      changeType: "negative",
      icon: "Clock",
      color: "warning",
    },
    {
      title: "Total Patients",
      value: "247",
      change: "+12 this month",
      changeType: "positive",
      icon: "Users",
      color: "success",
    },
    {
      title: "Revenue Today",
      value: "$1,250",
      change: "+15% from avg",
      changeType: "positive",
      icon: "DollarSign",
      color: "success",
    },
  ];

  // Event handlers
  const handleConfirmAppointment = (appointmentId) => {
    console.log("Confirming appointment:", appointmentId);
    // Implementation would update appointment status
  };

  const handleRescheduleAppointment = (appointmentId) => {
    console.log("Rescheduling appointment:", appointmentId);
    // Implementation would open reschedule modal
  };

  const handleCancelAppointment = (appointmentId) => {
    console.log("Cancelling appointment:", appointmentId);
    // Implementation would cancel appointment
  };

  const handleAddNotes = (appointmentId) => {
    console.log("Adding notes to appointment:", appointmentId);
    // Implementation would open notes modal
  };

  const handleViewPatient = (patientId) => {
    const patient = patients?.[patientId];
    if (patient) {
      setSelectedPatient(patient);
      setShowPatientModal(true);
    }
  };

  const handleScheduleAppointment = (patientId) => {
    setShowPatientModal(false);
    navigate("/appointment-booking", { state: { patientId } });
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    console.log("Marking notification as read:", notificationId);
    // Implementation would update notification status
  };

  const handleMarkAllNotificationsAsRead = () => {
    console.log("Marking all notifications as read");
    // Implementation would update all notification statuses
  };

  const handleNotificationAction = (notificationId, action) => {
    console.log("Notification action:", notificationId, action);
    // Implementation would handle specific notification actions
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header 
      <Header 
        isAuthenticated={true} 
        userRole="dentist" 
        onLogout={handleLogout}
      />*/}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          userRole="dentist"
        />

        {/* Main Content */}
        <div
          className={`flex-1 ${
            sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
          } transition-all duration-300`}
        >
          {/* Breadcrumbs */}
          <BreadcrumbTrail
            customBreadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}
          />

          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, Dr. Smith
                </h1>
                <p className="text-muted-foreground mt-1">
                  Here's what's happening with your practice today.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    setActiveView(
                      activeView === "calendar" ? "overview" : "calendar"
                    )
                  }
                  iconName={
                    activeView === "calendar" ? "LayoutDashboard" : "Calendar"
                  }
                  iconSize={16}
                >
                  {activeView === "calendar"
                    ? "Dashboard View"
                    : "Calendar View"}
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate("/appointment-booking")}
                  iconName="Plus"
                  iconSize={16}
                >
                  New Appointment
                </Button>
              </div>
            </div>

            {activeView === "overview" ? (
              <>
                {/* Stats Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statsData?.map((stat, index) => (
                    <StatsCard
                      key={index}
                      title={stat?.title}
                      value={stat?.value}
                      change={stat?.change}
                      changeType={stat?.changeType}
                      icon={stat?.icon}
                      color={stat?.color}
                    />
                  ))}
                </div> */}

                {/* Today's Schedule */}
                <TodaySchedule
                  appointments={todayAppointments}
                  onConfirm={handleConfirmAppointment}
                  onReschedule={handleRescheduleAppointment}
                  onCancel={handleCancelAppointment}
                  onAddNotes={handleAddNotes}
                />

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Appointments Table */}
                  <div className="xl:col-span-2">
                    <AppointmentTable
                      appointments={allAppointments}
                      onConfirm={handleConfirmAppointment}
                      onReschedule={handleRescheduleAppointment}
                      onCancel={handleCancelAppointment}
                      onViewPatient={handleViewPatient}
                    />
                  </div>

                  {/* Notifications */}
                  {/* <div className="xl:col-span-1">
                    <NotificationCenter
                      notifications={notifications}
                      onMarkAsRead={handleMarkNotificationAsRead}
                      onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                      onAction={handleNotificationAction}
                    />
                  </div> */}
                </div>
              </>
            ) : (
              /* Calendar View */
              <CalendarView
                appointments={allAppointments}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            )}
          </div>
        </div>
      </div>
      {/* Patient Modal */}
      <PatientModal
        patient={selectedPatient}
        isOpen={showPatientModal}
        onClose={() => setShowPatientModal(false)}
        onScheduleAppointment={handleScheduleAppointment}
      />
    </div>
  );
};

export default DentistDashboard;
