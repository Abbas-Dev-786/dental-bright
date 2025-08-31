import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your Perfect
              <span className="text-primary block">Dental Care</span>
              Starts Here
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Connect with trusted dental professionals in your area. Book
              appointments seamlessly and take control of your oral health with
              our premium booking platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dentist-selection">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Appointment Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Call Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by 10,000+ patients
              </p>
              {/* <div className="flex items-center justify-center lg:justify-start space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    HIPAA Compliant
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    SSL Secured
                  </span>
                </div>
              </div> */}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://plus.unsplash.com/premium_photo-1673728789221-66eb5b1237f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern dental office with professional dentist"
                className="rounded-2xl shadow-2xl w-full h-96 lg:h-[500px] object-cover"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-modal p-4 z-20 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">4.9</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Patient Rating
                  </p>
                  <p className="text-xs text-muted-foreground">
                    2,500+ reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-modal p-4 z-20 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <span className="text-success font-bold">24h</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Quick Booking
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Same day available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
