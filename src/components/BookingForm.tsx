import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Phone, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBooking, getProperties, BookingData } from "@/services/api";
import { useBookingStore } from "@/store/useBookingStore";

const BookingForm = () => {
  const { isOpen, closeBooking, selectedPropertyId } = useBookingStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    preferredApartment: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: "",
    additionalMessage: "",
  });

  // Fetch properties for the dropdown
  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getProperties(),
  });

  // Update selected apartment when selectedPropertyId changes
  useEffect(() => {
    if (selectedPropertyId) {
      setFormData(prev => ({ ...prev, preferredApartment: selectedPropertyId }));
    }
  }, [selectedPropertyId]);

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking Request Sent!", {
        description: "We'll contact you within 24 hours to confirm your booking.",
      });
      closeBooking();
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        preferredApartment: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfGuests: "",
        additionalMessage: "",
      });
    },
    onError: (error: any) => {
      toast.error("Booking Failed", {
        description: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.preferredApartment || !formData.checkInDate || !formData.checkOutDate || !formData.numberOfGuests) {
      toast.error("Missing Fields", {
        description: "Please fill in all required fields marked with *",
      });
      return;
    }

    const bookingData: BookingData = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      preferredApartment: formData.preferredApartment,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      numberOfGuests: parseInt(formData.numberOfGuests),
      additionalMessage: formData.additionalMessage,
    };

    mutation.mutate(bookingData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBooking()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2 text-2xl">
            <Calendar className="h-6 w-6 text-primary" />
            Book Your Stay
          </DialogTitle>
          <DialogDescription>
            Secure your 50% Valentine discount! Fill out the form below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Personal Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
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
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+234 800 000 0000"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apartment">Preferred Apartment *</Label>
              <Select 
                value={formData.preferredApartment} 
                onValueChange={(value) => handleChange("preferredApartment", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select apartment" />
                </SelectTrigger>
                <SelectContent>
                  {properties?.map((property) => (
                    <SelectItem key={property._id} value={property._id}>
                      {property.title} - ₦{property.pricePerNight.toLocaleString()}/night
                    </SelectItem>
                  ))}
                  {!properties?.length && <SelectItem value="loading" disabled>Loading apartments...</SelectItem>}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkInDate">Check-in *</Label>
              <Input
                id="checkInDate"
                type="date"
                value={formData.checkInDate}
                onChange={(e) => handleChange("checkInDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOutDate">Check-out *</Label>
              <Input
                id="checkOutDate"
                type="date"
                value={formData.checkOutDate}
                onChange={(e) => handleChange("checkOutDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfGuests">Guests *</Label>
              <Select 
                value={formData.numberOfGuests} 
                onValueChange={(value) => handleChange("numberOfGuests", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="additionalMessage">Additional Message (Optional)</Label>
            <Textarea
              id="additionalMessage"
              placeholder="Any special requests or questions?"
              value={formData.additionalMessage}
              onChange={(e) => handleChange("additionalMessage", e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-4">
            <Button 
              type="submit" 
              variant="promo" 
              size="lg" 
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Booking Request
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to our booking terms. We'll contact you to finalize payment.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
