import React from "react";
import DentistCard from "./DentistCard";
import Icon from "../../../components/AppIcon";

const DentistGrid = ({ dentists, loading, onQuickView }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-6 shadow-card"
          >
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto sm:mx-0 skeleton-pulse"></div>
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div className="h-6 bg-muted rounded skeleton-pulse"></div>
                <div className="h-4 bg-muted rounded w-3/4 skeleton-pulse"></div>
                <div className="h-4 bg-muted rounded w-1/2 skeleton-pulse"></div>
                <div className="h-10 bg-muted rounded skeleton-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (dentists?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No dentists found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't find any dentists matching your criteria. Try adjusting
          your filters or search terms.
        </p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Filter" size={16} />
            <span>Clear filters</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span>Expand location search</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>Try different dates</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {dentists?.map((dentist) => (
        <DentistCard
          key={dentist?.$id}
          dentist={dentist}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default DentistGrid;
