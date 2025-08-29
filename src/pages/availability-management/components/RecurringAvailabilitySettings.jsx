import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RecurringAvailabilitySettings = ({ 
  recurringSettings, 
  onSettingsChange,
  onSaveRecurring 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [exceptions, setExceptions] = useState([
    {
      id: 1,
      date: "2024-12-25",
      reason: "Christmas Day",
      type: "holiday"
    },
    {
      id: 2,
      date: "2024-01-01",
      reason: "New Year\'s Day",
      type: "holiday"
    }
  ]);
  const [newException, setNewException] = useState({
    date: '',
    reason: '',
    type: 'holiday'
  });

  const handleRecurringToggle = (enabled) => {
    onSettingsChange({
      ...recurringSettings,
      enabled
    });
  };

  const handleWeeklyPatternChange = (pattern) => {
    onSettingsChange({
      ...recurringSettings,
      weeklyPattern: pattern
    });
  };

  const addException = () => {
    if (newException?.date && newException?.reason) {
      setExceptions([
        ...exceptions,
        {
          id: Date.now(),
          ...newException
        }
      ]);
      setNewException({ date: '', reason: '', type: 'holiday' });
    }
  };

  const removeException = (id) => {
    setExceptions(exceptions?.filter(ex => ex?.id !== id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Repeat" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Recurring Availability</h3>
              <p className="text-sm text-muted-foreground">Set up weekly patterns and manage exceptions</p>
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
          {/* Enable Recurring */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <div className="font-medium text-foreground">Enable Recurring Schedule</div>
              <div className="text-sm text-muted-foreground">Apply the same schedule every week</div>
            </div>
            <Checkbox
              checked={recurringSettings?.enabled || false}
              onChange={(e) => handleRecurringToggle(e?.target?.checked)}
            />
          </div>

          {recurringSettings?.enabled && (
            <>
              {/* Weekly Pattern Options */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Weekly Pattern</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant={recurringSettings?.weeklyPattern === 'current' ? 'default' : 'outline'}
                    className="h-auto p-4 flex flex-col items-start space-y-2"
                    onClick={() => handleWeeklyPatternChange('current')}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} />
                      <span className="font-medium">Use Current Week</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Apply current schedule to all future weeks</span>
                  </Button>
                  
                  <Button
                    variant={recurringSettings?.weeklyPattern === 'custom' ? 'default' : 'outline'}
                    className="h-auto p-4 flex flex-col items-start space-y-2"
                    onClick={() => handleWeeklyPatternChange('custom')}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="Settings" size={16} />
                      <span className="font-medium">Custom Pattern</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Create a custom weekly schedule</span>
                  </Button>
                </div>
              </div>

              {/* Save Recurring Pattern */}
              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div>
                  <div className="font-medium text-foreground">Save Recurring Pattern</div>
                  <div className="text-sm text-muted-foreground">This will apply to all future weeks</div>
                </div>
                <Button variant="default" onClick={onSaveRecurring}>
                  <Icon name="Save" size={16} />
                  Save Pattern
                </Button>
              </div>
            </>
          )}

          {/* Exceptions Management */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Schedule Exceptions</h4>
            
            {/* Add New Exception */}
            <div className="p-4 bg-muted/30 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  type="date"
                  label="Date"
                  value={newException?.date}
                  onChange={(e) => setNewException({...newException, date: e?.target?.value})}
                />
                <Input
                  type="text"
                  label="Reason"
                  placeholder="Holiday, vacation, etc."
                  value={newException?.reason}
                  onChange={(e) => setNewException({...newException, reason: e?.target?.value})}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type</label>
                  <select 
                    className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                    value={newException?.type}
                    onChange={(e) => setNewException({...newException, type: e?.target?.value})}
                  >
                    <option value="holiday">Holiday</option>
                    <option value="vacation">Vacation</option>
                    <option value="conference">Conference</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={addException} className="w-full">
                    <Icon name="Plus" size={16} />
                    Add Exception
                  </Button>
                </div>
              </div>
            </div>

            {/* Exceptions List */}
            <div className="space-y-2">
              {exceptions?.map((exception) => (
                <div key={exception?.id} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={
                        exception?.type === 'holiday' ? 'Calendar' :
                        exception?.type === 'vacation' ? 'Plane' :
                        exception?.type === 'conference' ? 'Users' : 'AlertTriangle'
                      } 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <div>
                      <div className="font-medium text-foreground">{exception?.reason}</div>
                      <div className="text-sm text-muted-foreground">{formatDate(exception?.date)}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeException(exception?.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ))}
              
              {exceptions?.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Calendar" size={24} className="mx-auto mb-2 opacity-50" />
                  <p>No exceptions scheduled</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringAvailabilitySettings;