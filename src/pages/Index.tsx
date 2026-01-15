import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import GiftCategories from "@/components/GiftCategories";
import WhatYouGet from "@/components/WhatYouGet";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Testimonials />
        <GiftCategories />
        <WhatYouGet />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
