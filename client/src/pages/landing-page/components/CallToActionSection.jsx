import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Find Your Perfect
              <span className="block">Dentist Today</span>
            </h2>
            
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Don't wait for dental problems to worsen. Take the first step towards better oral health by connecting with qualified dental professionals in your area.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/dentist-selection">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
                >
                  Start Booking Now
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
              >
                Call (555) 123-4567
              </Button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-white flex-shrink-0" />
                <span className="text-sm">Instant booking confirmation</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={20} className="text-white flex-shrink-0" />
                <span className="text-sm">HIPAA compliant platform</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} className="text-white flex-shrink-0" />
                <span className="text-sm">24/7 customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Star" size={20} className="text-white flex-shrink-0" />
                <span className="text-sm">Verified dentist reviews</span>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy patient after dental treatment"
                className="rounded-2xl shadow-2xl w-full h-96 lg:h-[400px] object-cover"
              />
            </div>

            {/* Floating Success Card */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-2xl p-4 z-20 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Appointment Booked!</p>
                  <p className="text-xs text-muted-foreground">Dr. Smith - Tomorrow 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Floating Rating Card */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-2xl p-4 z-20 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon 
                      key={star}
                      name="Star" 
                      size={16} 
                      className="text-warning fill-current" 
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Excellent Care</p>
                  <p className="text-xs text-muted-foreground">Sarah J. - Verified Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-2xl font-bold mb-1">500+</div>
              <div className="text-sm text-white/80">Verified Dentists</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">10,000+</div>
              <div className="text-sm text-white/80">Happy Patients</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">50+</div>
              <div className="text-sm text-white/80">Cities Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">4.9★</div>
              <div className="text-sm text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;