import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickPresetButtons = ({ onApplyPreset, selectedDays = [] }) => {
  const presets = [
    {
      id: 'full-day',
      label: 'Full Day',
      icon: 'Clock',
      description: '8:00 AM - 6:00 PM',
      schedule: generateTimeSlots('08:00', '18:00')
    },
    {
      id: 'morning',
      label: 'Morning Only',
      icon: 'Sunrise',
      description: '8:00 AM - 12:00 PM',
      schedule: generateTimeSlots('08:00', '12:00')
    },
    {
      id: 'afternoon',
      label: 'Afternoon Only',
      icon: 'Sun',
      description: '1:00 PM - 6:00 PM',
      schedule: generateTimeSlots('13:00', '18:00')
    },
    {
      id: 'lunch-break',
      label: 'With Lunch Break',
      icon: 'Coffee',
      description: '8:00 AM - 12:00 PM, 1:00 PM - 6:00 PM',
      schedule: [
        ...generateTimeSlots('08:00', '12:00'),
        ...generateTimeSlots('13:00', '18:00')
      ]
    },
    {
      id: 'half-day',
      label: 'Half Day',
      icon: 'Clock4',
      description: '8:00 AM - 1:00 PM',
      schedule: generateTimeSlots('08:00', '13:00')
    },
    {
      id: 'clear-all',
      label: 'Clear All',
      icon: 'X',
      description: 'Remove all availability',
      schedule: []
    }
  ];

  function generateTimeSlots(startTime, endTime) {
    const slots = [];
    const [startHour, startMinute] = startTime?.split(':')?.map(Number);
    const [endHour, endMinute] = endTime?.split(':')?.map(Number);
    
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const timeSlot = `${currentHour?.toString()?.padStart(2, '0')}:${currentMinute?.toString()?.padStart(2, '0')}`;
      slots?.push(timeSlot);
      
      currentMinute += 15;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }
    
    return slots;
  }

  const handlePresetClick = (preset) => {
    if (selectedDays?.length === 0) {
      alert('Please select at least one day to apply the preset.');
      return;
    }
    
    onApplyPreset(preset?.schedule, selectedDays);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Presets</h3>
        <div className="text-sm text-muted-foreground">
          {selectedDays?.length > 0 ? `Apply to ${selectedDays?.length} day(s)` : 'Select days first'}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {presets?.map((preset) => (
          <Button
            key={preset?.id}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-muted/50 transition-colors duration-200"
            onClick={() => handlePresetClick(preset)}
            disabled={selectedDays?.length === 0}
          >
            <div className="flex items-center space-x-2 w-full">
              <Icon 
                name={preset?.icon} 
                size={16} 
                className={preset?.id === 'clear-all' ? 'text-destructive' : 'text-primary'} 
              />
              <span className="font-medium text-sm">{preset?.label}</span>
            </div>
            <div className="text-xs text-muted-foreground text-left">
              {preset?.description}
            </div>
          </Button>
        ))}
      </div>
      {/* Bulk Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Bulk Actions</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyPreset([], ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])}
          >
            <Icon name="Calendar" size={14} />
            Clear Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyPreset(generateTimeSlots('08:00', '18:00'), ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'])}
          >
            <Icon name="Briefcase" size={14} />
            Set Weekdays
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyPreset(generateTimeSlots('09:00', '15:00'), ['saturday', 'sunday'])}
          >
            <Icon name="Calendar" size={14} />
            Set Weekends
          </Button>
        </div>
      </div>
      {/* Instructions */}
      <div className="mt-4 p-3 bg-muted/30 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">How to use presets:</p>
            <ul className="space-y-1">
              <li>• Select days from the calendar header checkboxes</li>
              <li>• Click a preset to apply the schedule to selected days</li>
              <li>• Use bulk actions for common weekly patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPresetButtons;