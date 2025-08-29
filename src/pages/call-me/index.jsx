import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import Header from "components/ui/Header";
import FooterSection from "pages/landing-page/components/FooterSection";
import { client } from "services/elevenlabs";

const CallMe = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would integrate with your backend API
      // For now, we'll just simulate an API call
      await client.conversationalAi.twilio.outboundCall({
        agentId: "agent_9801k3mxk6jyecyr4q8h8t3x5ccv",
        agentPhoneNumberId: "phnum_9101k3n1v1cbfk3r7myrhms5f8ap",
        toNumber: phoneNumber,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting phone number:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
      6,
      10
    )}`;
  };

  const handlePhoneChange = (e) => {
    // const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(e.target.value);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Check" className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Thank You!</h2>
          <p className="text-muted-foreground">
            Our receptionist will call you shortly at {phoneNumber}.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="mt-4"
          >
            Submit Another Number
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center w-full h-[70vh] p-4">
        <div className="max-w-md w-full">
          <div className="bg-card rounded-lg shadow-card p-6 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Request a Call Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your phone number and our receptionist will call you back
                as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  required
                  //   pattern="\(\d{3}\) \d{3}-\d{4}"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Format: (XXX) XXX-XXXX
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="Phone" className="w-4 h-4" />
                    <span>Request Call Back</span>
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default CallMe;
