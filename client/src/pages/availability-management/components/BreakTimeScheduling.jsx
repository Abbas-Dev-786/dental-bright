import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BreakTimeScheduling = ({ 
  breakTimes, 
  onBreakTimesChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newBreak, setNewBreak] = useState({
    name: '',
    startTime: '',
    endTime: '',
    days: [],
    type: 'lunch'
  });

  const defaultBreaks = [
    {
      id: 1,
      name: "Lunch Break",
      startTime: "12:00",
      endTime: "13:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      type: "lunch",
      recurring: true
    },
    {
      id: 2,
      name: "Administrative Time",
      startTime: "17:00",
      endTime: "17:30",
      days: ["monday", "wednesday", "friday"],
      type: "admin",
      recurring: true
    }
  ];

  const breaks = breakTimes || defaultBreaks;

  const daysOfWeek = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' }
  ];

  const breakTypes = [
    { value: 'lunch', label: 'Lunch Break', icon: 'Coffee' },
    { value: 'admin', label: 'Administrative', icon: 'FileText' },
    { value: 'emergency', label: 'Emergency Slot', icon: 'AlertTriangle' },
    { value: 'personal', label: 'Personal Time', icon: 'User' }
  ];

  const handleAddBreak = () => {
    if (newBreak?.name && newBreak?.startTime && newBreak?.endTime && newBreak?.days?.length > 0) {
      const updatedBreaks = [
        ...breaks,
        {
          id: Date.now(),
          ...newBreak,
          recurring: true
        }
      ];
      onBreakTimesChange(updatedBreaks);
      setNewBreak({
        name: '',
        startTime: '',
        endTime: '',
        days: [],
        type: 'lunch'
      });
    }
  };

  const handleDeleteBreak = (id) => {
    const updatedBreaks = breaks?.filter(breakTime => breakTime?.id !== id);
    onBreakTimesChange(updatedBreaks);
  };

  const handleDayToggle = (day) => {
    const updatedDays = newBreak?.days?.includes(day)
      ? newBreak?.days?.filter(d => d !== day)
      : [...newBreak?.days, day];
    setNewBreak({ ...newBreak, days: updatedDays });
  };

  const formatTime = (time) => {
    const [hour, minute] = time?.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const getBreakTypeIcon = (type) => {
    const breakType = breakTypes?.find(bt => bt?.value === type);
    return breakType ? breakType?.icon : 'Clock';
  };

  const calculateDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime?.split(':')?.map(Number);
    const [endHour, endMinute] = endTime?.split(':')?.map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const duration = endMinutes - startMinutes;
    
    if (duration >= 60) {
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${duration}m`;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Coffee" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Break Time Scheduling</h3>
              <p className="text-sm text-muted-foreground">Manage lunch breaks, admin time, and emergency slots</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Add New Break */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-4">Add New Break Time</h4>
            
            <div className="space-y-4">
              {/* Break Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  label="Break Name"
                  placeholder="e.g., Lunch Break"
                  value={newBreak?.name}
                  onChange={(e) => setNewBreak({...newBreak, name: e?.target?.value})}
                />
                <Input
                  label="Start Time"
                  type="time"
                  value={newBreak?.startTime}
                  onChange={(e) => setNewBreak({...newBreak, startTime: e?.target?.value})}
                />
                <Input
                  label="End Time"
                  type="time"
                  value={newBreak?.endTime}
                  onChange={(e) => setNewBreak({...newBreak, endTime: e?.target?.value})}
                />
              </div>

              {/* Break Type */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Break Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {breakTypes?.map((type) => (
                    <Button
                      key={type?.value}
                      variant={newBreak?.type === type?.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewBreak({...newBreak, type: type?.value})}
                      className="justify-start"
                    >
                      <Icon name={type?.icon} size={14} />
                      {type?.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Days Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Days of Week</label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek?.map((day) => (
                    <Button
                      key={day?.key}
                      variant={newBreak?.days?.includes(day?.key) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleDayToggle(day?.key)}
                    >
                      {day?.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Add Button */}
              <div className="flex justify-end">
                <Button variant="default" onClick={handleAddBreak}>
                  <Icon name="Plus" size={16} />
                  Add Break Time
                </Button>
              </div>
            </div>
          </div>

          {/* Existing Breaks */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Current Break Times</h4>
            
            {breaks?.map((breakTime) => (
              <div key={breakTime?.id} className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Icon 
                      name={getBreakTypeIcon(breakTime?.type)} 
                      size={20} 
                      className="text-primary" 
                    />
                    <div>
                      <div className="font-medium text-foreground">{breakTime?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(breakTime?.startTime)} - {formatTime(breakTime?.endTime)} 
                        ({calculateDuration(breakTime?.startTime, breakTime?.endTime)})
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {breakTime?.days?.map(day => 
                          daysOfWeek?.find(d => d?.key === day)?.label
                        )?.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      breakTime?.type === 'lunch' ? 'bg-success/10 text-success' :
                      breakTime?.type === 'admin' ? 'bg-primary/10 text-primary' :
                      breakTime?.type === 'emergency'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                    }`}>
                      {breakTypes?.find(bt => bt?.value === breakTime?.type)?.label}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBreak(breakTime?.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {breaks?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Coffee" size={24} className="mx-auto mb-2 opacity-50" />
                <p>No break times scheduled</p>
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Presets</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewBreak({
                  name: 'Lunch Break',
                  startTime: '12:00',
                  endTime: '13:00',
                  days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                  type: 'lunch'
                })}
              >
                <Icon name="Coffee" size={14} />
                Standard Lunch
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewBreak({
                  name: 'Admin Time',
                  startTime: '17:00',
                  endTime: '17:30',
                  days: ['monday', 'wednesday', 'friday'],
                  type: 'admin'
                })}
              >
                <Icon name="FileText" size={14} />
                Admin Time
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewBreak({
                  name: 'Emergency Slot',
                  startTime: '16:00',
                  endTime: '16:30',
                  days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                  type: 'emergency'
                })}
              >
                <Icon name="AlertTriangle" size={14} />
                Emergency Slot
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakTimeScheduling;