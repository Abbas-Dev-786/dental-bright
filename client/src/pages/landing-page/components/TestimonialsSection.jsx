import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      text: "DentalBright made finding a dentist so easy! I was able to book an appointment within minutes and the dentist was amazing. The whole process was seamless and professional.",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, CA",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      text: "I've been using this platform for my family's dental needs for over a year. The quality of dentists and the booking experience is consistently excellent. Highly recommended!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      text: "As someone with dental anxiety, finding the right dentist was crucial. The detailed profiles and reviews helped me choose a dentist who made me feel comfortable and at ease.",
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Houston, TX",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      text: "The convenience of booking appointments online and the reminder system is fantastic. I never miss an appointment anymore, and the dentists are all top-notch professionals.",
    },
    {
      id: 5,
      name: "Lisa Park",
      location: "Seattle, WA",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      rating: 5,
      text: "Emergency dental care when I needed it most. I was able to find an available dentist within hours and received excellent treatment. This platform is a lifesaver!",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials?.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentIndex(
      currentIndex === testimonials?.length - 1 ? 0 : currentIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials?.length - 1 : currentIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-muted"}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Patients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real patients have to
            say about their experience with DentalBright.
          </p>
        </div>

        {/* Desktop Testimonials Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials?.slice(0, 3)?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-modal transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial?.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial?.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial?.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Testimonials Carousel */}
        <div className="lg:hidden relative">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            {/* Rating */}
            <div className="flex items-center justify-center space-x-1 mb-4">
              {renderStars(testimonials?.[currentIndex]?.rating)}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-muted-foreground mb-6 leading-relaxed text-center">
              "{testimonials?.[currentIndex]?.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center space-x-4">
              <Image
                src={testimonials?.[currentIndex]?.avatar}
                alt={testimonials?.[currentIndex]?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-center">
                <div className="font-semibold text-foreground">
                  {testimonials?.[currentIndex]?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials?.[currentIndex]?.location}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-card hover:shadow-modal transition-shadow duration-200"
            aria-label="Previous testimonial"
          >
            <Icon
              name="ChevronLeft"
              size={20}
              className="text-muted-foreground"
            />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-card hover:shadow-modal transition-shadow duration-200"
            aria-label="Next testimonial"
          >
            <Icon
              name="ChevronRight"
              size={20}
              className="text-muted-foreground"
            />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-8">
            Trusted by patients nationwide
          </p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="text-sm font-medium">4.9/5 Rating</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-sm font-medium">10,000+ Reviews</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-sm font-medium">500+ Dentists</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
