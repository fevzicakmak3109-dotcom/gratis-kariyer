import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { BusinessLines } from "@/components/BusinessLines";
import { PosterSection } from "@/components/PosterSection";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { MobileApplyButton } from "@/components/MobileApplyButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <BusinessLines />
        <PosterSection />
        <Benefits />
        <Process />
        <ApplicationForm />
        <Faq />
      </main>
      <Footer />
      <MobileApplyButton />
    </>
  );
}
