import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AppointmentTypeConfiguration = ({ 
  appointmentTypes, 
  onTypesChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [newType, setNewType] = useState({
    name: '',
    duration: 30,
    bufferTime: 15,
    color: '#2563EB'
  });

  const defaultTypes = [
    {
      id: 1,
      name: "Consultation",
      duration: 30,
      bufferTime: 15,
      color: "#2563EB",
      description: "Initial patient consultation"
    },
    {
      id: 2,
      name: "Cleaning",
      duration: 60,
      bufferTime: 15,
      color: "#059669",
      description: "Regular dental cleaning"
    },
    {
      id: 3,
      name: "Filling",
      duration: 45,
      bufferTime: 15,
      color: "#D97706",
      description: "Dental filling procedure"
    },
    {
      id: 4,
      name: "Root Canal",
      duration: 90,
      bufferTime: 30,
      color: "#DC2626",
      description: "Root canal treatment"
    },
    {
      id: 5,
      name: "Crown/Bridge",
      duration: 120,
      bufferTime: 30,
      color: "#7C3AED",
      description: "Crown or bridge procedure"
    }
  ];

  const types = appointmentTypes || defaultTypes;

  const handleAddType = () => {
    if (newType?.name && newType?.duration) {
      const updatedTypes = [
        ...types,
        {
          id: Date.now(),
          ...newType,
          description: `${newType?.duration} minute appointment`
        }
      ];
      onTypesChange(updatedTypes);
      setNewType({ name: '', duration: 30, bufferTime: 15, color: '#2563EB' });
    }
  };

  const handleEditType = (type) => {
    setEditingType({ ...type });
  };

  const handleSaveEdit = () => {
    const updatedTypes = types?.map(type => 
      type?.id === editingType?.id ? editingType : type
    );
    onTypesChange(updatedTypes);
    setEditingType(null);
  };

  const handleDeleteType = (id) => {
    const updatedTypes = types?.filter(type => type?.id !== id);
    onTypesChange(updatedTypes);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Appointment Types</h3>
              <p className="text-sm text-muted-foreground">Configure service durations and buffer times</p>
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
          {/* Add New Type */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-3">Add New Appointment Type</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <Input
                label="Service Name"
                placeholder="e.g., Consultation"
                value={newType?.name}
                onChange={(e) => setNewType({...newType, name: e?.target?.value})}
              />
              <Input
                label="Duration (minutes)"
                type="number"
                min="15"
                max="240"
                step="15"
                value={newType?.duration}
                onChange={(e) => setNewType({...newType, duration: parseInt(e?.target?.value)})}
              />
              <Input
                label="Buffer Time (minutes)"
                type="number"
                min="0"
                max="60"
                step="5"
                value={newType?.bufferTime}
                onChange={(e) => setNewType({...newType, bufferTime: parseInt(e?.target?.value)})}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Color</label>
                <input
                  type="color"
                  className="w-full h-10 border border-border rounded-md cursor-pointer"
                  value={newType?.color}
                  onChange={(e) => setNewType({...newType, color: e?.target?.value})}
                />
              </div>
              <div className="flex items-end">
                <Button variant="default" onClick={handleAddType} className="w-full">
                  <Icon name="Plus" size={16} />
                  Add Type
                </Button>
              </div>
            </div>
          </div>

          {/* Existing Types */}
          <div className="space-y-3">
            {types?.map((type) => (
              <div key={type?.id} className="p-4 bg-background border border-border rounded-lg">
                {editingType && editingType?.id === type?.id ? (
                  // Edit Mode
                  (<div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <Input
                      label="Service Name"
                      value={editingType?.name}
                      onChange={(e) => setEditingType({...editingType, name: e?.target?.value})}
                    />
                    <Input
                      label="Duration (minutes)"
                      type="number"
                      min="15"
                      max="240"
                      step="15"
                      value={editingType?.duration}
                      onChange={(e) => setEditingType({...editingType, duration: parseInt(e?.target?.value)})}
                    />
                    <Input
                      label="Buffer Time (minutes)"
                      type="number"
                      min="0"
                      max="60"
                      step="5"
                      value={editingType?.bufferTime}
                      onChange={(e) => setEditingType({...editingType, bufferTime: parseInt(e?.target?.value)})}
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Color</label>
                      <input
                        type="color"
                        className="w-full h-10 border border-border rounded-md cursor-pointer"
                        value={editingType?.color}
                        onChange={(e) => setEditingType({...editingType, color: e?.target?.value})}
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <Button variant="default" size="sm" onClick={handleSaveEdit}>
                        <Icon name="Check" size={14} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditingType(null)}>
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </div>)
                ) : (
                  // View Mode
                  (<div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: type?.color }}
                      ></div>
                      <div>
                        <div className="font-medium text-foreground">{type?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDuration(type?.duration)} duration • {formatDuration(type?.bufferTime)} buffer
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditType(type)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteType(type?.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>)
                )}
              </div>
            ))}
          </div>

          {/* Buffer Time Info */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">About Buffer Times:</p>
                <ul className="space-y-1">
                  <li>• Buffer time is added after each appointment for cleanup and preparation</li>
                  <li>• Longer procedures typically need more buffer time</li>
                  <li>• Buffer time prevents back-to-back scheduling conflicts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTypeConfiguration;