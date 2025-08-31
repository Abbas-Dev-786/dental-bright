import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const location = useLocation();

  // Default booking flow steps
  const defaultSteps = [
    {
      id: 1,
      label: 'Select Dentist',
      path: '/dentist-selection',
      icon: 'Search',
      description: 'Choose your preferred dentist'
    },
    {
      id: 2,
      label: 'Book Appointment',
      path: '/appointment-booking',
      icon: 'Calendar',
      description: 'Select date and time'
    },
    {
      id: 3,
      label: 'Confirmation',
      path: '/appointment-confirmation',
      icon: 'CheckCircle',
      description: 'Review and confirm'
    }
  ];

  const progressSteps = steps || defaultSteps;
  const current = currentStep || getCurrentStepFromPath(location?.pathname, progressSteps);
  const total = totalSteps || progressSteps?.length;

  function getCurrentStepFromPath(pathname, steps) {
    const step = steps?.find(s => s?.path === pathname);
    return step ? step?.id : 1;
  }

  const getStepStatus = (stepId) => {
    if (stepId < current) return 'completed';
    if (stepId === current) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    return step?.icon;
  };

  const getStepIconColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'current':
        return 'var(--color-primary)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="w-full bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Step {current} of {total}</span>
            <span>{Math.round((current / total) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-medical"
              style={{ width: `${(current / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Desktop Steps */}
        <div className="hidden md:flex items-center justify-between">
          {progressSteps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isLast = index === progressSteps?.length - 1;

            return (
              <div key={step?.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      status === 'completed'
                        ? 'bg-success border-success'
                        : status === 'current' ?'bg-primary border-primary' :'bg-background border-muted-foreground'
                    }`}
                  >
                    <Icon
                      name={getStepIcon(step, status)}
                      size={20}
                      color={
                        status === 'completed' || status === 'current'
                          ? 'white' :'var(--color-muted-foreground)'
                      }
                    />
                  </div>

                  {/* Step Label */}
                  <div className="mt-3 text-center">
                    <div
                      className={`text-sm font-medium ${
                        status === 'current' ?'text-primary'
                          : status === 'completed' ?'text-success' :'text-muted-foreground'
                      }`}
                    >
                      {step?.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 max-w-24">
                      {step?.description}
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4 mt-6">
                    <div
                      className={`h-0.5 transition-all duration-300 ${
                        step?.id < current ? 'bg-success' : 'bg-muted'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Steps */}
        <div className="md:hidden">
          <div className="flex items-center space-x-4">
            {progressSteps?.map((step, index) => {
              const status = getStepStatus(step?.id);
              const isLast = index === progressSteps?.length - 1;

              return (
                <div key={step?.id} className="flex items-center">
                  {/* Step Dot */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      status === 'completed'
                        ? 'bg-success'
                        : status === 'current' ?'bg-primary' :'bg-muted'
                    }`}
                  >
                    <Icon
                      name={getStepIcon(step, status)}
                      size={16}
                      color={
                        status === 'completed' || status === 'current'
                          ? 'white' :'var(--color-muted-foreground)'
                      }
                    />
                  </div>
                  {/* Connector */}
                  {!isLast && (
                    <div
                      className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                        step?.id < current ? 'bg-success' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Info */}
          <div className="mt-4">
            {progressSteps?.map((step) => {
              if (step?.id === current) {
                return (
                  <div key={step?.id} className="text-center">
                    <div className="text-lg font-medium text-primary">
                      {step?.label}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {step?.description}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;