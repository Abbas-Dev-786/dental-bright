import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      icon: "Search",
      title: "Find Your Dentist",
      description: "Browse through our network of qualified dental professionals in your area and read patient reviews."
    },
    {
      id: 2,
      icon: "Calendar",
      title: "Choose Your Time",
      description: "Select from available appointment slots that fit your schedule, with real-time availability updates."
    },
    {
      id: 3,
      icon: "CheckCircle",
      title: "Confirm & Visit",
      description: "Receive instant confirmation with appointment details and reminders sent to your preferred contact method."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Booking your dental appointment has never been easier. Get started in just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps?.map((step, index) => (
            <div key={step?.id} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-modal transition-shadow duration-300 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step?.id}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
                  <Icon 
                    name={step?.icon} 
                    size={40} 
                    className="text-primary"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step?.description}
                </p>
              </div>

              {/* Connector Arrow (Desktop) */}
              {index < steps?.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <Icon 
                    name="ArrowRight" 
                    size={24} 
                    className="text-primary/40"
                  />
                </div>
              )}

              {/* Connector Arrow (Mobile) */}
              {index < steps?.length - 1 && (
                <div className="lg:hidden flex justify-center mt-8">
                  <Icon 
                    name="ArrowDown" 
                    size={24} 
                    className="text-primary/40"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-card text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who have found their perfect dentist through our platform. Your oral health journey starts with a single click.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dentist-selection">
              <Button size="lg" className="w-full sm:w-auto">
                Find Dentist Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Verified Dentists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;