import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 glass-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-display font-bold text-foreground">PropOut</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("apartments")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Apartments
            </button>
            <button
              onClick={() => scrollToSection("amenities")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Book Now
            </button>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.mypropout.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Main Site
            </a>
            <Button
              variant="hero"
              size="sm"
              onClick={() => scrollToSection("booking")}
            >
              Book Preview
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
