import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProperty } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Users, Wifi, Tv, Wind, Car, ShieldCheck, CheckCircle2, ChevronLeft, Calendar as CalendarIcon, Heart, Share2, Star } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Link } from "react-router-dom";

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { openBooking } = useBookingStore();

    const { data: property, isLoading, isError } = useQuery({
        queryKey: ['property', id],
        queryFn: () => getProperty(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return <DetailsSkeleton />;
    }

    if (isError || !property) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Property not found</h2>
                        <p className="text-muted-foreground mb-4">The property you are looking for does not exist or has been removed.</p>
                        <Link to="/properties">
                            <Button>Back to Properties</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const mainMedia = property.media[0];
    const otherMedia = property.media.slice(1);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow pb-20">
                {/* Media Gallery */}
                <div className="container mx-auto px-4 py-6">
                    <Link to="/properties" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
                        <ChevronLeft size={16} className="mr-1" />
                        Back to Search
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
                        {/* Main Large Media */}
                        <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden bg-muted group">
                            {mainMedia?.resourceType === 'video' ? (
                                <video
                                    src={mainMedia.url}
                                    className="w-full h-full object-cover"
                                    controls
                                />
                            ) : (
                                <img
                                    src={mainMedia?.url || "/placeholder.jpg"}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute top-4 left-4">
                                <Badge className={
                                    property.status === 'available' ? 'bg-green-500' :
                                        property.status === 'booked' ? 'bg-amber-500' : 'bg-red-500'
                                }>
                                    {property.status}
                                </Badge>
                            </div>
                        </div>

                        {/* Smaller Grid Items */}
                        {otherMedia.slice(0, 4).map((item, index) => (
                            <div key={index} className={`relative rounded-xl overflow-hidden bg-muted ${index === 3 && otherMedia.length > 4 ? 'opacity-90' : ''}`}>
                                {item.resourceType === 'video' ? (
                                    <video
                                        src={item.url}
                                        className="w-full h-full object-cover"
                                        muted
                                        onMouseOver={e => e.currentTarget.play()}
                                        onMouseOut={e => e.currentTarget.pause()}
                                    />
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={`Gallery ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {/* Overlay count for remaining images */}
                                {index === 3 && otherMedia.length > 4 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                                        +{otherMedia.length - 4}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-4 mt-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{property.title}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={18} className="text-primary" />
                                        {property.address}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={18} className="text-primary" />
                                        {property.maxGuests} Guests
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star size={18} className="text-yellow-500 fill-yellow-500" />
                                        4.9 (12 reviews)
                                    </div>
                                </div>
                            </div>

                            <div className="prose max-w-none text-muted-foreground">
                                <h3 className="text-xl font-semibold text-foreground mb-3">About this space</h3>
                                <p className="leading-relaxed whitespace-pre-line">{property.description}</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {property.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                                            <CheckCircle2 size={18} className="text-green-500" />
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-3 text-muted-foreground"><Wifi size={18} /> Fast Wifi</div>
                                    <div className="flex items-center gap-3 text-muted-foreground"><Tv size={18} /> Smart TV</div>
                                    <div className="flex items-center gap-3 text-muted-foreground"><Wind size={18} /> Air Conditioning</div>
                                    <div className="flex items-center gap-3 text-muted-foreground"><Car size={18} /> Free Parking</div>
                                    <div className="flex items-center gap-3 text-muted-foreground"><ShieldCheck size={18} /> 24/7 Security</div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="relative">
                            <div className="sticky top-24 border rounded-xl p-6 shadow-sm bg-card">
                                <div className="flex items-baseline justify-between mb-6">
                                    <div>
                                        <span className="text-3xl font-bold font-display">₦{property.pricePerNight.toLocaleString()}</span>
                                        <span className="text-muted-foreground"> / night</span>
                                    </div>
                                    <div className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded">50% VALENTINE OFF</div>
                                </div>

                                <div className="space-y-4">
                                    <Button
                                        size="xl"
                                        className="w-full text-lg"
                                        variant="hero"
                                        onClick={() => openBooking(property._id)}
                                        disabled={property.status !== 'available'}
                                    >
                                        <CalendarIcon className="mr-2 h-5 w-5" />
                                        {property.status === 'available' ? 'Book Now' : 'Currently Unavailable'}
                                    </Button>

                                    <Button variant="outline" className="w-full">
                                        <Share2 className="mr-2 h-4 w-4" /> Share Property
                                    </Button>

                                    <div className="text-center text-xs text-muted-foreground mt-4">
                                        <p>You won't be charged yet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const DetailsSkeleton = () => (
    <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
             <Skeleton className="md:col-span-2 md:row-span-2 rounded-xl" />
             <Skeleton className="rounded-xl" />
             <Skeleton className="rounded-xl" />
             <Skeleton className="rounded-xl" />
             <Skeleton className="rounded-xl" />
        </div>
        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-40 w-full" />
            </div>
            <div>
                <Skeleton className="h-80 w-full rounded-xl" />
            </div>
        </div>
    </div>
);

export default PropertyDetails;
