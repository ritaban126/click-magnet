import CTA from "@/components/Cta";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#0D0D12] min-h-screen overflow-x-hidden">
      <Navbar/>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <Testimonials/>
      <Pricing/>
      <CTA/>
      <Footer/>
    </div>
  );
}
