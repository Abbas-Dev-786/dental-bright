import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookedAppointmentsOfTheDay } from "services/appointment.service";

const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const TimeSlotPicker = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
  appointmentType,
  workingHours,
}) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const { data, error } = useQuery({
    queryKey: ["booked-slots", { date: selectedDate, dentistId: id }],
    queryFn: getBookedAppointmentsOfTheDay,
    enabled: Boolean(selectedDate) && Boolean(id),
    select: (data) => data.documents,
  });

  const generateTimeSlots = () => {
    const day = selectedDate
      ?.toLocaleDateString("en-US", {
        weekday: "long",
      })
      .toLowerCase();

    const workingHoursForDay = workingHours[day] || {};

    // generate 30 mins slots from start to end
    const start = workingHoursForDay.start || "09:00 AM";
    const end = workingHoursForDay.end || "05:00 PM";
    const slots = [];

    let current = parseTime(start);
    const endTime = parseTime(end);

    while (current < endTime) {
      slots.push({
        time: current.toTimeString().split(" ")[0].slice(0, 5),
        available: true,
        duration: 30,
      });
      current.setMinutes(current.getMinutes() + 30);
    }

    // classify them into morning, afternoon, and evening slots
    while (current < endTime) {
      slots.push({
        time: current.toTimeString().slice(0, 5), // HH:MM 24-hour
        available: true,
        duration: 30,
      });
      current = new Date(current.getTime() + 30 * 60 * 1000); // add 30 mins
    }

    const morningSlots = slots.filter((slot) => slot.time < "12:00");
    const afternoonSlots = slots.filter(
      (slot) => slot.time >= "12:00" && slot.time < "18:00"
    );
    const eveningSlots = slots.filter((slot) => slot.time >= "18:00");

    return {
      morning: morningSlots,
      afternoon: afternoonSlots,
      evening: eveningSlots,
    };
  };

  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots();
    }
  }, [selectedDate, appointmentType]);

  const loadAvailableSlots = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Filter slots based on appointment type
    let slots = generateTimeSlots();

    setAvailableSlots(slots);
    setIsLoading(false);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time?.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleTimeSelect = (time) => {
    onTimeSelect(time);
  };

  const TimeSlotButton = ({ slot }) => {
    const isSelected = selectedTime === slot?.time;
    const isAvailable = slot?.available;

    return (
      <Button
        variant={isSelected ? "default" : "outline"}
        size="sm"
        onClick={() => handleTimeSelect(slot?.time)}
        disabled={!isAvailable}
        className={`
          h-12 flex flex-col items-center justify-center transition-all duration-200
          ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
          ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}
        `}
      >
        <span className="text-sm font-medium">{formatTime(slot?.time)}</span>
        <span className="text-xs opacity-75">{slot?.duration} min</span>
      </Button>
    );
  };

  const TimeSlotSection = ({ title, slots, icon }) => (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name={icon} size={16} className="text-muted-foreground" />
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <span className="text-xs text-muted-foreground">
          ({slots?.filter((s) => s?.available)?.length} available)
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {slots?.map((slot) => (
          <TimeSlotButton key={slot?.time} slot={slot} />
        ))}
      </div>
    </div>
  );

  if (!selectedDate) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="text-center">
          <Icon
            name="Calendar"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Select a Date First
          </h3>
          <p className="text-sm text-muted-foreground">
            Please choose a date from the calendar to view available time slots
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Available Time Slots
        </h3>
        <p className="text-sm text-muted-foreground">
          {selectedDate?.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Loading available slots...</span>
          </div>
        </div>
      ) : (
        <div>
          <TimeSlotSection
            title="Morning"
            slots={availableSlots?.morning || []}
            icon="Sunrise"
          />
          <TimeSlotSection
            title="Afternoon"
            slots={availableSlots?.afternoon || []}
            icon="Sun"
          />
          <TimeSlotSection
            title="Evening"
            slots={availableSlots?.evening || []}
            icon="Sunset"
          />

          {selectedTime && (
            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  Selected: {formatTime(selectedTime)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
