import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const DentistHeader = ({ dentist }) => {
  if (!dentist) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-card">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={dentist?.photo}
            alt={`Dr. ${dentist?.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-foreground truncate">
            Dr. {dentist?.name}
          </h2>
          <p className="text-sm text-muted-foreground mb-1">
            {dentist?.specialization}
          </p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{dentist?.experience} years exp.</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-foreground">
            ${dentist?.priceRange}
          </div>
          <div className="text-xs text-muted-foreground">Consultation Fee</div>
        </div>
      </div>
    </div>
  );
};

export default DentistHeader;
