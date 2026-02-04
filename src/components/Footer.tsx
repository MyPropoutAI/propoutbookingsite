import { Heart, ExternalLink, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="PropOut Logo" 
                className="h-10 w-10 object-contain rounded-full bg-white" 
              />
              <span className="text-xl font-display font-bold">PropOut</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted partner for premium shortlet apartments in Abuja. 
              Experience luxury living with PropOut.
            </p>
            <a
              href="https://www.mypropout.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-primary-foreground/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Main Website
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+2349074743062" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  +234 907 474 3062
                </a>
              </li>
              <li>
                <a href="mailto:bookings@mypropout.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                  bookings@mypropout.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>Abuja • Lagos • Port Harcourt • Delta</span>
              </li>
            </ul>
          </div>

          {/* Valentine Promo */}
          <div className="bg-primary-foreground/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-5 w-5 text-accent" />
              <h4 className="font-display font-semibold">Valentine Special</h4>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Get 50% off all bookings until February 27th! Don't miss this 
              exclusive offer on our luxury apartments.
            </p>
            <button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm font-medium underline hover:no-underline"
            >
              Book Now →
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} PropOut. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-accent" /> for our guests
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
