import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Heart, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    apartment: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.apartment) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Booking Request Sent! 🎉",
      description: "We'll contact you within 24 hours to confirm your booking.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto elevated-card text-center py-12">
            <CardContent>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                Thank You! 💜
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your booking request has been received. Our team will contact you 
                within 24 hours to confirm your reservation and schedule a preview.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Submit Another Request
                </Button>
                <Button variant="hero" asChild>
                  <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-4">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-secondary-foreground">Limited Time Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Book Your Stay or Schedule a Preview
            </h2>
            <p className="text-lg text-muted-foreground">
              Secure your 50% Valentine discount! Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <Card className="elevated-card">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Booking Request Form
              </CardTitle>
              <CardDescription>
                Fields marked with * are required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">Preferred Apartment *</Label>
                    <Select onValueChange={(value) => handleChange("apartment", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select apartment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Luxury Studio Suite - ₦35,000/night</SelectItem>
                        <SelectItem value="2-bedroom">Executive 2-Bedroom - ₦55,000/night</SelectItem>
                        <SelectItem value="penthouse">Premium Penthouse - ₦85,000/night</SelectItem>
                        <SelectItem value="preview">I want to schedule a preview first</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => handleChange("checkIn", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => handleChange("checkOut", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select onValueChange={(value) => handleChange("guests", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5 Guests</SelectItem>
                        <SelectItem value="6">6+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Any special requests or questions?"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" variant="promo" size="lg" className="flex-1">
                    <Send className="h-4 w-4" />
                    Submit Booking Request
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">
                    Prefer to reach us directly?
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="tel:+2348000000000"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      +234 800 000 0000
                    </a>
                    <a
                      href="mailto:bookings@mypropout.com"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      bookings@mypropout.com
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
