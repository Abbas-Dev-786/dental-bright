import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CalendarComponent = ({
  selectedDate,
  onDateSelect,
  availableDates = [],
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);

    if (date < today) return false;

    const dateString = date?.toISOString()?.split("T")?.[0];
    return availableDates?.includes(dateString);
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const handleDateClick = async (date) => {
    if (!isDateAvailable(date)) return;

    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    onDateSelect(date);
    setIsLoading(false);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setDate(1);
    newMonth?.setMonth(newMonth?.getMonth() + direction);

    setCurrentMonth(newMonth);
  };

  const canNavigatePrevious = () => {
    const today = new Date();
    const prevMonth = new Date(currentMonth);
    prevMonth?.setMonth(currentMonth?.getMonth() - 1);
    return (
      prevMonth?.getMonth() >= today?.getMonth() &&
      prevMonth?.getFullYear() >= today?.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Select Appointment Date
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose an available date for your appointment
        </p>
      </div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth(-1)}
          disabled={!canNavigatePrevious()}
          className="p-2"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>

        <h4 className="text-lg font-medium text-foreground">
          {months?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h4>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth(1)}
          className="p-2"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek?.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days?.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-2 h-10" />;
          }

          const isAvailable = isDateAvailable(date);
          const isSelected = isDateSelected(date);
          const isToday = date?.toDateString() === new Date()?.toDateString();

          return (
            <button
              key={date?.toISOString()}
              onClick={() => handleDateClick(date)}
              disabled={!isAvailable || isLoading}
              className={`
                p-2 h-10 text-sm font-medium rounded-md transition-all duration-200 relative
                ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : isAvailable
                    ? "text-foreground hover:bg-muted hover:text-foreground"
                    : "text-muted-foreground cursor-not-allowed opacity-50"
                }
                ${isToday && !isSelected ? "ring-1 ring-primary" : ""}
              `}
            >
              {date?.getDate()}
              {isToday && (
                <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Loading availability...</span>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-sm" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted rounded-sm" />
            <span className="text-muted-foreground">Unavailable</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 border border-primary rounded-sm" />
            <span className="text-muted-foreground">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
