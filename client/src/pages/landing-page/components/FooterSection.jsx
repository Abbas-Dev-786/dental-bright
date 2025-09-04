import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/mission" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
    services: [
      { label: "Find Dentist", href: "/dentist-selection" },
      { label: "Book Appointment", href: "/dentist-selection" },
      { label: "Emergency Care", href: "/emergency" },
      { label: "Dental Plans", href: "/plans" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Patient Portal", href: "/portal" },
      { label: "Insurance", href: "/insurance" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "HIPAA Compliance", href: "/hipaa" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "https://facebook.com" },
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com" },
    { name: "Instagram", icon: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Stethoscope" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold">DentalBright</span>
              </Link>

              <p className="text-slate-300 mb-6 max-w-md">
                Connecting patients with trusted dental professionals
                nationwide. Your oral health journey starts here with our
                premium booking platform.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-slate-300">+18668847201</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-slate-300">
                    support@dentalbookpro.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-slate-300">
                    123 Healthcare Ave, Medical District
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-3">
              {/* Company */}
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  {footerLinks?.company?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        to={link?.href}
                        className="text-slate-300 hover:text-white transition-colors duration-200"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-3">
                  {footerLinks?.services?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        to={link?.href}
                        className="text-slate-300 hover:text-white transition-colors duration-200"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-3">
                  {footerLinks?.support?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        to={link?.href}
                        className="text-slate-300 hover:text-white transition-colors duration-200"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <p className="text-slate-300 text-sm">
                Get the latest updates on dental health tips and platform
                features.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1 lg:w-64"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Footer */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-slate-300 text-sm text-center lg:text-left">
              © {currentYear} DentalBright. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              {footerLinks?.legal?.map((link) => (
                <Link
                  key={link?.label}
                  to={link?.href}
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        {/* <div className="py-6 border-t border-slate-800">
          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-primary" />
              <span className="text-xs text-slate-300">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-primary" />
              <span className="text-xs text-slate-300">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-primary" />
              <span className="text-xs text-slate-300">ADA Approved</span>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default FooterSection;
