import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";
import Features from "@/components/home/Features";
import NavMain from "@/components/home/Navbar";
import AosProvider from "@/components/home/AosProvider";
import VideoSection from "@/components/home/VideoSection";
import SectionDivider from "@/components/home/SectionDivider";

export default async function Home() {
  return (
    <AosProvider>
      <main className="relative max-w-screen ">
        <NavMain />
        <VideoSection />
        <Hero />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <FAQ />
        <Footer />
      </main>
    </AosProvider>
  );
}
