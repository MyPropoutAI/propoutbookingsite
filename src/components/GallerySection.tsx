import { Bed, Users, Bath, Wifi, Tv, AirVent, Heart, Video, Image, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getProperties, Property } from "@/services/api";
import { useBookingStore } from "@/store/useBookingStore";

const ApartmentCard = ({ apartment }: { apartment: Property }) => {
  const { openBooking } = useBookingStore();
  
  // Find the first image or video to display
  const displayMedia = apartment.media && apartment.media.length > 0 ? apartment.media[0] : null;

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 elevated-card card-gradient flex flex-col h-full">
      {/* Media */}
      <div className="relative overflow-hidden h-56 bg-muted">
        {displayMedia ? (
          displayMedia.resourceType === 'video' ? (
            <div className="w-full h-full flex items-center justify-center bg-black/10">
              <video 
                src={displayMedia.url} 
                className="w-full h-full object-cover"
                muted
                loop
                onMouseOver={(e) => e.currentTarget.play()}
                onMouseOut={(e) => e.currentTarget.pause()}
              />
              <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white">
                <Video size={14} />
              </div>
            </div>
          ) : (
            <img
              src={displayMedia.url}
              alt={apartment.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Image size={32} />
          </div>
        )}
        
        {/* Status Badge */}
        {apartment.status !== 'available' && (
           <Badge className={`absolute top-3 left-3 border-0 ${
             apartment.status === 'booked' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-rose-500 hover:bg-rose-600'
           }`}>
             {apartment.status === 'booked' ? 'Booked' : 'Maintenance'}
           </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-xl font-display font-semibold text-foreground truncate">{apartment.title}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" /> {apartment.maxGuests} Guests
          </span>
          {/* We can map amenities if needed, but for now we show basic info */}
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{apartment.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {apartment.amenities.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {apartment.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">+{apartment.amenities.length - 3}</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">₦{apartment.pricePerNight.toLocaleString()}</span>
          </div>
          <span className="text-sm text-muted-foreground">per night</span>
        </div>
        <Button 
          variant="hero" 
          onClick={() => openBooking(apartment._id)}
          disabled={apartment.status !== 'available'}
        >
          {apartment.status === 'available' ? 'Book Now' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const GallerySection = () => {
  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ['properties'],
    queryFn: () => getProperties(),
  });

  if (isLoading) {
    return (
      <section id="apartments" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading premium apartments...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="apartments" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
            <p className="text-rose-500">Failed to load apartments. Please try again later.</p>
        </div>
      </section>
    );
  }

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
          {properties?.map((apartment) => (
            <ApartmentCard key={apartment._id} apartment={apartment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
