import React, { useEffect } from "react";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CallToActionSection from "./components/CallToActionSection";
import FooterSection from "./components/FooterSection";

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e?.target?.getAttribute("href");
      if (target && target?.startsWith("#")) {
        e?.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    // Add event listeners for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links?.forEach((link) => {
      link?.addEventListener("click", handleSmoothScroll);
    });

    // Cleanup
    return () => {
      links?.forEach((link) => {
        link?.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header isAuthenticated={false} userRole={null} onLogout={() => {}} />

      {/* Main Content */}
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* Services Section */}
        <section id="services">
          <ServicesSection />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works">
          <HowItWorksSection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* Call to Action Section */}
        <section id="cta">
          <CallToActionSection />
        </section>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;
