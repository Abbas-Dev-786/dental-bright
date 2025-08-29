import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const QuickViewModal = ({ dentist, isOpen, onClose }) => {
  const navigate = useNavigate();
  const workingHours = JSON.parse(dentist?.workingHours || "{}");

  if (!isOpen || !dentist) return null;

  const handleSelectDentist = () => {
    localStorage.setItem("selectedDentist", JSON.stringify(dentist));
    navigate(`/appointment-booking/${dentist?.$id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-background rounded-xl shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Dentist Profile
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src={dentist?.photo}
                  alt={`Dr. ${dentist?.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {dentist?.isAvailableToday && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Dr. {dentist?.name}
              </h3>
              <p className="text-primary font-medium text-lg mb-2">
                {dentist?.specialization}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  <Icon
                    name="Award"
                    size={18}
                    className="text-muted-foreground"
                  />
                  <span className="text-muted-foreground">
                    {dentist?.experience} years experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">About</h4>
            <p className="text-muted-foreground leading-relaxed">
              {dentist?.about}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">
              Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dentist?.services?.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-muted-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">
              Education
            </h4>
            <div className="space-y-2">
              {dentist?.education?.map((edu, index) => {
                const [degree, institution, year] = edu.split(" - ");

                return (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon
                      name="GraduationCap"
                      size={16}
                      className="text-muted-foreground mt-1"
                    />
                    <div>
                      <p className="text-foreground font-medium">{degree}</p>
                      <p className="text-muted-foreground text-sm">
                        {institution}, {year}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">
              Working Hours
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(workingHours)?.map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between items-center py-1"
                >
                  <span className="text-muted-foreground capitalize">
                    {day} :- {hours.start} to {hours.end}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-foreground mb-3">
                Consultation Fee
              </h4>
              <div className="flex items-center space-x-1">
                <Icon
                  name="DollarSign"
                  size={18}
                  className="text-muted-foreground"
                />
                <span className="text-foreground font-medium text-lg">
                  ${dentist?.priceRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button
            variant="default"
            onClick={handleSelectDentist}
            className="flex-1"
            iconName="Calendar"
            iconPosition="left"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
