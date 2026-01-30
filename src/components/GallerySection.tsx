import { Bed, Users, Bath, Wifi, Tv, AirVent, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import apartment1 from "@/assets/apartment-1.jpg";
import apartment2 from "@/assets/apartment-2.jpg";
import apartment3 from "@/assets/apartment-3.jpg";

interface Apartment {
  id: number;
  name: string;
  image: string;
  beds: number;
  baths: number;
  guests: number;
  price: number;
  originalPrice: number;
  features: string[];
  popular?: boolean;
}

const apartments: Apartment[] = [
  {
    id: 1,
    name: "Luxury Studio Suite",
    image: apartment1,
    beds: 1,
    baths: 1,
    guests: 2,
    price: 35000,
    originalPrice: 70000,
    features: ["King Bed", "City View", "Workspace"],
  },
  {
    id: 2,
    name: "Executive 2-Bedroom",
    image: apartment2,
    beds: 2,
    baths: 2,
    guests: 4,
    price: 55000,
    originalPrice: 110000,
    features: ["Master Suite", "Dining Area", "Balcony"],
    popular: true,
  },
  {
    id: 3,
    name: "Premium Penthouse",
    image: apartment3,
    beds: 3,
    baths: 3,
    guests: 6,
    price: 85000,
    originalPrice: 170000,
    features: ["Panoramic View", "Living Room", "Kitchen"],
  },
];

const ApartmentCard = ({ apartment }: { apartment: Apartment }) => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 elevated-card card-gradient">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={apartment.image}
          alt={apartment.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {apartment.popular && (
          <Badge className="absolute top-3 left-3 promo-gradient border-0">
            <Heart className="h-3 w-3 mr-1" />
            Popular Choice
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
          50% OFF
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-xl font-display font-semibold text-foreground">{apartment.name}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" /> {apartment.beds} Bed{apartment.beds > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" /> {apartment.baths} Bath{apartment.baths > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" /> {apartment.guests} Guests
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {apartment.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        
        {/* Quick amenities */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <Wifi className="h-4 w-4" />
          <Tv className="h-4 w-4" />
          <AirVent className="h-4 w-4" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">₦{apartment.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground line-through">₦{apartment.originalPrice.toLocaleString()}</span>
          </div>
          <span className="text-sm text-muted-foreground">per night</span>
        </div>
        <Button variant="hero" onClick={scrollToBooking}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const GallerySection = () => {
  return (
    <section id="apartments" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-up">
          <Badge className="bg-secondary text-secondary-foreground mb-4">
            <Heart className="h-3 w-3 mr-1" />
            Valentine Special
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Our Luxury Apartments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of premium shortlet apartments in Abuja's 
            most desirable locations. All prices include our Valentine's 50% discount!
          </p>
        </div>

        {/* Apartments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
