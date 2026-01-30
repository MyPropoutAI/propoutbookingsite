import PromoBanner from "@/components/PromoBanner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />
      <main>
        <HeroSection />
        <GallerySection />
        <AmenitiesSection />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
