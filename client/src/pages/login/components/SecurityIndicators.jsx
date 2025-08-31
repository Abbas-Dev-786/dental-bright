import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'HIPAA Compliant'
    },
    {
      icon: 'CheckCircle',
      text: 'Verified Platform'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon 
              name={feature?.icon} 
              size={16} 
              className="text-success" 
            />
            <span className="text-xs text-muted-foreground font-medium">
              {feature?.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 transition-colors duration-200">
            Terms of Service
          </button>
          {' '}and{' '}
          <button className="text-primary hover:text-primary/80 transition-colors duration-200">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;