import { 
  Wifi, 
  Tv, 
  AirVent, 
  Car, 
  ShieldCheck, 
  Utensils,
  WashingMachine,
  Dumbbell,
  MapPin,
  Clock,
  CreditCard,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const amenities = [
  { icon: Wifi, label: "High-Speed WiFi", desc: "Unlimited fiber internet" },
  { icon: Tv, label: "Smart TV", desc: "Netflix & cable included" },
  { icon: AirVent, label: "Air Conditioning", desc: "Climate control in all rooms" },
  { icon: Car, label: "Free Parking", desc: "Secure covered parking" },
  { icon: ShieldCheck, label: "24/7 Security", desc: "CCTV & security personnel" },
  { icon: Utensils, label: "Fully Equipped Kitchen", desc: "Modern appliances" },
  { icon: WashingMachine, label: "Laundry", desc: "Washer & dryer in-unit" },
  { icon: Dumbbell, label: "Fitness Center", desc: "Access to gym facilities" },
];

const houseRules = [
  "Check-in: 2:00 PM | Check-out: 12:00 PM",
  "No smoking inside apartments",
  "No parties or events without prior approval",
  "Pets allowed with prior arrangement",
  "Quiet hours: 10:00 PM - 8:00 AM",
  "Maximum occupancy must be respected",
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Amenities */}
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">
              Premium Amenities
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {amenities.map((amenity) => (
                <Card key={amenity.label} className="glass-card hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <amenity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{amenity.label}</h4>
                      <p className="text-sm text-muted-foreground">{amenity.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Location & Rules */}
          <div className="space-y-8">
            {/* Location */}
            <Card className="elevated-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <MapPin className="h-5 w-5 text-accent" />
                  Prime Location in Abuja
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our apartments are strategically located in Abuja's most prestigious neighborhoods, 
                  offering easy access to business districts, shopping centers, and entertainment venues.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    10 mins to Central Business District
                  </p>
                  <p className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    15 mins to Nnamdi Azikiwe International Airport
                  </p>
                  <p className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Walking distance to major banks & restaurants
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card className="elevated-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  House Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {houseRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
