import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProperties, Property } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Loader2, Home, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const PropertyCard = ({ property }: { property: Property }) => {
  const displayMedia = property.media && property.media.length > 0 ? property.media[0] : null;

  return (
    <Link to={`/properties/${property._id}`} className="group block">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 sm:h-56 bg-muted overflow-hidden">
          {displayMedia ? (
             displayMedia.resourceType === 'video' ? (
                <video 
                  src={displayMedia.url} 
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
             ) : (
                <img
                  src={displayMedia.url}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
             )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Home size={32} />
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
            ₦{property.pricePerNight.toLocaleString()}/night
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">{property.status}</Badge>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1 mb-3">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{property.address}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
             {property.amenities.slice(0, 2).map((amenity, idx) => (
                <span key={idx} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-sm">
                  {amenity}
                </span>
             ))}
             {property.amenities.length > 2 && <span className="text-xs text-muted-foreground">+{property.amenities.length - 2}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const Properties = () => {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [guests, setGuests] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ['properties', debouncedSearch, priceRange, guests],
    queryFn: () => getProperties({ 
      search: debouncedSearch,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      guests: guests
    }),
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Find Your Perfect Stay</h1>
            <p className="text-muted-foreground">Browse our exclusive collection of properties</p>
          </div>
          
          <Button 
            variant="outline" 
            className="md:hidden w-full flex items-center justify-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} /> Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`
            ${showFilters ? 'block' : 'hidden'} 
            md:block md:col-span-1 space-y-6 bg-card p-6 rounded-lg border shadow-sm h-fit sticky top-24
          `}>
             <div className="flex items-center justify-between md:hidden mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}><X size={18}/></Button>
             </div>

             <div className="space-y-2">
               <label className="text-sm font-medium">Search</label>
               <div className="relative">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input 
                   placeholder="Location, name..." 
                   className="pl-9"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
               </div>
             </div>

             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium">Price Range</label>
                 <span className="text-xs text-muted-foreground">₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}</span>
               </div>
               <Slider
                 min={0}
                 max={1000000}
                 step={10000}
                 value={priceRange}
                 onValueChange={setPriceRange}
                 className="py-4"
               />
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium">Min Guests: {guests}</label>
                <div className="flex gap-2">
                  {[1, 2, 4, 6, 8].map(num => (
                    <Button 
                      key={num}
                      variant={guests === num ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGuests(num)}
                      className="flex-1"
                    >
                      {num}+
                    </Button>
                  ))}
                </div>
             </div>
          </div>

          {/* Properties Grid */}
          <div className="col-span-1 md:col-span-3">
             {isLoading ? (
               <div className="flex flex-col items-center justify-center h-64">
                 <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                 <p className="text-muted-foreground">Finding the best spots...</p>
               </div>
             ) : isError ? (
               <div className="text-center py-12 bg-muted/30 rounded-lg">
                 <p className="text-rose-500">Something went wrong. Please try again.</p>
               </div>
             ) : properties?.length === 0 ? (
               <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                 <p className="text-muted-foreground text-lg">No properties found matching your criteria</p>
                 <Button variant="link" onClick={() => {setSearch(""); setPriceRange([0, 1000000]); setGuests(1);}}>Clear all filters</Button>
               </div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {properties?.map((property) => (
                   <PropertyCard key={property._id} property={property} />
                 ))}
               </div>
             )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
