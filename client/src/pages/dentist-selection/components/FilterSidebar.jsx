import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";

const FilterSidebar = ({ filters, onFiltersChange, isOpen, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const specializations = [
    "General Dentistry",
    "Orthodontics",
    "Oral Surgery",
    "Periodontics",
    "Endodontics",
    "Prosthodontics",
    "Pediatric Dentistry",
    "Cosmetic Dentistry",
  ];

  const handleSpecializationChange = (specialization, checked) => {
    const newSpecializations = checked
      ? [...localFilters?.specializations, specialization]
      : localFilters?.specializations?.filter((s) => s !== specialization);

    const newFilters = { ...localFilters, specializations: newSpecializations };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      priceRange: {
        ...localFilters?.priceRange,
        [field]: parseInt(value) || 0,
      },
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      specializations: [],
      locations: [],
      availability: [],
      minRating: 0,
      priceRange: { min: 0, max: 1000 },
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return (
      localFilters?.specializations?.length +
      localFilters?.locations?.length +
      localFilters?.availability?.length +
      (localFilters?.minRating > 0 ? 1 : 0) +
      (localFilters?.priceRange?.min > 0 || localFilters?.priceRange?.max < 1000
        ? 1
        : 0)
    );
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Specialization Filter */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">
            Specialization
          </h3>
          <div className="space-y-2">
            {specializations?.map((specialization) => (
              <Checkbox
                key={specialization}
                label={specialization}
                checked={localFilters?.specializations?.includes(
                  specialization
                )}
                onChange={(e) =>
                  handleSpecializationChange(specialization, e?.target?.checked)
                }
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">
            Price Range
          </h3>
          <div className="space-y-3">
            <Input
              label="Min Price ($)"
              className="border border-gray-200"
              type="number"
              value={localFilters?.priceRange?.min}
              onChange={(e) => handlePriceRangeChange("min", e?.target?.value)}
              placeholder="0"
              min="0"
            />
            <Input
              label="Max Price ($)"
              type="number"
              className="border border-gray-200"
              value={localFilters?.priceRange?.max}
              onChange={(e) => handlePriceRangeChange("max", e?.target?.value)}
              placeholder="1000"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 border-r border-border bg-background">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={onClose} />
          <div className="w-80 max-w-[80vw]">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
