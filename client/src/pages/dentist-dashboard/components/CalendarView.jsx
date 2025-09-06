import React, { useState } from "react";

import Button from "../../../components/ui/Button";

const CalendarView = ({ appointments, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
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

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const getAppointmentsForDate = (date) => {
    const dateString = date?.toISOString()?.split("T")?.[0];
    return appointments?.filter(
      (apt) => apt?.start_date?.split("T")?.[0] === dateString
    );
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(
        <div
          key={`empty-${i}`}
          className="h-24 border border-border bg-muted/20"
        ></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const dayAppointments = getAppointmentsForDate(date);
      const isCurrentDay = isToday(date);
      const isSelectedDay = isSelected(date);

      days?.push(
        <div
          key={day}
          onClick={() => onDateSelect(date)}
          className={`h-24 border border-border p-2 cursor-pointer transition-colors duration-200 hover:bg-muted/50 ${
            isCurrentDay ? "bg-primary/10 border-primary/30" : "bg-background"
          } ${isSelectedDay ? "ring-2 ring-primary" : ""}`}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-sm font-medium ${
                isCurrentDay ? "text-primary" : "text-foreground"
              }`}
            >
              {day}
            </span>
            {dayAppointments?.length > 0 && (
              <span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                {dayAppointments?.length}
              </span>
            )}
          </div>

          <div className="space-y-1">
            {dayAppointments?.slice(0, 2)?.map((apt, index) => {
              const startTime = new Date(apt?.start_date);

              return (
                <div
                  key={index}
                  className="text-xs p-1 rounded bg-primary/20 text-primary truncate"
                  title={`${apt?.time} - ${apt?.users?.full_name}`}
                >
                  {String(startTime.getUTCHours()).padStart(2, "0") +
                    ":" +
                    String(startTime.getUTCMinutes()).padStart(2, "0")}{" "}
                  {apt?.users?.full_name}
                </div>
              );
            })}
            {dayAppointments?.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{dayAppointments?.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Calendar View
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(-1)}
                iconName="ChevronLeft"
                iconSize={16}
              />
              <span className="text-lg font-medium text-foreground min-w-48 text-center">
                {monthNames?.[currentMonth?.getMonth()]}{" "}
                {currentMonth?.getFullYear()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(1)}
                iconName="ChevronRight"
                iconSize={16}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMonth(new Date())}
              iconName="Calendar"
              iconSize={16}
            >
              Today
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]?.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
          {renderCalendarDays()}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary/10 border border-primary/30 rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary/20 rounded"></div>
            <span>Has Appointments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-primary rounded"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
