import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientModal = ({ patient, isOpen, onClose, onScheduleAppointment }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !patient) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'history', label: 'Visit History', icon: 'History' },
    { id: 'treatments', label: 'Treatments', icon: 'Activity' },
    { id: 'notes', label: 'Notes', icon: 'FileText' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      case 'no-show':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{patient?.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{patient?.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{patient?.address}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Medical Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Age: {patient?.age}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Heart" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Blood Type: {patient?.bloodType}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                Allergies: {patient?.allergies?.length > 0 ? patient?.allergies?.join(', ') : 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {patient?.emergencyContact && (
        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-foreground mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{patient?.emergencyContact?.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{patient?.emergencyContact?.phone}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-4">
      {patient?.visitHistory?.map((visit) => (
        <div key={visit?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className="font-medium text-foreground">{visit?.date}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(visit?.status)}`}>
                {visit?.status}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{visit?.duration}</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-foreground">
              <span className="font-medium">Treatment:</span> {visit?.treatment}
            </p>
            {visit?.notes && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Notes:</span> {visit?.notes}
              </p>
            )}
            {visit?.cost && (
              <p className="text-sm text-foreground">
                <span className="font-medium">Cost:</span> ${visit?.cost}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTreatments = () => (
    <div className="space-y-4">
      {patient?.treatments?.map((treatment) => (
        <div key={treatment?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">{treatment?.name}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
              treatment?.status === 'completed' ? getStatusColor('completed') :
              treatment?.status === 'in-progress'? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted/10 text-muted-foreground border-muted/20'
            }`}>
              {treatment?.status}
            </span>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{treatment?.description}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Started: {treatment?.startDate}</span>
              {treatment?.endDate && <span>Completed: {treatment?.endDate}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-4">
      {patient?.notes?.map((note) => (
        <div key={note?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{note?.date}</span>
            <span className="text-xs text-muted-foreground">Dr. {note?.author}</span>
          </div>
          <p className="text-sm text-muted-foreground">{note?.content}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black/50" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-background shadow-modal rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{patient?.name}</h2>
                <p className="text-sm text-muted-foreground">Patient ID: {patient?.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => onScheduleAppointment(patient?.id)}
                iconName="Calendar"
                iconSize={16}
              >
                Schedule Appointment
              </Button>
              <Button variant="ghost" onClick={onClose} iconName="X" iconSize={16} />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'history' && renderHistory()}
            {activeTab === 'treatments' && renderTreatments()}
            {activeTab === 'notes' && renderNotes()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;