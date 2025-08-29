import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const DentistCard = ({ dentist, onQuickView }) => {
  const navigate = useNavigate();

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const workingHours = JSON.parse(dentist?.workingHours || "{}");

  const handleSelectDentist = () => {
    // Store selected dentist in localStorage for booking flow
    localStorage.setItem("selectedDentist", JSON.stringify(dentist));
    navigate(`/appointment-booking/${dentist?.$id}`);
  };

  const handleQuickView = (e) => {
    e?.stopPropagation();
    onQuickView(dentist);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-modal transition-all duration-300 hover:-translate-y-1 group">
      {/* Dentist Photo */}
      <div className="flex flex-col items-start space-y-4 ">
        <div className="relative flex-shrink-0 mx-auto sm:mx-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
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

        {/* Dentist Info */}
        <div className="flex-1 text-center sm:text-left items-center justify-between w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Dr. {dentist?.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-1">
                {dentist?.specialization}
              </p>
            </div>
            <button
              onClick={handleQuickView}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 mt-2 sm:mt-0"
              title="Quick view"
            >
              <Icon name="Eye" size={18} />
            </button>
          </div>

          {/* Experience & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-3">
            <div className="flex items-center justify-center sm:justify-start space-x-1">
              <Icon name="Award" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {dentist?.experience} years exp.
              </span>
            </div>
          </div>

          {/* Availability Status */}
          <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
            {workingHours?.[currentDay.toLocaleLowerCase()] ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="text-sm text-success font-medium">
                    Available today
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {workingHours?.[currentDay.toLocaleLowerCase()]?.start} to{" "}
                  {workingHours?.[currentDay.toLocaleLowerCase()]?.end}
                </div>
              </div>
            ) : (
              <>
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm text-warning font-medium">
                  Next available: {Object.keys(workingHours).join(", ")}
                </span>
              </>
            )}
          </div>

          {/* Price Range */}
          <div className="flex items-center justify-center sm:justify-start space-x-1 mb-4">
            <Icon
              name="DollarSign"
              size={16}
              className="text-muted-foreground"
            />
            <span className="text-sm text-muted-foreground">
              ${dentist?.priceRange}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleSelectDentist}
              className="flex-1"
              iconName="Calendar"
              iconPosition="left"
            >
              Select Dentist
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuickView}
              className="sm:w-auto"
              iconName="Eye"
              iconPosition="left"
            >
              Quick View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistCard;
