import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const SignupPrompt = ({ selectedRole }) => {
  const getRoleSpecificContent = () => {
    if (selectedRole === "dentist") {
      return {
        title: "New to DentalBright?",
        subtitle:
          "Join thousands of dental professionals managing their practice efficiently",
        benefits: [
          "Streamlined appointment management",
          "Patient communication tools",
          "Practice analytics & insights",
          "Secure HIPAA-compliant platform",
        ],
        ctaText: "Create Dentist Account",
      };
    } else {
      return {
        title: "Don't have an account?",
        subtitle:
          "Join DentalBright to easily book and manage your dental appointments",
        benefits: [
          "Quick appointment booking",
          "Find qualified dentists nearby",
          "Appointment reminders",
          "Secure health records",
        ],
        ctaText: "Create Patient Account",
      };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {content?.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {content?.subtitle}
        </p>

        {/* Benefits List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
          {content?.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 text-left">
              <Icon
                name="Check"
                size={14}
                className="text-success flex-shrink-0"
              />
              <span className="text-xs text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link to="/signup" className="block">
          <Button variant="outline" fullWidth>
            <Icon name="UserPlus" size={16} />
            {content?.ctaText}
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground mt-3">
          Free to get started • No credit card required
        </p>
      </div>
    </div>
  );
};

export default SignupPrompt;
