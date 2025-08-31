import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklyCalendarGrid = ({ 
  weeklySchedule, 
  onScheduleChange, 
  selectedDate,
  onDateChange 
}) => {
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const daysOfWeek = [
    { key: 'monday', label: 'Monday', short: 'Mon' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { key: 'thursday', label: 'Thursday', short: 'Thu' },
    { key: 'friday', label: 'Friday', short: 'Fri' },
    { key: 'saturday', label: 'Saturday', short: 'Sat' },
    { key: 'sunday', label: 'Sunday', short: 'Sun' }
  ];

  const timeSlots = [];
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour?.toString()?.padStart(2, '0')}:${minute?.toString()?.padStart(2, '0')}`;
      timeSlots?.push(time);
    }
  }

  const handleTimeSlotToggle = (day, time) => {
    const daySchedule = weeklySchedule?.[day] || [];
    const isAvailable = daySchedule?.includes(time);
    
    let updatedSchedule;
    if (isAvailable) {
      updatedSchedule = daySchedule?.filter(slot => slot !== time);
    } else {
      updatedSchedule = [...daySchedule, time]?.sort();
    }
    
    onScheduleChange(day, updatedSchedule);
  };

  const handleMouseDown = (day, time) => {
    setDragStart({ day, time });
    setIsDragging(true);
    handleTimeSlotToggle(day, time);
  };

  const handleMouseEnter = (day, time) => {
    if (isDragging && dragStart) {
      handleTimeSlotToggle(day, time);
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
    setIsDragging(false);
  };

  const isTimeSlotAvailable = (day, time) => {
    const daySchedule = weeklySchedule?.[day] || [];
    return daySchedule?.includes(time);
  };

  const formatTime = (time) => {
    const [hour, minute] = time?.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today?.getDay();
    const monday = new Date(today);
    monday?.setDate(today?.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    return daysOfWeek?.map((day, index) => {
      const date = new Date(monday);
      date?.setDate(monday?.getDate() + index);
      return {
        ...day,
        date: date?.toISOString()?.split('T')?.[0],
        displayDate: date?.getDate()
      };
    });
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Calendar Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Schedule</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="ChevronLeft" size={16} />
              Previous Week
            </Button>
            <Button variant="outline" size="sm">
              Next Week
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
        
        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Week of {weekDates?.[0]?.date} - {weekDates?.[6]?.date}
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-muted rounded"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-border">
            <div className="p-4 text-sm font-medium text-muted-foreground">Time</div>
            {weekDates?.map((day) => (
              <div key={day?.key} className="p-4 text-center border-l border-border">
                <div className="text-sm font-medium text-foreground">{day?.short}</div>
                <div className="text-xs text-muted-foreground mt-1">{day?.displayDate}</div>
              </div>
            ))}
          </div>

          {/* Time Slots Grid */}
          <div className="max-h-96 overflow-y-auto">
            {timeSlots?.map((time, timeIndex) => (
              <div key={time} className={`grid grid-cols-8 border-b border-border hover:bg-muted/50 ${timeIndex % 4 === 0 ? 'border-b-2' : ''}`}>
                <div className="p-2 text-xs text-muted-foreground border-r border-border bg-muted/30">
                  {timeIndex % 4 === 0 && formatTime(time)}
                </div>
                {daysOfWeek?.map((day) => (
                  <div
                    key={`${day?.key}-${time}`}
                    className="border-l border-border relative"
                  >
                    <button
                      className={`w-full h-6 transition-colors duration-150 hover:opacity-80 ${
                        isTimeSlotAvailable(day?.key, time)
                          ? 'bg-success hover:bg-success/80' :'bg-transparent hover:bg-muted'
                      }`}
                      onMouseDown={() => handleMouseDown(day?.key, time)}
                      onMouseEnter={() => handleMouseEnter(day?.key, time)}
                      onMouseUp={handleMouseUp}
                      title={`${day?.label} ${formatTime(time)} - ${isTimeSlotAvailable(day?.key, time) ? 'Available' : 'Unavailable'}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Instructions */}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MousePointer" size={12} />
            <span>Click to toggle availability</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Move" size={12} />
            <span>Drag to select multiple slots</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarGrid;