import React, { useState } from "react";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

const AppointmentForm = ({
  appointmentType,
  onAppointmentTypeChange,
  notes,
  onNotesChange,
  patientInfo,
  onPatientInfoChange,
}) => {
  const [errors, setErrors] = useState({});

  const appointmentTypes = [
    {
      value: "cleaning",
      label: "Dental Cleaning",
      description: "Regular cleaning and checkup (60 min)",
    },
    {
      value: "consultation",
      label: "Consultation",
      description: "Initial consultation and examination (30 min)",
    },
    {
      value: "filling",
      label: "Dental Filling",
      description: "Cavity treatment and filling (45 min)",
    },
    {
      value: "extraction",
      label: "Tooth Extraction",
      description: "Tooth removal procedure (60 min)",
    },
    {
      value: "whitening",
      label: "Teeth Whitening",
      description: "Professional whitening treatment (90 min)",
    },
    {
      value: "emergency",
      label: "Emergency Visit",
      description: "Urgent dental care (30 min)",
    },
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value?.trim()) {
          newErrors[name] = "This field is required";
        } else if (value?.trim()?.length < 2) {
          newErrors[name] = "Must be at least 2 characters";
        } else {
          delete newErrors?.[name];
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value?.trim()) {
          newErrors[name] = "Email is required";
        } else if (!emailRegex?.test(value)) {
          newErrors[name] = "Please enter a valid email";
        } else {
          delete newErrors?.[name];
        }
        break;
      case "phone":
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!value?.trim()) {
          newErrors[name] = "Phone number is required";
        } else if (!phoneRegex?.test(value)) {
          newErrors[name] = "Please enter a valid phone number";
        } else {
          delete newErrors?.[name];
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field, value) => {
    onPatientInfoChange({ ...patientInfo, [field]: value });
    validateField(field, value);
  };

  const getAppointmentTypeIcon = (type) => {
    const iconMap = {
      cleaning: "Sparkles",
      consultation: "Stethoscope",
      filling: "Wrench",
      extraction: "Scissors",
      whitening: "Star",
      emergency: "AlertTriangle",
    };
    return iconMap?.[type] || "Calendar";
  };

  return (
    <div className="space-y-6">
      {/* Appointment Type Selection */}
      {/* <div className="bg-card border border-border rounded-lg p-4 shadow-card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Appointment Details
          </h3>
          <p className="text-sm text-muted-foreground">
            Select the type of appointment and provide additional information
          </p>
        </div>

        <Select
          label="Appointment Type"
          description="Choose the type of dental service you need"
          options={appointmentTypes}
          value={appointmentType}
          onChange={onAppointmentTypeChange}
          required
          className="mb-4"
        />

        {appointmentType && (
          <div className="p-3 bg-muted/50 rounded-lg border border-muted">
            <div className="flex items-start space-x-3">
              <Icon
                name={getAppointmentTypeIcon(appointmentType)}
                size={20}
                className="text-primary mt-0.5"
              />
              <div>
                <div className="text-sm font-medium text-foreground">
                  {
                    appointmentTypes?.find(
                      (type) => type?.value === appointmentType
                    )?.label
                  }
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {
                    appointmentTypes?.find(
                      (type) => type?.value === appointmentType
                    )?.description
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}
      {/* Patient Information */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Patient Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Please provide your contact details for the appointment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={patientInfo?.firstName || ""}
            onChange={(e) => handleInputChange("firstName", e?.target?.value)}
            error={errors?.firstName}
            required
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={patientInfo?.lastName || ""}
            onChange={(e) => handleInputChange("lastName", e?.target?.value)}
            error={errors?.lastName}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={patientInfo?.email || ""}
            onChange={(e) => handleInputChange("email", e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={patientInfo?.phone || ""}
            onChange={(e) => handleInputChange("phone", e?.target?.value)}
            error={errors?.phone}
            required
          />
        </div>

        {/* <div className="mt-4">
          <Input
            label="Date of Birth"
            type="date"
            value={patientInfo?.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            description="Optional - helps us provide better care"
          />
        </div> */}
      </div>
      {/* Additional Notes */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Additional Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Any special requests or information we should know about
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes or Special Requests
            </label>
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e?.target?.value)}
              placeholder="Please describe any symptoms, concerns, or special requests..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional - This helps us prepare for your visit
            </p>
          </div>

          {appointmentType === "emergency" && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon
                  name="AlertTriangle"
                  size={16}
                  className="text-error mt-0.5"
                />
                <div>
                  <div className="text-sm font-medium text-error">
                    Emergency Appointment
                  </div>
                  <div className="text-xs text-error/80 mt-1">
                    Please describe your emergency in detail above. For severe
                    pain or trauma, consider calling our emergency line.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
