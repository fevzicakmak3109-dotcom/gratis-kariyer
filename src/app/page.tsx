import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Position } from "@/components/Position";
import { WhyUs } from "@/components/WhyUs";
import { HexSlider } from "@/components/HexSlider";
import { CareerPath } from "@/components/CareerPath";
import { Process } from "@/components/Process";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { MobileApplyButton } from "@/components/MobileApplyButton";
import { VisitorPing } from "@/components/VisitorPing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Position />
        <WhyUs />
        <HexSlider />
        <CareerPath />
        <Process />
        <ApplicationForm />
        <Faq />
      </main>
      <Footer />
      <MobileApplyButton />
      <VisitorPing />
    </>
  );
}
