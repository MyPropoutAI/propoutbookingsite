import { Heart } from "lucide-react";

const PromoBanner = () => {
  return (
    <div className="promo-gradient py-3 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-primary-foreground">
        <Heart className="h-4 w-4 animate-pulse-soft" />
        <p className="text-sm md:text-base font-medium text-center">
          <span className="font-bold">Valentine Special:</span> Get 50% OFF all bookings until February 27th!
        </p>
        <Heart className="h-4 w-4 animate-pulse-soft" />
      </div>
    </div>
  );
};

export default PromoBanner;
