import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const BookingSummary = ({
  dentist,
  selectedDate,
  selectedTime,
  appointmentType,
  patientInfo,
  notes,
  onContinue,
  onBack,
  isValid,
}) => {
  const appointmentTypes = {
    cleaning: { label: "Dental Cleaning", duration: 60, icon: "Sparkles" },
    consultation: { label: "Consultation", duration: 30, icon: "Stethoscope" },
    filling: { label: "Dental Filling", duration: 45, icon: "Wrench" },
    extraction: { label: "Tooth Extraction", duration: 60, icon: "Scissors" },
    whitening: { label: "Teeth Whitening", duration: 90, icon: "Star" },
    emergency: {
      label: "Emergency Visit",
      duration: 30,
      icon: "AlertTriangle",
    },
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time?.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEndTime = (startTime, duration) => {
    if (!startTime) return "";
    const [hours, minutes] = startTime?.split(":");
    const startDate = new Date();
    startDate?.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return formatTime(
      `${endDate?.getHours()?.toString()?.padStart(2, "0")}:${endDate
        ?.getMinutes()
        ?.toString()
        ?.padStart(2, "0")}`
    );
  };

  const appointmentInfo = appointmentTypes?.[appointmentType];

  return (
    <div className="lg:sticky lg:top-6">
      <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 border-b border-border p-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Booking Summary
          </h3>
          <p className="text-sm text-muted-foreground">
            Review your appointment details
          </p>
        </div>

        <div className="p-4 space-y-6">
          {/* Dentist Information */}
          {dentist && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Dentist
              </h4>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={dentist?.photo}
                    alt={`Dr. ${dentist?.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    Dr. {dentist?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {dentist?.specialization}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appointment Details */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Appointment Details
            </h4>
            <div className="space-y-3">
              {/* Date & Time */}
              {selectedDate && selectedTime && (
                <div className="flex items-start space-x-3">
                  <Icon
                    name="Calendar"
                    size={16}
                    className="text-muted-foreground mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {formatDate(selectedDate)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(selectedTime)} -{" "}
                      {getEndTime(
                        selectedTime,
                        appointmentInfo?.duration || 30
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Appointment Type */}
              {appointmentType && appointmentInfo && (
                <div className="flex items-start space-x-3">
                  <Icon
                    name={appointmentInfo?.icon}
                    size={16}
                    className="text-muted-foreground mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {appointmentInfo?.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Duration: {appointmentInfo?.duration} minutes
                    </div>
                  </div>
                </div>
              )}

              {/* Patient Information */}
              {patientInfo &&
                (patientInfo?.firstName || patientInfo?.lastName) && (
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="User"
                      size={16}
                      className="text-muted-foreground mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {patientInfo?.firstName} {patientInfo?.lastName}
                      </div>
                      {patientInfo?.email && (
                        <div className="text-xs text-muted-foreground">
                          {patientInfo?.email}
                        </div>
                      )}
                      {patientInfo?.phone && (
                        <div className="text-xs text-muted-foreground">
                          {patientInfo?.phone}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Notes */}
              {notes && (
                <div className="flex items-start space-x-3">
                  <Icon
                    name="FileText"
                    size={16}
                    className="text-muted-foreground mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground mb-1">
                      Notes
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-3">
                      {notes}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cost Information */}
          {dentist && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Consultation Fee
                </span>
                <span className="text-lg font-semibold text-foreground">
                  ${dentist?.priceRange}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Payment will be collected at the clinic
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-border p-4 space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={onContinue}
            disabled={!isValid}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue to Confirmation
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Dentist Selection
          </Button>
        </div>
      </div>
      {/* Mobile Bottom Sheet Trigger */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-medium text-foreground">
              {dentist ? `Dr. ${dentist?.name}` : "Select appointment details"}
            </div>
            {selectedDate && selectedTime && (
              <div className="text-xs text-muted-foreground">
                {formatDate(selectedDate)} at {formatTime(selectedTime)}
              </div>
            )}
          </div>
          {dentist && (
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">
                ${dentist?.consultationFee}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="default"
          fullWidth
          onClick={onContinue}
          disabled={!isValid}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Confirmation
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;
