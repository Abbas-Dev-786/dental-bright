import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import DentistHeader from "./components/DentistHeader";
import CalendarComponent from "./components/CalendarComponent";
import TimeSlotPicker from "./components/TimeSlotPicker";
import AppointmentForm from "./components/AppointmentForm";
import BookingSummary from "./components/BookingSummary";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleDentists } from "services/dentist.service";
import { createBooking } from "services/booking.service";
import { format } from "date-fns";

const toUTCISOStringWithoutShift = (dateStr, timeStr) => {
  const [year, month, day] = dateStr.split("-").map(Number); // YYYY-MM-DD
  let [hours, minutes] = timeStr.split(":").map(Number);

  // Create a date at midnight UTC
  const utcDate = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, 0, 0)
  );

  return utcDate.toISOString();
};

const AppointmentBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: dentist, isLoading } = useQuery({
    queryKey: ["dentist", id],
    queryFn: getSingleDentists,
    // select(data) {
    //   return data.document;
    // },
  });

  const { mutate: bookAppointment } = useMutation({
    mutationFn: createBooking,
    onSuccess(data) {
      console.log("Booking created successfully");
      navigate("/booking-success", {
        state: {
          bookingData: {
            appointmentDate: new Date(data.start_date).toLocaleDateString(),
            appointmentTime: new Date(data.start_date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            dentistName: data.dentists.name,
            serviceName: data.dentists.services[0],
          },
        },
      });
    },
    onError(error) {
      console.error("Error creating booking:", error);
    },
  });

  // Form state
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  // Mock available dates (next 30 days excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const workingHours = JSON.parse(dentist?.workingHours || "{}");

    for (let i = 0; i <= 30; i++) {
      const date = new Date(today);
      date?.setDate(today?.getDate() + i);

      const dayName = date
        ?.toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();

      if (workingHours?.[dayName]) {
        dates?.push(date?.toISOString()?.split("T")?.[0]);
      }
    }

    return dates;
  };

  // Validation
  const isFormValid = () => {
    return (
      selectedDate &&
      selectedTime &&
      patientInfo?.firstName?.trim() &&
      patientInfo?.lastName?.trim() &&
      patientInfo?.email?.trim() &&
      patientInfo?.phone?.trim()
    );
  };

  // Handlers
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleAppointmentTypeChange = (type) => {
    setAppointmentType(type);
    setSelectedTime(""); // Reset time when type changes (affects availability)
  };

  const handleNotesChange = (value) => {
    setNotes(value);
  };

  const handlePatientInfoChange = (info) => {
    setPatientInfo(info);
  };

  const handleContinue = async () => {
    if (!isFormValid()) return;

    const bookingDate = format(new Date(selectedDate), "yyyy-MM-dd");

    const [hours, minutes] = selectedTime.split(":").map(Number);

    // set hours and minutes
    let startTime = toUTCISOStringWithoutShift(bookingDate, selectedTime);
    const endTime = toUTCISOStringWithoutShift(
      bookingDate,
      minutes == 30 ? `${hours + 1}:00` : `${hours}:30`
    );

    bookAppointment({
      name: patientInfo?.firstName + " " + patientInfo?.lastName,
      phone: patientInfo?.phone,
      email: patientInfo?.email,
      startDate: startTime,
      endDate: endTime,
      notes,
      dentistId: id,
    });

    // Navigate to confirmation with booking data
    // navigate("/appointment-confirmation", {
    //   state: {
    //     bookingData: {
    //       dentist,
    //       selectedDate,
    //       selectedTime,
    //       appointmentType,
    //       patientInfo,
    //       notes,
    //       bookingId: `BK${Date.now()}`,
    //       createdAt: new Date()?.toISOString(),
    //     },
    //   },
    // });
  };

  const handleBack = () => {
    navigate("/dentist-selection");
  };

  // Redirect if no dentist selected and no mock data
  // useEffect(() => {
  //   if (!dentist) {
  //     navigate("/dentist-selection");
  //   }
  // }, [dentist]);

  // Custom breadcrumbs
  const customBreadcrumbs = [
    { label: "Home", path: "/landing-page", icon: "Home" },
    { label: "Find Dentist", path: "/dentist-selection", icon: "Search" },
    {
      label: "Book Appointment",
      path: "/appointment-booking",
      icon: "Calendar",
      isLast: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Book Appointment - DentalBright</title>
        <meta
          name="description"
          content="Schedule your dental appointment with ease. Choose your preferred date and time for your visit."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header onLogout={() => navigate("/login")} />

        {/* Progress Indicator */}
        {/* <ProgressIndicator 
          currentStep={2} 
          totalSteps={3}
          steps={[
            { label: 'Select Dentist', completed: true },
            { label: 'Book Appointment', completed: false },
            { label: 'Confirmation', completed: false }
          ]}
        /> */}

        {/* Breadcrumbs */}
        <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32 lg:pb-6">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Page Header */}
              <div className="text-center lg:text-left">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Book Your Appointment
                </h1>
                <p className="text-muted-foreground">
                  Select your preferred date and time for your dental visit
                </p>
              </div>

              {/* Selected Dentist Header */}
              <DentistHeader dentist={dentist} />

              {/* Calendar */}
              <CalendarComponent
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                availableDates={generateAvailableDates()}
              />

              {/* Time Slots */}
              <TimeSlotPicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
                appointmentType={appointmentType}
                workingHours={JSON.parse(dentist?.workingHours || "{}")}
              />

              {/* Appointment Form */}
              <AppointmentForm
                appointmentType={appointmentType}
                onAppointmentTypeChange={handleAppointmentTypeChange}
                notes={notes}
                onNotesChange={handleNotesChange}
                patientInfo={patientInfo}
                onPatientInfoChange={handlePatientInfoChange}
              />
            </div>

            {/* Booking Summary Sidebar */}
            <div className="hidden lg:block">
              <BookingSummary
                dentist={dentist}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                appointmentType={appointmentType}
                patientInfo={patientInfo}
                notes={notes}
                onContinue={handleContinue}
                onBack={handleBack}
                isValid={isFormValid()}
              />
            </div>
          </div>
        </div>

        {/* Mobile Summary Bottom Sheet */}
        <div className="lg:hidden">
          <BookingSummary
            dentist={dentist}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            appointmentType={appointmentType}
            patientInfo={patientInfo}
            notes={notes}
            onContinue={handleContinue}
            onBack={handleBack}
            isValid={isFormValid()}
          />
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg p-6 shadow-modal">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-foreground font-medium">
                  Processing your booking...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppointmentBooking;
