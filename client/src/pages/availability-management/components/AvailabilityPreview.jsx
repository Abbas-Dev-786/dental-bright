import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilityPreview = ({ 
  weeklySchedule, 
  breakTimes, 
  appointmentTypes,
  onSaveChanges,
  hasUnsavedChanges 
}) => {
  const daysOfWeek = [
    { key: 'monday', label: 'Monday', short: 'Mon' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { key: 'thursday', label: 'Thursday', short: 'Thu' },
    { key: 'friday', label: 'Friday', short: 'Fri' },
    { key: 'saturday', label: 'Saturday', short: 'Sat' },
    { key: 'sunday', label: 'Sunday', short: 'Sun' }
  ];

  const formatTime = (time) => {
    const [hour, minute] = time?.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const getAvailableHours = (daySchedule) => {
    if (!daySchedule || daySchedule?.length === 0) return 'Unavailable';
    
    const sortedSlots = [...daySchedule]?.sort();
    const firstSlot = sortedSlots?.[0];
    const lastSlot = sortedSlots?.[sortedSlots?.length - 1];
    
    // Calculate end time (add 15 minutes to last slot)
    const [lastHour, lastMinute] = lastSlot?.split(':')?.map(Number);
    let endHour = lastHour;
    let endMinute = lastMinute + 15;
    
    if (endMinute >= 60) {
      endMinute = 0;
      endHour += 1;
    }
    
    const endTime = `${endHour?.toString()?.padStart(2, '0')}:${endMinute?.toString()?.padStart(2, '0')}`;
    
    return `${formatTime(firstSlot)} - ${formatTime(endTime)}`;
  };

  const getAvailableSlots = (daySchedule) => {
    return daySchedule ? daySchedule?.length : 0;
  };

  const getTotalWeeklyHours = () => {
    let totalSlots = 0;
    daysOfWeek?.forEach(day => {
      const daySchedule = weeklySchedule?.[day?.key] || [];
      totalSlots += daySchedule?.length;
    });
    return (totalSlots * 15) / 60; // Convert 15-minute slots to hours
  };

  const getBookingDensity = (daySchedule) => {
    let totalSlots = daySchedule ? daySchedule?.length : 0;
    const maxSlots = 40; // 10 hours * 4 slots per hour
    const density = (totalSlots / maxSlots) * 100;
    
    if (density === 0) return { level: 'none', color: 'bg-muted' };
    if (density < 25) return { level: 'low', color: 'bg-success/20' };
    if (density < 50) return { level: 'medium', color: 'bg-warning/20' };
    if (density < 75) return { level: 'high', color: 'bg-primary/20' };
    return { level: 'full', color: 'bg-destructive/20' };
  };

  const getBreaksForDay = (dayKey) => {
    const defaultBreaks = [
      {
        id: 1,
        name: "Lunch Break",
        startTime: "12:00",
        endTime: "13:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        type: "lunch"
      }
    ];
    
    const breaks = breakTimes || defaultBreaks;
    return breaks?.filter(breakTime => breakTime?.days?.includes(dayKey));
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Eye" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Availability Preview</h3>
              <p className="text-sm text-muted-foreground">Review your schedule before saving changes</p>
            </div>
          </div>
          {hasUnsavedChanges && (
            <Button variant="default" onClick={onSaveChanges}>
              <Icon name="Save" size={16} />
              Save Changes
            </Button>
          )}
        </div>
      </div>
      {/* Weekly Summary */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">{getTotalWeeklyHours()?.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Total Hours/Week</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success">
              {daysOfWeek?.filter(day => (weeklySchedule?.[day?.key] || [])?.length > 0)?.length}
            </div>
            <div className="text-sm text-muted-foreground">Working Days</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-warning">
              {(breakTimes || [])?.length}
            </div>
            <div className="text-sm text-muted-foreground">Break Times</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent">
              {(appointmentTypes || [])?.length}
            </div>
            <div className="text-sm text-muted-foreground">Service Types</div>
          </div>
        </div>
      </div>
      {/* Daily Breakdown */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Daily Schedule Overview</h4>
        <div className="space-y-3">
          {daysOfWeek?.map((day) => {
            const daySchedule = weeklySchedule?.[day?.key] || [];
            const density = getBookingDensity(daySchedule);
            const dayBreaks = getBreaksForDay(day?.key);
            
            return (
              <div key={day?.key} className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-foreground">
                      {day?.label}
                    </div>
                    <div className={`w-4 h-4 rounded-full ${density?.color}`} title={`${density?.level} availability`}></div>
                    <div className="text-sm text-foreground">
                      {getAvailableHours(daySchedule)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{getAvailableSlots(daySchedule)} slots</span>
                    </div>
                    {dayBreaks?.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Coffee" size={14} />
                        <span>{dayBreaks?.length} break{dayBreaks?.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Break Times */}
                {dayBreaks?.length > 0 && (
                  <div className="mt-2 ml-16">
                    <div className="flex flex-wrap gap-2">
                      {dayBreaks?.map((breakTime) => (
                        <div key={breakTime?.id} className="px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground">
                          {breakTime?.name}: {formatTime(breakTime?.startTime)} - {formatTime(breakTime?.endTime)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Patient Booking Impact */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-start space-x-3">
          <Icon name="Users" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Patient Booking Impact</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Patients can book appointments during your available time slots</p>
              <p>• Break times will be automatically blocked from patient booking</p>
              <p>• Different appointment types will consume appropriate time slots</p>
              <p>• Changes take effect immediately after saving</p>
            </div>
          </div>
        </div>
      </div>
      {/* Save Confirmation */}
      {hasUnsavedChanges && (
        <div className="p-4 bg-warning/10 border-t border-warning/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">You have unsaved changes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Discard Changes
              </Button>
              <Button variant="default" size="sm" onClick={onSaveChanges}>
                <Icon name="Save" size={14} />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityPreview;