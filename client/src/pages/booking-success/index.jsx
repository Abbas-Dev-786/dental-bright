import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const BookingSuccess = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails || {
    appointmentDate: new Date().toLocaleDateString(),
    appointmentTime: "9:00 AM",
    dentistName: "Dr. Smith",
    serviceName: "General Checkup",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-lg shadow-card p-8 space-y-6">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Check" className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Your appointment has been successfully scheduled.
            </p>
          </div>

          {/* Booking Details */}
          <div className="border border-border rounded-lg p-6 space-y-4 bg-background/50">
            <h2 className="text-xl font-semibold text-foreground">
              Appointment Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">
                  {formatDate(bookingDetails.appointmentDate)}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium text-foreground">
                  {bookingDetails.appointmentTime}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Dentist</p>
                <p className="font-medium text-foreground">
                  {bookingDetails.dentistName}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="font-medium text-foreground">
                  {bookingDetails.serviceName}
                </p>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 text-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-medium">Important Information</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Please arrive 15 minutes before your appointment time</li>
                  <li>Bring your insurance card and ID</li>
                  <li>
                    Fill out new patient forms if this is your first visit
                  </li>
                  <li>Call 24 hours in advance if you need to reschedule</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.print()}
            >
              <Icon name="Printer" className="w-4 h-4 mr-2" />
              Print Details
            </Button> */}
            <Link to="/" className="flex-1">
              <Button className="w-full">
                <Icon name="Home" className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
          </div>

          {/* Calendar Link */}
          <div className="text-center pt-4 border-t border-border">
            <Button
              variant="link"
              className="text-primary hover:text-primary/80"
              onClick={() => {
                // Add calendar integration logic here
                alert("Calendar integration coming soon!");
              }}
            >
              <Icon name="Calendar" className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
