import React from "react";
import Icon from "../../../components/AppIcon";

import Button from "../../../components/ui/Button";

const SearchAndSort = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onToggleFilters,
  resultsCount,
}) => {
  const sortOptions = [
    { value: "experience", label: "Most Experienced", icon: "Award" },
    { value: "availability", label: "Available Today", icon: "Clock" },
    { value: "price-low", label: "Price: Low to High", icon: "TrendingUp" },
    { value: "price-high", label: "Price: High to Low", icon: "TrendingDown" },
    { value: "name", label: "Name A-Z", icon: "SortAsc" },
  ];

  const currentSort = sortOptions?.find((option) => option?.value === sortBy);

  return (
    <div className="bg-background border-b border-border p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search dentists by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>
      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Results Count & Filter Toggle */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="lg:hidden"
            iconName="Filter"
            iconPosition="left"
          >
            Filters
          </Button>
          <span className="text-sm text-muted-foreground">
            {resultsCount} dentist{resultsCount !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg text-foreground hover:bg-muted transition-colors duration-200 min-w-48">
            <Icon name={currentSort?.icon || "SortAsc"} size={16} />
            <span className="text-sm font-medium">
              {currentSort?.label || "Sort by"}
            </span>
            <Icon name="ChevronDown" size={16} className="ml-auto" />
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="py-1">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onSortChange(option?.value)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors duration-200 ${
                    sortBy === option?.value
                      ? "bg-primary/10 text-primary"
                      : "text-popover-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={option?.icon} size={16} />
                  <span>{option?.label}</span>
                  {sortBy === option?.value && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Active Search/Sort Indicators */}
      {(searchQuery || sortBy !== "rating") && (
        <div className="flex flex-wrap items-center gap-2">
          {searchQuery && (
            <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <Icon name="Search" size={14} />
              <span>"{searchQuery}"</span>
              <button
                onClick={() => onSearchChange("")}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {sortBy !== "rating" && (
            <div className="flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
              <Icon name={currentSort?.icon} size={14} />
              <span>{currentSort?.label}</span>
              <button
                onClick={() => onSortChange("rating")}
                className="hover:bg-accent/20 rounded-full p-0.5 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndSort;
