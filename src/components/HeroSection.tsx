import { Button } from "@/components/ui/button";
import { ArrowDown, Heart, Star, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-apartment.jpg";
import { useBookingStore } from "@/store/useBookingStore";

const HeroSection = () => {
  const { openBooking } = useBookingStore();

  const scrollToApartments = () => {
    document.getElementById("apartments")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl animate-slide-up">
          {/* Valentine Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
            <Heart className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-secondary-foreground">Valentine Special Offer</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            Premium Shortlet Apartments in{" "}
            <span className="text-gradient bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              Abuja
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
            Experience luxury living with PropOut. Beautiful, fully-furnished apartments 
            perfect for business travelers, couples, and organizations.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground font-medium">4.9 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground font-medium">Prime Locations</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button variant="promo" size="xl" onClick={() => openBooking()}>
              <Heart className="h-5 w-5" />
              Book Now - 50% Off
            </Button>
            <Button variant="outline" size="xl" onClick={scrollToApartments} className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              View Apartments
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button onClick={scrollToApartments} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
