import React from 'react';
import Icon from '../../../components/AppIcon';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: "Smile",
      title: "General Dentistry",
      description: "Comprehensive oral health care including cleanings, fillings, and preventive treatments for the whole family."
    },
    {
      id: 2,
      icon: "Sparkles",
      title: "Cosmetic Dentistry",
      description: "Transform your smile with teeth whitening, veneers, and aesthetic treatments for enhanced confidence."
    },
    {
      id: 3,
      icon: "Shield",
      title: "Orthodontics",
      description: "Straighten teeth and correct bite issues with traditional braces or modern clear aligner solutions."
    },
    {
      id: 4,
      icon: "Zap",
      title: "Emergency Care",
      description: "Immediate dental care for urgent situations including pain relief and emergency procedures."
    },
    {
      id: 5,
      icon: "Heart",
      title: "Pediatric Dentistry",
      description: "Specialized dental care for children in a comfortable, kid-friendly environment with gentle techniques."
    },
    {
      id: 6,
      icon: "Crown",
      title: "Restorative Dentistry",
      description: "Restore damaged teeth with crowns, bridges, implants, and other advanced restorative procedures."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Dental Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From routine cleanings to advanced procedures, our network of qualified dentists provides complete oral health care tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div
              key={service?.id}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-modal transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon 
                  name={service?.icon} 
                  size={32} 
                  className="text-primary"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service?.description}
              </p>

              {/* Learn More Link */}
              <div className="mt-6 flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors duration-200">
                <span className="text-sm">Learn More</span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Need a specific treatment? Our dentists offer personalized care plans.
          </p>
          <button className="inline-flex items-center space-x-2 text-primary font-medium hover:text-primary/80 transition-colors duration-200">
            <span>View All Services</span>
            <Icon name="ExternalLink" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;